import { call, put } from 'redux-saga/effects';

import Auth from '../auth/index';

export function* getUserAuth() {

    const getUserAuthResponse = yield call(Auth.getUserAuth);
    console.log('getUserAuthResponse', getUserAuthResponse);

    if (getUserAuthResponse.authenticated) {
        yield put({
            type: 'SIGN_IN_USER',
            uid: getUserAuthResponse.message.uid
        });
    }
    else {
        yield put({
            type: 'REDIRECT_USER_TO_SIGN_IN',
        });   
    }
}

export function* signInUser(action) {

    const signUpUserResponse = yield call(Auth.signUpUser, action);
    console.log('signUpUserResponse', signUpUserResponse);

    if (signUpUserResponse.authenticated) {
        yield put({
            type: 'SIGN_IN_USER',
            uid: signUpUserResponse.message.uid
        });
    }
    else {
        const signInUserResponse = yield call(Auth.signInUser, action);
        console.log('signInUserResponse', signInUserResponse);

        if (signInUserResponse.authenticated) {
            yield put({
                type: 'SIGN_IN_USER',
                uid: signInUserResponse.message.uid
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: signInUserResponse.message.message
            });
        }
    }
}