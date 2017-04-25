import { call, put } from 'redux-saga/effects';

import ApiData from '../api/index';

export function* saveUserIdeas(action) {

    const saveIdeasResponse = yield call(ApiData.saveUserIdeas, action);
    console.log('saveIdeasResponse', saveIdeasResponse);

    if (saveIdeasResponse) {
        if (saveIdeasResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: saveIdeasResponse.message // TODO: Check this
            });
        }
    }
}

export function* saveUserCategories(action) {

    const saveCategoriesResponse = yield call(ApiData.saveUserCategories, action);
    console.log('saveCategoriesResponse', saveCategoriesResponse);

    if (saveCategoriesResponse) {
        if (saveCategoriesResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'USER_ERROR',
                message: saveCategoriesResponse.message // TODO: Check this
            });
        }
    }
}

export function* loadUserData(action) {

    const loadResponse = yield call(ApiData.loadUserData, action);
    console.log('loadResponse', loadResponse);

    if (loadResponse) {
        if (loadResponse.success) {

            // Firebase is returning objects instead of arrays (?!) so we may need to pre-process this data
            const preProcessed = loadResponse.message;
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
                message: loadResponse.message
            });
        }
    }
}