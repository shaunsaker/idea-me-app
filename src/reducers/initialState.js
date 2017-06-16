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
        loading: false, // needs to be true on initial app load

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
        currentCategory: 'All Categories',
        quotes, // // can be an array because we are not saving this anywhere
        suburbs, // as above
        priorities: {
            '0': {
                title: 'High',
                uid: '0',
            },
            '1': {
                title: 'Medium',
                uid: '1',
            },
            '2': {
                title: 'Low',
                uid: '2',
            },
        },
    },
    userData: {
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoUrl: null,
        },

        // object of objects { uid: { title: 'X' ...}, ...}
        // ideas: null,
        ideas: {
            '1497182894539': {
                title: 'Test1',
                description: null,
                category: 'Test',
                priority: 'Low',
                uid: '1497182894539',
            },
             '1497182894540': {
                title: 'Test2',
                description: null,
                category: null,
                priority: 'High',
                uid: '1497182894540',
            },
            '1497182894541': {
                title: 'Test3',
                description: null,
                category: 'Test',
                priority: 'Medium',
                uid: '1497182894541',
            },
        },

        // object of objects { uid: { title: 'X' }, ...}
        // categories: null,
        categories: {
            '1497182894542': {
                title: 'Test',
                uid: '1497182894542',
            },
            '1497182894543': {
                title: 'App',
                uid: '1497182894543',
            },
        }, 
    },
}

export default initialState;
