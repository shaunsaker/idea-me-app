import utilities from '../utilities';
import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {

        /* AUTH */
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
			new_state.auth.anonymous = action.anonymous;

			if (action.userEmail) new_state.userData.profile.userEmail = action.userEmail;
			if (action.userName) new_state.userData.profile.userName = action.userName;
			if (action.userPhotoUrl) new_state.userData.profile.userPhotoUrl = action.userPhotoUrl;

            return new_state;

        case 'SIGN_OUT_USER':
            new_state = utilities.cloneObject(state);
            new_state.auth.authenticated = false;
            new_state.auth.uid = null;
            new_state.auth.redirectToWelcomePage = true;
			new_state.auth.anonymous = false;
			
			new_state.userData.profile.userEmail = null;
			new_state.userData.profile.userName = null;
			new_state.userData.profile.userPhotoUrl = null;
			new_state.userData.profile.userLocation = null;

            return new_state;

        /* USER DATA */
        case 'UPDATE_USER_EMAIL':
            new_state = utilities.cloneObject(state);
            new_state.userData.profile.userEmail = action.value;
            return new_state;

        case 'UPDATE_USER_DATA':
			new_state = utilities.utilities.cloneObject(state);
            
			// We only use a node if we're saving user data, so we can assume our arrays (if any) will be true arrays
            if (action.node) {

				// If we have anything but an object
				if (Array.isArray(action.userData) || !typeof(action.userData) === 'object') { // in js an array is considered a type of object, hence the isArray method
					new_state.userData[action.node] = action.userData;
				}

				// We have an object
				else {
					for (key in action.userData) {
						new_state.userData[action.node][key] = action.userData[key];
					}
				}
            }

			// When we are loading user data
            else {

				// Check if any of our key's values are Firebase arrays (object of objects with keys that start from '0')
				for (key in action.userData) {
					if (action.userData[key]['0']) {
						const array = utilities.objectToArray(action.userData[key]);
						new_state.userData[key] = array;
					}
					else {
						new_state.userData[key] = action.userData[key];
					}
				} 
            }

            new_state.cloudData.cloudDataSuccess = true;
            new_state.app.loading = false;

			return new_state;

		case 'SET_USER_LOCATION':
			new_state = utilities.cloneObject(state);
			new_state.userData.profile.userLocation = action.userLocation;
			return new_state;

        case 'SELECT_CATEGORY':
            new_state = utilities.cloneObject(state);
            new_state.appData.currentCategory = action.value;
            return new_state;

        case 'UPDATE_USER_IDEAS':
            new_state = utilities.cloneObject(state);
            new_state.userData.ideas = action.ideas;
            new_state.app.loading = true;
            return new_state;

        case 'UPDATE_USER_CATEGORIES':
            new_state = utilities.cloneObject(state);
            new_state.userData.categories = action.categories;
            new_state.app.loading = true;
            return new_state;

        case 'DELETE_IDEA':
            new_state = utilities.cloneObject(state);
            new_state.userData.ideas = utilities.deleteIdea(action.idea, new_state.userData.ideas);
            return new_state;
        
		/*
			GEOLOCATION
		*/
		case 'SET_CURRENT_LOCATION':
			new_state = utilities.cloneObject(state);
			new_state.geolocation.currentLocation = action.userLocation;
			new_state.geolocation.geolocationSuccess = true;
			new_state.app.loading = false; // for profile page
			return new_state;

        /* APP */
        case 'TOGGLE_LOADING':
            new_state = utilities.cloneObject(state);
            new_state.app.loading = !new_state.app.loading;
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

		// Note: There is no CLOUD_DATA_SUCCESS action
        case 'RESET_CLOUD_DATA_SUCCESS':
            new_state = utilities.cloneObject(state);
            new_state.cloudData.cloudDataSuccess = null;
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

        default:
			return state;
    }
}