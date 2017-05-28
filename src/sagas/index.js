import { takeLatest } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';

import { getUserAuth } from './auth';
import { signInUserWithEmail } from './auth';
import { sendPasswordResetEmail } from './auth';
import { signInUserWithFacebook } from './auth';
// import { signInUserWithGoogle } from './auth';
import { signInUserAnonymously } from './auth';
import { signOutUser } from './auth';
import { saveUserIdeas } from './api';
import { saveUserCategories } from './api';
import { loadUserData } from './api';

export function* sagas() {
    yield [
        fork(takeLatest, 'getUserAuth', getUserAuth),
        fork(takeLatest, 'signInUserWithEmail', signInUserWithEmail),
        fork(takeLatest, 'sendPasswordResetEmail', sendPasswordResetEmail),
        fork(takeLatest, 'signInUserWithFacebook', signInUserWithFacebook),
        // fork(takeLatest, 'signInUserWithGoogle', signInUserWithGoogle),
        fork(takeLatest, 'signInUserAnonymously', signInUserAnonymously),
        fork(takeLatest, 'signOutUser', signOutUser),
        fork(takeLatest, 'saveUserIdeas', saveUserIdeas),
        fork(takeLatest, 'saveUserCategories', saveUserCategories),
        fork(takeLatest, 'loadUserData', loadUserData)
    ];
}