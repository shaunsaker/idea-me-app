import { call, put } from 'redux-saga/effects';

import utilities from '../utilities';
import CloudData from '../cloudData/index';

export function* loadUserData(action) {

    const loadUserDataResponse = yield call(CloudData.loadUserData, action);
    console.log('loadUserDataResponse', loadUserDataResponse);

    if (loadUserDataResponse) {       
        if (loadUserDataResponse.success && loadUserDataResponse.message) {
            yield put({
                type: 'UPDATE_USER_DATA',
                userData: loadUserDataResponse.message
            });
        }

        // No user data
        else if (loadUserDataResponse.success && !loadUserDataResponse.message) {
            yield put({
                type: 'saveUserData',
                uid: action.uid,
                node: 'profile',
                userData: action.userData,
            });
        }

        // We must have an error
        else {
            yield put({
                type: 'CLOUD_DATA_ERROR',
                message: loadUserDataResponse.message,
                retryAction: {
                    type: 'loadUserData',
                    data: {
                        userData: action.userData,
                    },
                },
            });
        }
    }
}

export function* saveUserData(action) {

    const saveUserDataResponse = yield call(CloudData.saveUserData, action);
    console.log('saveUserDataResponse', saveUserDataResponse);

    if (saveUserDataResponse) {       
        if (saveUserDataResponse.success) {
            yield put({
                type: 'UPDATE_USER_DATA',
                node: action.node,
                userData: utilities.findNullKeysAndRemoveFromObjectArray(action.userData), // we delete data by setting key's value to null (we need to remove this data before it gets to the store)
            });
        }

        // We must have an error
        else {
            yield put({
                type: 'CLOUD_DATA_ERROR',
                message: saveUserDataResponse.message,
                retryAction: {
                    type: 'loadUserData',
                    data: {
                        userData: action.userData,
                    },
                },
            });
        }
    }
}