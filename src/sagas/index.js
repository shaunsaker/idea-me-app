import { takeLatest } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';

// Auth
import { getUserAuth } from './auth';
import { signInUserWithEmail } from './auth';
import { sendPasswordResetEmail } from './auth';
import { signInUserWithFacebook } from './auth';
import { signInUserWithGoogle } from './auth';
import { signInUserAnonymously } from './auth';
import { signOutUser } from './auth';

// Geolocation
import { getUserLocation } from './geolocation';

// Cloud Data
import { loadUserData } from './cloudData';
import { saveUserData } from './cloudData';
import { deleteUserData } from './cloudData';

// Cloud Storage
import { uploadUserPhoto } from './cloudStorage';

export function* sagas() {
    yield [

        // Auth
        fork(takeLatest, 'getUserAuth', getUserAuth),
        fork(takeLatest, 'signInUserWithEmail', signInUserWithEmail),
        fork(takeLatest, 'sendPasswordResetEmail', sendPasswordResetEmail),
        fork(takeLatest, 'signInUserWithFacebook', signInUserWithFacebook),
        // fork(takeLatest, 'signInUserWithGoogle', signInUserWithGoogle),
        fork(takeLatest, 'signInUserAnonymously', signInUserAnonymously),
        fork(takeLatest, 'signOutUser', signOutUser),

        // Geolocation
        fork(takeLatest, 'getUserLocation', getUserLocation),

        // Cloud Data
        fork(takeLatest, 'loadUserData', loadUserData),    
        fork(takeLatest, 'saveUserData', saveUserData),  
        fork(takeLatest, 'deleteUserData', deleteUserData),   

        // Cloud Storage
		fork(takeLatest, 'uploadUserPhoto', uploadUserPhoto),
    ];
}