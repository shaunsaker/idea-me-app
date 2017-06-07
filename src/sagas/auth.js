import { call, put } from 'redux-saga/effects';

import Auth from '../auth/index';

export function* getUserAuth() {

	const getUserAuthResponse = yield call(Auth.getUserAuth);
	console.log('getUserAuthResponse', getUserAuthResponse);

	if (getUserAuthResponse.authenticated) {
		yield put({
			type: 'SIGN_IN_USER',
			uid: getUserAuthResponse.message.user.uid,
		});
	}
	else {
		yield put({
			type: 'REDIRECT_USER_TO_WELCOME',
		});
	}
}

export function* signInUserWithEmail(action) {

	const signUpUserWithEmailResponse = yield call(Auth.signUpUserWithEmail, action);
	console.log('signUpUserWithEmailResponse', signUpUserWithEmailResponse);

	if (signUpUserWithEmailResponse.authenticated) {
		yield put({
			type: 'SIGN_IN_USER',
			uid: signUpUserWithEmailResponse.message.user.uid,
			userEmail: signUpUserWithEmailResponse.message.user.email
		});
	}

	// Handle network errors, if any
	else if (signUpUserWithEmailResponse.message.errorMessage.indexOf('A network') > -1) {
		yield put({
			type: 'AUTH_ERROR',
			message: 'A network error has occured.'
		});
	}
	else {
		const signInUserResponse = yield call(Auth.signInUserWithEmail, action);
		console.log('signInUserResponse', signInUserResponse);

		if (signInUserResponse.authenticated) {
			const uid = signInUserResponse.message.uid || signInUserResponse.message.user.uid;

			yield put({
				type: 'SIGN_IN_USER',
				uid: uid,
			});
		}
		else {
			yield put({
				type: 'AUTH_ERROR',
				message: signInUserResponse.message.errorMessage
			});
		}
	}
}

export function* sendPasswordResetEmail(action) {

	const passwordResetResponse = yield call(Auth.sendPasswordResetEmail, action);
	console.log('passwordResetResponse', passwordResetResponse);

	if (passwordResetResponse.success) {
		yield put({
			type: 'AUTH_SUCCESS',
			message: 'Email sent successfully'
		});
	}
	else {
		yield put({
			type: 'AUTH_ERROR',
			message: 'There was an error resetting your password. Please try again'
		});
	}
}

export function* signInUserWithFacebook(action) {

	const signInFacebookResponse = yield call(Auth.signInUserWithFacebook, action);
	console.log('signInFacebookResponse', signInFacebookResponse);

	if (signInFacebookResponse.authenticated) {
		const uid = signInFacebookResponse.message.user.uid;
		yield put({
			type: 'SIGN_IN_USER',
			uid: uid,
			userName: signInFacebookResponse.message.user.displayName,
			userEmail: signInFacebookResponse.message.user.email,
			userPhotoUrl: signInFacebookResponse.message.user.photoUrl,
		});
	}
	else {
		yield put({
			type: 'AUTH_ERROR',
			message: signInFacebookResponse.message // TODO: Check this
		});
	}
}

// export function* signInUserWithGoogle(action) {

// 	const signInGoogleResponse = yield call(Auth.signInUserWithGoogle, action);
// 	console.log('signInGoogleResponse', signInGoogleResponse);

// 	if (signInGoogleResponse.authenticated) {
// 		const uid = signInGoogleResponse.message.uid || signInGoogleResponse.message.user.uid;

// 		yield put({
// 			type: 'SIGN_IN_USER',
// 			uid: uid,
// 			userName: signInGoogleResponse.message.user.userName, // check this
// 			userEmail: signInGoogleResponse.message.user.email, // check this
// 			userPhotoUrl: signInGoogleResponse.message.user.photoUrl, // check this
// 		});
// 	}
// 	else {
// 		yield put({
// 			type: 'AUTH_ERROR',
// 			message: signInGoogleResponse.message.errorMessage
// 		});
// 	}
// }

export function* signInUserAnonymously() {

	const signInUserAnonymouslyResponse = yield call(Auth.signInUserAnonymously);
	console.log('signInUserAnonymouslyResponse', signInUserAnonymouslyResponse);

	if (signInUserAnonymouslyResponse.authenticated) {
		const uid = signInUserAnonymouslyResponse.message.uid || signInUserAnonymouslyResponse.message.user.uid;

		yield put({
			type: 'SIGN_IN_USER',
			uid: uid,
			anonymous: true
		});
	}
	else {
		yield put({
			type: 'AUTH_ERROR',
			message: signInUserAnonymouslyResponse.message.errorMessage
		});
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
			type: 'AUTH_ERROR',
			message: signOutUserResponse.message.errorMessage
		});
	}
}