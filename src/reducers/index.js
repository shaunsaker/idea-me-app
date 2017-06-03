let cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
}

import utilities from '../utilities';

import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {

        /* AUTH */
        case 'UPDATE_USER_EMAIL':
            new_state = cloneObject(state);
            new_state.userData.profile.email = action.value;
            return new_state;

        case 'UPDATE_USER_PASSWORD':
            new_state = cloneObject(state);
            new_state.auth.password = action.value;
            return new_state;

        case 'REDIRECT_USER_TO_WELCOME':
            new_state = cloneObject(state);
            new_state.auth.redirectToWelcomePage = true;
            return new_state;

        case 'SIGN_IN_USER':
            new_state = cloneObject(state);
            new_state.auth.authenticated = true;
            new_state.auth.uid = action.uid;
            new_state.auth.redirectToWelcomePage = false;
            new_state.app.loading = false;
            return new_state;

        case 'SIGN_OUT_USER':
            new_state = cloneObject(state);
            new_state.auth.authenticated = false;
            new_state.auth.uid = null;
            new_state.auth.redirectToWelcomePage = true;
            return new_state;
        
		/*
			GEOLOCATION
		*/
		case 'SET_CURRENT_LOCATION':
			new_state = cloneObject(state);
			new_state.geolocation.currentLocation = action.userLocation;
			new_state.geolocation.geolocationSuccess = true;
			new_state.app.loading = false; // for profile page
			return new_state;

        /* APP */
        case 'TOGGLE_LOADING':
            new_state = cloneObject(state);
            new_state.app.loading = !new_state.app.loading;
            return new_state;

        /* SUCCESS/ERROR MESSAGES */
        case 'AUTH_ERROR':
            new_state = cloneObject(state);
            new_state.auth.authErrorMessage = action.message;
            new_state.app.errorType = 'AUTH';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_AUTH_ERROR':
            new_state = cloneObject(state);
            new_state.auth.authErrorMessage = null;
            new_state.app.errorType = null;
            return new_state;

        case 'AUTH_SUCCESS':
            new_state = cloneObject(state);
            new_state.auth.authSuccessMessage = action.message;
            new_state.app.errorType = 'AUTH';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_AUTH_SUCCESS':
            new_state = cloneObject(state);
            new_state.auth.authSuccessMessage = null;
            new_state.app.errorType = null;
            return new_state;

        case 'USER_ERROR':
            new_state = cloneObject(state);
            new_state.app.userErrorMessage = action.message;
            new_state.app.errorType = 'USER';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_USER_ERROR':
            new_state = cloneObject(state);
            new_state.app.userErrorMessage = null;
            new_state.app.errorType = null;
            return new_state;

        case 'API_ERROR':
            new_state = cloneObject(state);
            new_state.api.apiErrorMessage = action.message;
            new_state.app.errorType = 'API';
            new_state.app.retryAction = action.retryAction;
            new_state.app.loading = false;
            return new_state;

        case 'RESET_API_ERROR':
            new_state = cloneObject(state);
            new_state.api.apiErrorMessage = null;
            new_state.app.errorType = null;
            return new_state;

        case 'API_SAVE_SUCCESS':
            new_state = cloneObject(state);
            new_state.api.apiSuccess = true;
            new_state.app.loading = false;
            return new_state;

        case 'API_LOAD_SUCCESS':
            new_state = cloneObject(state);

            // In case it is a new user with no data
            if (action.data) {
                new_state.userData.ideas = action.data.ideas;
                new_state.userData.categories = action.data.categories;
            }
            new_state.api.apiSuccess = true;
            new_state.app.loading = false;
            return new_state;

        case 'STORAGE_ERROR':
            new_state = cloneObject(state);
            new_state.storage.storageErrorMessage = action.message;
            new_state.app.errorType = 'STORAGE';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_STORAGE_ERROR':
            new_state = cloneObject(state);
            new_state.storage.storageErrorMessage = null;
            new_state.app.errorType = null;
            new_state.app.loading = false;
            return new_state;

        case 'GEOLOCATION_ERROR':
            new_state = cloneObject(state);
            new_state.geolocation.geolocationErrorMessage = action.message;
            new_state.app.errorType = 'GEOLOCATION';
            new_state.app.loading = false;
            return new_state;

        case 'RESET_GEOLOCATION_ERROR':
            new_state = cloneObject(state);
            new_state.geolocation.geolocationErrorMessage = null;
            new_state.app.errorType = null;
            return new_state;

        /* USER DATA */
		case 'SET_USER_LOCATION':
			new_state = cloneObject(state);
			new_state.user.location = action.location;
			return new_state;

		case 'SET_USER_PHOTO':
			new_state = cloneObject(state);
			new_state.user.photoUrl = action.photoUrl;
			new_state.api.apiSuccess = true;
            new_state.app.loading = false;
			return new_state;   

        case 'SELECT_CATEGORY':
            new_state = cloneObject(state);
            new_state.appData.currentCategory = action.value;
            return new_state;

        case 'UPDATE_USER_IDEAS':
            new_state = cloneObject(state);
            new_state.userData.ideas = action.ideas;
            new_state.app.loading = true;
            return new_state;

        case 'UPDATE_USER_CATEGORIES':
            new_state = cloneObject(state);
            new_state.userData.categories = action.categories;
            new_state.app.loading = true;
            return new_state;

        case 'DELETE_IDEA':
            new_state = cloneObject(state);
            let id;
            let newIdeas = new_state.userData.ideas;
            newIdeas.map((value, index) => {
                if (value.title === action.idea.title) {
                    id = index;
                }
            });
            newIdeas.splice(id, 1);
            new_state.userData.ideas = newIdeas;
            return new_state;

        case 'DELETE_CATEGORY':
            new_state = cloneObject(state);
            new_state.userData.categories.splice(action.index, 1);

            // update ideas categorys
            // set all matching categorys to null
            // all categorys above index should be decreased by 1
            const ideas = new_state.userData.ideas;
            ideas.map((value, index) => {
                if (value.category === action.index) {
                    value.category = null;
                }
                else if (value.category > action.index) {
                    value.category--;
                }
            });
            return new_state;

        default:
            return state;
    }
}