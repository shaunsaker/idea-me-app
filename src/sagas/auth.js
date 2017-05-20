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
        const uid = signUpUserResponse.message.uid || signUpUserResponse.message.user.uid;

        yield put({
            type: 'SIGN_IN_USER',
            uid: uid
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
            const uid = signInUserResponse.message.uid || signInUserResponse.message.user.uid;

            yield put({
                type: 'SIGN_IN_USER',
                uid: uid
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

export function* signOutUser() {

	const signOutUserResponse = yield call(Auth.signOutUser);
	console.log('signOutUserResponse', signOutUserResponse);

	if (signOutUserResponse.success) {
		yield put({
			type: 'SIGN_OUT_USER',
		});
	}
	else {
		yield put({
			type: 'USER_ERROR',
			message: signOutUserResponse.message // TODO: Check this
		});
	}
}