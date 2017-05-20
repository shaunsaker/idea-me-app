import { takeLatest } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';

import { getUserAuth } from './auth';
import { signInUser } from './auth';
import { signInUserWithFacebook } from './auth';
import { signOutUser } from './auth';
import { saveUserIdeas } from './data';
import { saveUserCategories } from './data';
import { loadUserData } from './data';

export function* sagas() {
    yield [
        fork(takeLatest, 'getUserAuth', getUserAuth),
        fork(takeLatest, 'signInUser', signInUser),
        fork(takeLatest, 'signInUserWithFacebook', signInUserWithFacebook),
        fork(takeLatest, 'signOutUser', signOutUser),
        fork(takeLatest, 'saveUserIdeas', saveUserIdeas),
        fork(takeLatest, 'saveUserCategories', saveUserCategories),
        fork(takeLatest, 'loadUserData', loadUserData)
    ];
}