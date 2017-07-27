import { call, put } from 'redux-saga/effects';

import UserAuth from '../userAuth/index';

export function* getUserAuth() {
    const getUserAuthResponse = yield call(UserAuth.getUserAuth);
    // console.log('getUserAuthResponse', getUserAuthResponse);

    if (getUserAuthResponse.authenticated) {
        yield put({
            type: 'SIGN_IN_USER',
            uid: getUserAuthResponse.message.user.uid,
            anonymous: getUserAuthResponse.message.user.anonymous,
        });
    }
    else {
        yield put({
            type: 'REDIRECT_USER_TO_WELCOME_PAGE',
        });
    }
}

export function* signInUserWithEmail(action) {

    const signUpUserWithEmailResponse = yield call(UserAuth.signUpUserWithEmail, action);
    console.log('signUpUserWithEmailResponse', signUpUserWithEmailResponse);

    if (signUpUserWithEmailResponse.authenticated) {
        yield put({
            type: 'SIGN_IN_USER',
            uid: signUpUserWithEmailResponse.message.user.uid,
            userEmail: signUpUserWithEmailResponse.message.user.email,
            anonymous: false,
        });
    }

    // Handle network errors, if any
    else if (signUpUserWithEmailResponse.message.errorMessage.indexOf('A network') > -1) {
        yield put({
            type: 'SET_ERROR',
            errorType: 'AUTH',
            message: 'A network error has occured.',
            retryAction: {
                type: 'signInUserWithEmail',
                data: {
                    email: action.email,
                    password: action.password,
                },
            },
        });
    }
    else {
        let emailInUse = false;

        if (signUpUserWithEmailResponse.message.errorCode && signUpUserWithEmailResponse.message.errorCode === 'ERROR_EMAIL_ALREADY_IN_USE') {
            emailInUse = true;
        }

        const signInUserWithEmailResponse = yield call(UserAuth.signInUserWithEmail, action);
        console.log('signInUserWithEmailResponse', signInUserWithEmailResponse);

        if (signInUserWithEmailResponse.authenticated) {
            const uid = signInUserWithEmailResponse.message.uid || signInUserWithEmailResponse.message.user.uid;

            yield put({
                type: 'SIGN_IN_USER',
                uid: uid,
                anonymous: false,
            });
        }
        else {
            yield put({
                type: 'SET_ERROR',
                errorType: 'AUTH',
                message: emailInUse ? 'This email address is already in use' : signInUserWithEmailResponse.message.errorMessage,
                retryAction: {
                    type: 'signInUserWithEmail',
                    data: {
                        email: action.email,
                        password: action.password,
                    },
                },
            });
        }
    }
}

export function* sendPasswordResetEmail(action) {

    const passwordResetResponse = yield call(UserAuth.sendPasswordResetEmail, action);
    console.log('passwordResetResponse', passwordResetResponse);

    if (passwordResetResponse.success) {
        yield put({
            type: 'SET_SUCCESS',
            type: 'USER',
            message: 'Email sent successfully'
        });
    }
    else {
        yield put({
            type: 'SET_ERROR',
            errorType: 'AUTH',
            message: passwordResetResponse.message,
            retryAction: {
                type: 'sendPasswordResetEmail',
                data: {
                    userEmail: action.userEmail,
                },
            },
        });
    }
}

export function* signInUserWithFacebook() {

    const signInFacebookResponse = yield call(UserAuth.signInUserWithFacebook);
    console.log('signInFacebookResponse', signInFacebookResponse);

    if (signInFacebookResponse.authenticated) {
        const uid = signInFacebookResponse.message.user.uid;
        yield put({
            type: 'SIGN_IN_USER',
            uid: uid,
            userEmail: signInFacebookResponse.message.user.email,
            userName: signInFacebookResponse.message.user.displayName,
            userPhotoUrl: {
                cropped: signInFacebookResponse.message.user.photoUrl,
            },
            anonymous: false
        });
    }
    else {
        yield put({
            type: 'SET_ERROR',
            errorType: 'AUTH',
            message: 'We were unable to connect to Facebook.',
            retryAction: {
                type: 'signInUserWithFacebook',
            }
        });
    }
}

export function* signInUserWithGoogle() {

    const signInGoogleResponse = yield call(UserAuth.signInUserWithGoogle);
    console.log('signInGoogleResponse', signInGoogleResponse);

    if (signInGoogleResponse.authenticated) {
        const uid = signInGoogleResponse.message.user.uid;

        yield put({
            type: 'SIGN_IN_USER',
            uid: uid,
            userEmail: '', // TODO: Get these from the response
            userName: '',
            userPhotoUrl: {
                cropped: '',
            },
            anonymous: false
        });
    }
    else {
        yield put({
            type: 'SET_ERROR',
            errorType: 'AUTH',
            message: signInGoogleResponse.message,
            retryAction: {
                type: 'signInUserWithGoogle',
            }
        });
    }
}

export function* signInUserAnonymously() {

    const signInUserAnonymouslyResponse = yield call(UserAuth.signInUserAnonymously);
    console.log('signInUserAnonymouslyResponse', signInUserAnonymouslyResponse);

    if (signInUserAnonymouslyResponse.authenticated) {
        const uid = signInUserAnonymouslyResponse.message.uid || signInUserAnonymouslyResponse.message.user.uid; // TODO: check this

        yield put({
            type: 'SIGN_IN_USER',
            uid: uid,
            anonymous: true
        });
    }
    else {
        yield put({
            type: 'SET_ERROR',
            errorType: 'AUTH',
            message: signInUserAnonymouslyResponse.message,
            retryAction: {
                type: 'signInUserAnonymously',
            }
        });
    }
}

export function* signOutUser() {

    const signOutUserResponse = yield call(UserAuth.signOutUser);
    console.log('signOutUserResponse', signOutUserResponse);

    if (signOutUserResponse.success) {
        yield put({
            type: 'SIGN_OUT_USER',
        });
    }
    else {
        yield put({
            type: 'SET_ERROR',
            errorType: 'AUTH',
            message: signOutUserResponse.message,
            retryAction: {
                type: 'signOutUser',
            }
        });
    }
}