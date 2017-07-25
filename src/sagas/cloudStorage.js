import { call, put } from 'redux-saga/effects';

import CloudStorage from '../cloudStorage/index';

export function* uploadUserPhoto(action) {
    const uploadUserPhotoResponse = yield call(CloudStorage.uploadUserPhoto, action);
    console.log('uploadUserPhotoResponse', uploadUserPhotoResponse);

    if (uploadUserPhotoResponse.success) {
        yield put({
            type: 'saveUserData',
            uid: uploadUserPhotoResponse.message.uid,
            node: 'profile',
            userData: {
                userPhotoUrl: uploadUserPhotoResponse.message.userPhotoUrl
            }
        });
    }
    else {
        yield put({
            type: 'SET_ERROR',
            errorType: 'CLOUD_STORAGE',
            message: 'There was an error saving your profile photo.',
            retryAction: {
                type: 'uploadUserPhoto',
                data: {
                    uid: action.uid,
                    path: action.path,
                },
            },
        });
    }
}