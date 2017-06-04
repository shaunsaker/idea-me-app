import { call, put } from 'redux-saga/effects';

import Storage from '../storage/index';
 
export function* uploadUserPhoto(action) {
	const uploadUserPhotoResponse = yield call(Storage.uploadUserPhoto, action);
	console.log('uploadUserPhotoResponse', uploadUserPhotoResponse);

	if (uploadUserPhotoResponse.success) {
		yield put({
			type: 'saveUserPhoto',
			uid: uploadUserPhotoResponse.message.uid,
			userPhotoUrl: uploadUserPhotoResponse.message.photoUrl
		});
	}
	else {
		yield put({
			type: 'USER_ERROR',
			message: 'There was an error saving your profile photo. Please try again'
		});
	}
}