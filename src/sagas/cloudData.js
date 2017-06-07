import { call, put } from 'redux-saga/effects';

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
                userData: action.userData,
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

export function* saveUserIdeas(action) {

    const saveUserIdeasResponse = yield call(CloudData.saveUserIdeas, action);
    console.log('saveUserIdeasResponse', saveUserIdeasResponse);

    if (saveUserIdeasResponse) {
        if (saveUserIdeasResponse.success) {
            yield put({
                type: 'CLOUD_DATA_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'CLOUD_DATA_ERROR',
                message: saveUserIdeasResponse.message,
                retryAction: {
                    type: 'saveUserIdeas',
                    data: {
                        uid: action.uid,
                        ideas: action.ideas,
                    },
                },
            });
        }
    }
}

export function* saveUserCategories(action) {

    const saveUserCategoriesResponse = yield call(CloudData.saveUserCategories, action);
    console.log('saveUserCategoriesResponse', saveUserCategoriesResponse);

    if (saveUserCategoriesResponse) {
        if (saveUserCategoriesResponse.success) {
            yield put({
                type: 'CLOUD_DATA_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'CLOUD_DATA_ERROR',
                message: saveUserCategoriesResponse.message,
                retryAction: {
                    type: 'saveUserCategories',
                    data: {
                        uid: action.uid,
                        categories: action.categories,
                    },
                },
            });
        }
    }
}

export function* saveUserLocation(action) {
    const saveUserLocationResponse = yield call(CloudData.saveUserLocation, action);
    console.log('saveUserLocationResponse', saveUserLocationResponse);

    if (saveUserLocationResponse.success) {
        yield put({
            type: 'SET_USER_LOCATION',
            userLocation: action.userLocation,
        });
    }
    else {
        yield put({
            type: 'CLOUD_DATA_ERROR',
            message: 'There was an error saving your location.',
            retryAction: {
                type: 'saveUserLocation',
                data: {
                    uid: action.uid,
                    userLocation: action.userLocation,
                },
            },
        });
    }
}

export function* saveUserPhoto(action) {
    const saveUserPhotoResponse = yield call(CloudData.saveUserPhoto, action);
    console.log('saveUserPhotoResponse', saveUserPhotoResponse);

    if (saveUserPhotoResponse.success) {
        yield put({
            type: 'SET_USER_PHOTO',
            userPhotoUrl: saveUserPhotoResponse.message,
        });
    }
    else {
        yield put({
            type: 'CLOUD_DATA_ERROR',
            message: 'There was an error saving your photo.',
            retryAction: {
                type: 'saveUserPhoto',
                data: {
                    uid: action.uid,
                    userPhotoUrl: action.userPhotoUrl,
                },
            },
        });
    }
}