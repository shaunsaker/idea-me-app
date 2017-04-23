import { call, put } from 'redux-saga/effects';

import ApiData from '../api/index';

export function* saveUserIdeas(action) {

    const saveResponse = yield call(ApiData.saveUserIdeas, action);
    console.log(saveResponse);

    if (saveResponse) {
        if (saveResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: saveResponse.message // TODO: Check this
            });
        }
    } 
}

export function* saveUserCategories(action) {

    const saveResponse = yield call(ApiData.saveUserCategories, action);
    console.log(saveResponse);

    if (saveResponse) {
        if (saveResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: saveResponse.message // TODO: Check this
            });
        }
    } 
}

export function* loadUserData(action) {

    const loadResponse = yield call(ApiData.loadUserData, action);
    console.log(loadResponse);

    if (loadResponse) {
        if (loadResponse.success) {
            yield put({
                type: 'API_LOAD_SUCCESS',
                data: loadResponse.message
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: loadResponse.message
            });
        }
    } 
}