import quotes from '../resources/quotes';
import suburbs from '../resources/suburbs';

const initialState = {
    auth: {
        uid: null,
        authenticated: null,
        userPassword: null,        
        anonymous: null,
        redirectToWelcomePage: null,

		authSuccessMessage: null, // for password reset feedback
        authErrorMessage: null,
    },
    app: {
        loading: true, // needs to be true on initial app load

        errorType: null,
		retryAction: {
			type: null,
			data: null,
		},

        userSuccessMessage: null,
        userErrorMessage: null,
    },
    cloudData: {
        cloudDataSuccess: null,
        cloudDataErrorMessage: null,
    },
    cloudStorage: {
        cloudStorageSuccess: null,
        cloudStorageErrorMessage: null,
    },
    geolocation: {
        currentLocation: null,
        geolocationSuccess: null,
        geolocationError: null,
    },
    appData: {
        quotes,
        currentCategory: 'All Categories',
        priorities: [
            'High',
            'Medium',
            'Low'
        ],
        suburbs,
    },
    userData: {
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoUrl: null,
        },
        categories: [],
        ideas: [],
    },
}

export default initialState;
