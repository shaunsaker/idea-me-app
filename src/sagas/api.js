import { call, put } from 'redux-saga/effects';

import Data from '../api/index';

export function* saveUserIdeas(action) {

    const saveUserIdeasResponse = yield call(Data.saveUserIdeas, action);
    console.log('saveUserIdeasResponse', saveUserIdeasResponse);

    if (saveUserIdeasResponse) {
        if (saveUserIdeasResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'API_ERROR',
                retryAction: 'saveUserIdeas',
                message: saveUserIdeasResponse.message // TODO: Check this
            });
        }
    }
}

export function* saveUserCategories(action) {

    const saveUserCategoriesResponse = yield call(Data.saveUserCategories, action);
    console.log('saveUserCategoriesResponse', saveUserCategoriesResponse);

    if (saveUserCategoriesResponse) {
        if (saveUserCategoriesResponse.success) {
            yield put({
                type: 'API_SAVE_SUCCESS',
            });
        }
        else {
            yield put({
                type: 'API_ERROR',
                retryAction: 'saveUserCategories',
                message: saveUserCategoriesResponse.message // TODO: Check this
            });
        }
    }
}

export function* loadUserData(action) {

    const loadUserDataResponse = yield call(Data.loadUserData, action);
    console.log('loadUserDataResponse', loadUserDataResponse);

    if (loadUserDataResponse) {
        if (loadUserDataResponse.success) {
            const preProcessedData = loadUserDataResponse.message;
            let processedData = {
                ideas: [],
                categories: []
            };

            // Firebase is returning objects instead of arrays (?!) so we need to pre-process this data
            if (preProcessedData) {
                if (preProcessedData.categories) {
                    if (typeof(preProcessedData.categories === 'object')) {
                        for (let prop in preProcessedData.categories) {
                            if (preProcessedData.categories.hasOwnProperty(prop)) {
                                processedData.categories.push(preProcessedData.categories[prop]);
                            }
                        }
                    }   
                    else {
                        processedData.categories.push(preProcessedData.categories)
                    }
                }

                if (preProcessedData.ideas) {
                    if (typeof(preProcessedData.ideas === 'object')) {
                        for (let prop in preProcessedData.ideas) {
                            if (preProcessedData.ideas.hasOwnProperty(prop)) {
                                processedData.ideas.push(preProcessedData.ideas[prop]);
                            }
                        }
                    }   
                    else {
                        processedData.ideas.push(preProcessedData.ideas)
                    }
                }           

                yield put({
                    type: 'API_LOAD_SUCCESS',
                    data: processedData
                });
            }

            // Else the user has no data, so just send an empty object
            else {
                yield put({
                    type: 'API_LOAD_SUCCESS',
                    data: processedData
                });
            }
        }
        else {
            yield put({
                type: 'API_ERROR',
                message: loadUserDataResponse.message
            });
        }
    }
}