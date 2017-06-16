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

            // We use this to dispatch another action(s) that was attached from the page
            if (action.nextAction) {
                
                // action.nextAction can be an array of actions so lets check for that, if true, yield those actions as an array with put methods attached
                if (Array.isArray(action.nextAction)) {
                    let actionsArray = [];

                    for (let i = 0; i < action.nextAction.length; i++) {
                        actionsArray.push(put(action.nextAction[i]));
                    }

                    yield actionsArray;
                }
                else {
                    yield put(action.nextAction);
                }
            }
            else {
                yield put({
                    type: 'UPDATE_USER_DATA',
                    node: action.node,
                    userData: action.userData,
                    currentAction: action.currentAction,
                });
            }
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

export function* deleteUserData(action) {

    const deleteUserDataResponse = yield call(CloudData.deleteUserData, action);
    console.log('deleteUserDataResponse', deleteUserDataResponse);

    if (deleteUserDataResponse) {       
        if (deleteUserDataResponse.success) {

            // We use this to dispatch another action(s) that was attached from the page
            if (action.nextAction) {

                // action.nextAction can be an array of actions so lets check for that, if true, yield those actions as an array with put methods attached
                if (Array.isArray(action.nextAction)) {
                    let actionsArray = [];

                    for (let i = 0; i < action.nextAction.length; i++) {
                        actionsArray.push(put(action.nextAction[i]));
                    }

                    yield actionsArray;
                }
                else {
                    yield put(action.nextAction);
                }
            }
            else {
                yield put({
                    type: 'UPDATE_USER_DATA',
                    node: action.node,
                    userData: action.userData,
                });
            }
        }

        // We must have an error
        else {
            yield put({
                type: 'CLOUD_DATA_ERROR',
                message: deleteUserDataResponse.message,
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