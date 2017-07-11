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
            new_state.auth.userPassword = action.value;
            return new_state;

        case 'REDIRECT_USER_TO_WELCOME_PAGE':
            new_state = utilities.cloneObject(state);
            new_state.auth.redirectToWelcomePage = true;
            return new_state;

        case 'SIGN_IN_USER':
            new_state = utilities.cloneObject(state);
            new_state.auth.authenticated = true;
            new_state.auth.uid = action.uid;
            new_state.auth.redirectToWelcomePage = false;
            return new_state;

        case 'SIGN_OUT_USER':
            new_state = utilities.cloneObject(state);
            new_state = initialState;
            new_state.app.loading = false;
            new_state.auth.redirectToWelcomePage = true;

            return new_state;
        
		/*
			GEOLOCATION
		*/
		case 'SET_CURRENT_LOCATION':
			new_state = utilities.cloneObject(state);
			new_state.geolocation.currentLocation = action.currentLocation;
			new_state.geolocation.geolocationSuccess = true;
			new_state.app.loading = false; // for profile page
			return new_state;

        /* APP */
        case 'TOGGLE_LOADING':
            new_state = utilities.cloneObject(state);
            new_state.app.loading = !new_state.app.loading;
            return new_state;

        case 'TOGGLE_NETWORK_STATE':
            new_state = utilities.cloneObject(state);
            new_state.app.hasNetwork = !new_state.app.hasNetwork;
            return new_state;

		/*
			SUCCESS/ERROR MESSAGES
		*/
        case 'AUTH_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.auth.authSuccessMessage = action.message;
			new_state.app.loading = false;
			new_state.app.errorType = 'AUTH';
            return new_state;

        case 'RESET_AUTH_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.auth.authSuccessMessage = null;
			new_state.app.errorType = null;
            return new_state;

        case 'AUTH_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.auth.authErrorMessage = action.message;
			new_state.app.loading = false;
			new_state.app.errorType = 'AUTH';

			if (action.retryAction && action.retryAction.type) new_state.app.retryAction.type = action.retryAction.type;

			if (action.retryAction && action.retryAction.data) {
				new_state.app.retryAction.data = {
					...action.retryAction.data
				}
			}

            return new_state;

        case 'RESET_AUTH_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.auth.authErrorMessage = null;
			new_state.app.errorType = null;
			new_state.app.retryAction.type = null;
			new_state.app.retryAction.data = null;
            return new_state;

        case 'GEOLOCATION_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.geolocation.currentLocation = action.message;
            new_state.geolocation.geolocationError = true;
            new_state.app.errorType = 'GEOLOCATION';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_GEOLOCATION_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.geolocation.geolocationError = null;
			new_state.app.errorType = null;
            return new_state;

        case 'IMAGE_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.images.imageErrorMessage = action.message;
            new_state.app.errorType = 'IMAGE';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_IMAGE_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.images.imageErrorMessage = null;
            new_state.app.errorType = null;
            return new_state;

        case 'CLOUD_DATA_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.cloudData.cloudDataErrorMessage = action.message;
			new_state.app.loading = false;
			new_state.app.errorType = 'CLOUD_DATA';

			if (action.retryAction && action.retryAction.type) new_state.app.retryAction.type = action.retryAction.type;
			if (action.retryAction && action.retryAction.data) {
				new_state.app.retryAction.data = {
					...action.retryAction.data,
				}
			}
            return new_state;

        case 'RESET_CLOUD_DATA_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.cloudData.cloudDataErrorMessage = null;
			new_state.app.errorType = null;
			new_state.app.retryAction.type = null;
			new_state.app.retryAction.data = null;
            return new_state;

        case 'RESET_CLOUD_DATA_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.cloudData.cloudDataSuccess = null;
            new_state.app.currentAction = null;
            return new_state;

        case 'CLOUD_STORAGE_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.cloudStorage.cloudcloudStorageErrorMessage = action.message;
			new_state.app.loading = false;
			new_state.app.errorType = 'CLOUD_STORAGE';
			
			if (action.retryAction && action.retryAction.type) new_state.app.retryAction.type = action.retryAction.type;
			if (action.retryAction && action.retryAction.data) {
				new_state.app.retryAction.data = {
					...action.retryAction.data,
				}
			}
            return new_state;

        case 'RESET_CLOUD_STORAGE_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.cloudStorage.cloudcloudStorageErrorMessage = null;
			new_state.app.errorType = null;
			new_state.app.retryAction.type = null;
			new_state.app.retryAction.data = null;
            return new_state;

        case 'USER_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.app.userSuccessMessage = action.message;
			new_state.app.loading = false;
			new_state.app.errorType = 'USER';
            return new_state;

        case 'RESET_USER_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.app.userSuccessMessage = null;
			new_state.app.errorType = null;
            return new_state;

        case 'USER_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.app.userErrorMessage = action.message;
			new_state.app.loading = false;
			new_state.app.errorType = 'USER';

			if (action.retryAction && action.retryAction.type) new_state.app.retryAction.type = action.retryAction.type;
			if (action.retryAction && action.retryAction.data) {
				new_state.app.retryAction.data = {
					...action.retryAction.data,
				}
			}
            return new_state;

        case 'RESET_USER_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.app.userErrorMessage = null;
			new_state.app.errorType = null;
			new_state.app.retryAction.type = null;
			new_state.app.retryAction.data = null;
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

            new_state.appData.newNotes = null;
            new_state.appData.newImages = null;
            new_state.cloudData.cloudDataSuccess = true;
            new_state.app.loading = false;
            new_state.app.currentAction = action.currentAction;
			return new_state;

        case 'SET_NEW_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newNotes = action.newNotes;
            return new_state;

        case 'SET_NEW_PHOTOS':
            new_state = utilities.cloneObject(state);

            // Are we adding a single new photo or updating the whole lot (deleting a photo)
            if (action.newPhotos) {
                new_state.appData.newPhotos = action.newPhotos;
            }
            else {
                new_state.appData.newPhotos.push(action.newPhoto);
            }
                
            return new_state;

        case 'SET_NEW_VOICE_NOTES':
            new_state = utilities.cloneObject(state);
            new_state.appData.newVoiceNotes = action.newVoiceNotes;
            return new_state;

		case 'SET_USER_LOCATION':
			new_state = utilities.cloneObject(state);
			new_state.userData.profile.userLocation = action.userLocation;
			return new_state;

		case 'SET_USER_PHOTO':
			new_state = utilities.cloneObject(state);
			new_state.userData.profile.userPhotoUrl = action.userPhotoUrl;
			return new_state;   

        case 'SELECT_CATEGORY':
            new_state = utilities.cloneObject(state);
            new_state.appData.currentCategory = action.value;
            return new_state;

        default:
            return state;
    }
}