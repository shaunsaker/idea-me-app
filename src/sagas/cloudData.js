import {
    call,
    put,
    all
} from 'redux-saga/effects';

import utilities from '../utilities';
import CloudData from '../cloudData/index';

export function* loadUserData(action) {
    const loadUserDataResponse = yield call(CloudData.loadUserData, action);
    // console.log('loadUserDataResponse', loadUserDataResponse);

    if (loadUserDataResponse) {
        if (loadUserDataResponse.success && loadUserDataResponse.message) {
            yield put({
                type: 'UPDATE_USER_DATA',
                userData: loadUserDataResponse.message,
            });
        }

        // No user data (new user)
        else if (loadUserDataResponse.success && !loadUserDataResponse.message) {
            let userData = action.userData;
            userData['dateJoined'] = Date.now();

            yield put({
                type: 'saveUserData',
                uid: action.uid,
                node: 'profile',
                userData,
                firstTimeUser: true,
            });
        }

        // We must have an error
        else {
            yield put({
                type: 'SET_ERROR',
                errorType: 'CLOUD_DATA',
                message: loadUserDataResponse.message,
                retryAction: {
                    type: 'loadUserData',
                    data: {
                        uid: action.uid,
                        userData: action.userData,
                    },
                },
            });
        }
    }
}

export function* saveUserData(action) {
    const saveUserDataResponse = action.hasNetwork ?
        yield call(CloudData.saveUserData, action)
        :
        CloudData.saveUserData(action); // will never yield a response if offline
    console.log('saveUserDataResponse', saveUserDataResponse, action.hasNetwork);

    if (saveUserDataResponse || !action.hasNetwork) {
        if (saveUserDataResponse.success || !action.hasNetwork) {

            // We use this to dispatch another action(s) that was attached from the page
            if (action.nextAction) {

                // action.nextAction can be an array of actions so lets check for that, if true, yield those actions as an array with put methods attached
                if (Array.isArray(action.nextAction)) {
                    let actionsArray = [];

                    for (let i = 0; i < action.nextAction.length; i++) {
                        actionsArray.push(put(action.nextAction[i]));
                    }

                    yield all(actionsArray);
                }
                else {
                    yield put(action.nextAction);
                }
            }
            else {
                yield put({
                    type: 'CLOUD_DATA_SUCCESS',
                    firstTimeUser: action.firstTimeUser,
                });
            }
        }

        // We must have an error
        else {
            yield put({
                type: 'SET_ERROR',
                errorType: 'CLOUD_DATA',
                message: saveUserDataResponse.message,
                retryAction: {
                    type: 'saveUserData',
                    data: {
                        node: action.node,
                        uid: action.uid,
                        userData: action.userData,
                        hasNetwork: action.hasNetwork,
                    },
                },
            });
        }
    }
}

export function* deleteUserData(action) {
    const deleteUserDataResponse = action.hasNetwork ?
        yield call(CloudData.deleteUserData, action)
        :
        CloudData.deleteUserData(action); // will never yield a response if offline
    console.log('deleteUserDataResponse', deleteUserDataResponse);

    if (deleteUserDataResponse || !action.hasNetwork) {
        if (deleteUserDataResponse.success || !action.hasNetwork) {

            // We use this to dispatch another action(s) that was attached from the page
            if (action.nextAction) {

                // action.nextAction can be an array of actions so lets check for that, if true, yield those actions as an array with put methods attached
                if (Array.isArray(action.nextAction)) {
                    let actionsArray = [];

                    for (let i = 0; i < action.nextAction.length; i++) {
                        actionsArray.push(put(action.nextAction[i]));
                    }

                    yield all(actionsArray);
                }
                else {
                    yield put(action.nextAction);
                }
            }
            else {

                // On success, do nothing (store was updated before)
            }
        }

        // We must have an error
        else {
            yield put({
                type: 'SET_ERROR',
                errorType: 'CLOUD_DATA',
                message: deleteUserDataResponse.message,
                retryAction: {
                    type: 'deleteUserData',
                    data: {
                        node: action.node,
                        uid: action.uid,
                        userData: action.userData,
                        hasNetwork: action.hasNetwork,
                    },
                },
            });
        }
    }
}