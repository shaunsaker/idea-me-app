import { call, put } from 'redux-saga/effects';

import CloudStorage from '../cloudStorage/index';
 
export function* uploadUserPhoto(action) {
	const uploadUserPhotoResponse = yield call(CloudStorage.uploadUserPhoto, action);
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
			type: 'CLOUD_STORAGE_ERROR',
			message: 'There was an error saving your profile photo. Please try again'
		});
	}
}