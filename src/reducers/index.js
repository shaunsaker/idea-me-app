import utilities from '../utilities';
import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {

        /* AUTH */
        case 'UPDATE_USER_EMAIL':
            new_state = utilities.cloneObject(state);
            new_state.userData.profile.userEmail = action.value;
            return new_state;

        case 'UPDATE_USER_PASSWORD':
            new_state = utilities.cloneObject(state);
            new_state.userAuth.userPassword = action.value;
            return new_state;

        case 'REDIRECT_USER_TO_WELCOME_PAGE':
            new_state = utilities.cloneObject(state);
            new_state.userAuth.redirectToWelcomePage = true;
            return new_state;

        case 'SIGN_IN_USER':
            new_state = utilities.cloneObject(state);
            new_state.userAuth.authenticated = true;
            new_state.userAuth.uid = action.uid;
            new_state.userAuth.redirectToWelcomePage = false;

            if (action.anonymous) {
                new_state.userAuth.anonymous = true;
                new_state.userAuth.firstTimeUser = true;
            }

            return new_state;

        case 'SIGN_OUT_USER':
            new_state = utilities.cloneObject(state);
            new_state = initialState;
            new_state.appState.loading = false;
            new_state.userAuth.redirectToWelcomePage = true;

            return new_state;

        /*
            TOOLTIPS
        */
        case 'SHOW_TOOL_TIPS':
            new_state = utilities.cloneObject(state);
            new_state.appState.showToolTips = true;

            return new_state;

        case 'SET_NEXT_TOOL_TIP':
            new_state = utilities.cloneObject(state);
            new_state.appData.currentToolTipUID = action.newToolTipUID;

            return new_state;

        case 'CANCEL_ONBOARDING':
            new_state = utilities.cloneObject(state);
            new_state.userAuth.firstTimeUser = false;
            new_state.appState.showToolTips = false;
            new_state.appData.currentToolTipUID = null;

            return new_state;

        /* APP */
        case 'TOGGLE_NETWORK_STATE':
            new_state = utilities.cloneObject(state);
            new_state.appState.hasNetwork = !new_state.appState.hasNetwork;
            return new_state;

        case 'TOGGLE_LOADING':
            new_state = utilities.cloneObject(state);
            new_state.appState.loading = !new_state.appState.loading;
            return new_state;

		/*
			SUCCESS/ERROR MESSAGES
        */
        case 'SET_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.appState.error.type = action.errorType;
            new_state.appState.error.message = action.message;
            new_state.appState.error.success = true;
            new_state.appState.loading = false;

            // Cloud data attaches this
            if (action.firstTimeUser) {
                new_state.userAuth.firstTimeUser = action.firstTimeUser;
            }

            return new_state;

        case 'SET_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.appState.error.type = action.errorType;
            new_state.appState.error.message = action.message;
            new_state.appState.error.success = false;
            new_state.appState.loading = false;

            // Attach a retry action if provided
            if (action.retryAction && action.retryAction.type) {
                new_state.appState.retryAction.type = action.retryAction.type;
            }
            if (action.retryAction && action.retryAction.data) {
                new_state.appState.retryAction.data = {
                    ...action.retryAction.data
                }
            }

            // Geolocation attaches this 
            if (action.currentLocation) {
                new_state.appData.currentLocation = action.currentLocation;
            }

            return new_state;

        case 'RESET_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.appState.error.type = null;
            new_state.appState.error.message = null;
            new_state.appState.error.success = null;
            return new_state;

        /* APP DATA */

        case 'SET_CURRENT_LOCATION':
            new_state = utilities.cloneObject(state);
            new_state.appData.currentLocation = action.currentLocation;
            new_state.appState.loading = false; // for profile page
            return new_state;

        case 'SELECT_CATEGORY':
            new_state = utilities.cloneObject(state);
            new_state.appData.currentCategory = action.value;
            return new_state;

        case 'SET_NEW_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newNotes = action.newNotes;
            return new_state;

        case 'CLEAR_NEW_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newNotes = null;
            return new_state;

        case 'SET_TEMPORARY_IMAGE':
            new_state = utilities.cloneObject(state);
            new_state.appData.temporaryImage = action.image;
            return new_state;

        case 'CLEAR_TEMPORARY_IMAGE':
            new_state = utilities.cloneObject(state);
            new_state.appData.temporaryImage = null;
            return new_state;

        case 'SET_NEW_PHOTOS':
            new_state = utilities.cloneObject(state);
            new_state.appData.newPhotos = action.newPhotos;
            new_state.appData.temporaryImage = null;
            return new_state;

        case 'CLEAR_NEW_PHOTOS':
            new_state = utilities.cloneObject(state);
            new_state.appData.newPhotos = null;
            return new_state;

        case 'SET_NEW_VOICE_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newVoiceNotes = action.newVoiceNotes;
            return new_state;

        case 'CLEAR_NEW_VOICE_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newVoiceNotes = null;
            return new_state;

        case 'CLEAR_ALL_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newNotes = null;
            new_state.appData.newPhotos = null;
            new_state.appData.newVoiceNotes = null;
            return new_state;

        /* USER DATA */
        case 'UPDATE_USER_DATA':
            new_state = utilities.cloneObject(state);

            if (action.node) {
                new_state.userData[action.node] = action.userData;
            }
            else {
                new_state.userData = action.userData;
            }

            new_state.appState.error.type = 'CLOUD_DATA';
            new_state.appState.error.message = null;
            new_state.appState.error.success = true;
            new_state.appState.loading = false;
            return new_state;

        case 'SET_USER_LOCATION':
            new_state = utilities.cloneObject(state);
            new_state.userData.profile.userLocation = action.userLocation;
            return new_state;

        case 'SET_USER_PHOTO':
            new_state = utilities.cloneObject(state);
            new_state.userData.profile.userPhotoUrl = action.userPhotoUrl;
            return new_state;

        default:
            return state;
    }
}