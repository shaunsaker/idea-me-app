import { call, put } from 'redux-saga/effects';

import Auth from '../auth/index';

export function* getUserAuth() {

    const getUserAuthResponse = yield call(Auth.getUserAuth);
    console.log('getUserAuthResponse', getUserAuthResponse);

    if (getUserAuthResponse.authenticated) {
        yield put({
            type: 'SIGN_IN_USER',
            uid: getUserAuthResponse.message.user.uid
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

    // Handle network errors, if any
    else if (signUpUserResponse.message.errorMessage.indexOf('A network') > -1) {
        yield put({
            type: 'USER_ERROR',
            message: 'A network error has occured.'
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