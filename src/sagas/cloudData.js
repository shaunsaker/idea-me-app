import { call, put } from 'redux-saga/effects';

import CloudData from '../cloudData/index';

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

export function* loadUserData(action) {

    const loadUserDataResponse = yield call(CloudData.loadUserData, action);
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
                    type: 'CLOUD_DATA_SUCCESS',
                    data: processedData
                });
            }

            // Else the user has no data, so just send an empty object
            else {
                yield put({
                    type: 'CLOUD_DATA_SUCCESS',
                    data: processedData
                });
            }
        }
        else {
            yield put({
                type: 'CLOUD_DATA_ERROR',
                message: loadUserDataResponse.message,
                retryAction: {
                    type: 'loadUserData',
                    data: {
                        uid: action.uid,
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