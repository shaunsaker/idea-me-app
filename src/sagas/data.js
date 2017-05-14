import { call, put } from 'redux-saga/effects';

import ApiData from '../api/index';

export function* saveUserIdeas(action) {

    const saveUserIdeasResponse = yield call(ApiData.saveUserIdeas, action);
    console.log('saveUserIdeasResponse', saveUserIdeasResponse);

    if (saveUserIdeasResponse) {
        if (saveUserIdeasResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: saveUserIdeasResponse.message // TODO: Check this
            });
        }
    }
}

export function* saveUserCategories(action) {

    const saveUserCategoriesResponse = yield call(ApiData.saveUserCategories, action);
    console.log('saveUserCategoriesResponse', saveUserCategoriesResponse);

    if (saveUserCategoriesResponse) {
        if (saveUserCategoriesResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: saveUserCategoriesResponse.message // TODO: Check this
            });
        }
    }
}

export function* loadUserData(action) {

    const loadUserDataResponse = yield call(ApiData.loadUserData, action);
    console.log('loadUserDataResponse', loadUserDataResponse);

    if (loadUserDataResponse) {
        if (loadUserDataResponse.success) {

            // Firebase is returning objects instead of arrays (?!) so we may need to pre-process this data
            const preProcessed = loadUserDataResponse.message;
            let processed = {
                ideas: [],
                categories: []
            };

            if (preProcessed.categories) {
                if (typeof(preProcessed.categories === 'object')) {
                    for (let prop in preProcessed.categories) {
                        if (preProcessed.categories.hasOwnProperty(prop)) {
                            processed.categories.push(preProcessed.categories[prop]);
                        }
                    }
                }   
                else {
                    processed.categories.push(preProcessed.categories)
                }
            }

            if (preProcessed.ideas) {
                if (typeof(preProcessed.ideas === 'object')) {
                    for (let prop in preProcessed.ideas) {
                        if (preProcessed.ideas.hasOwnProperty(prop)) {
                            processed.ideas.push(preProcessed.ideas[prop]);
                        }
                    }
                }   
                else {
                    processed.ideas.push(preProcessed.ideas)
                }
            }

            yield put({
                type: 'API_LOAD_SUCCESS',
                data: processed
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: loadUserDataResponse.message
            });
        }
    }
}