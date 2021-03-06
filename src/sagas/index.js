import { takeLatest, takeEvery, fork, all } from 'redux-saga/effects';

// Auth
import { getUserAuth } from './userAuth';
import { signInUserWithEmail } from './userAuth';
import { sendPasswordResetEmail } from './userAuth';
import { signInUserWithFacebook } from './userAuth';
import { signInUserWithGoogle } from './userAuth';
import { signInUserAnonymously } from './userAuth';
import { signOutUser } from './userAuth';

// Geolocation
import { getUserLocation } from './geolocation';

// Cloud Data
import { loadUserData } from './cloudData';
import { saveUserData } from './cloudData';
import { deleteUserData } from './cloudData';

// Images
import { handleImage } from './images';

// File System
import { deleteFile } from './fileSystem';

export function* sagas() {
    yield all([
        // User auth
        fork(takeLatest, 'getUserAuth', getUserAuth),
        fork(takeLatest, 'signInUserWithEmail', signInUserWithEmail),
        fork(takeLatest, 'sendPasswordResetEmail', sendPasswordResetEmail),
        fork(takeLatest, 'signInUserWithFacebook', signInUserWithFacebook),
        fork(takeLatest, 'signInUserWithGoogle', signInUserWithGoogle),
        fork(takeLatest, 'signInUserAnonymously', signInUserAnonymously),
        fork(takeLatest, 'signOutUser', signOutUser),

        // Geolocation
        fork(takeLatest, 'getUserLocation', getUserLocation),

        // Cloud Data
        fork(takeLatest, 'loadUserData', loadUserData),
        fork(takeEvery, 'saveUserData', saveUserData),
        fork(takeEvery, 'deleteUserData', deleteUserData),

        // Images
        fork(takeLatest, 'handleImage', handleImage),

        // File System
        fork(takeEvery, 'deleteFile', deleteFile),
    ]);
}
