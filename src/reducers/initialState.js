import quotes from '../resources/quotes';

const initialState = {
    auth: {
        uid: null,
        authenticated: null,
        firstTimeUser: null,
        anonymous: null,
        redirectToWelcomePage: null,
        userPassword: null,

        authSuccessMessage: null, // for password reset feedback
        authErrorMessage: null,
    },
    app: {
        hasNetwork: true, // assume this is true on app load
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
    images: {
        temporaryImage: null,
        imageErrorMessage: null,
    },
    fileSystem: {
        fileSystemErrorMessage: null,
    },
    appData: {
        firstTimeUserIdea: {
            title: 'Get Familiar with IdeaMe',
            description: "Hey! You've made it. You're a few steps away from success. Follow the tooltips for some handy advice and if all else fails, give us a shout from the menu found on your Profile page. We are super keen to hear from you! Good luck!",
            category: null,
            priority: 'High',
            uid: '583027200',
        },
        currentCategory: 'All Categories',
        quotes, // can be an array because we are not saving this anywhere
        priorities: {
            '583027200': {
                title: 'Low',
                uid: '583027200',
            },
            '583027201': {
                title: 'Medium',
                uid: '583027201',
            },
            '583027202': {
                title: 'High',
                uid: '583027202',
            },
        },
        newNotes: null,
        newPhotos: null,
        newVoiceNotes: null,
    },
    userData: {
        profile: {
            userName: null,
            userEmail: null,
            userLocation: 'Somerset West',
            userPhotoUrl: null,
        },

        // object of objects { uid: { title: 'X' ...}, ...}
        ideas: null,
        // ideas: {
        //     '1497182894539': {
        //         title: 'Test1',
        //         description: null,
        //         category: 'Test',
        //         priority: 'High',
        //         uid: '1497182894539',
        //     },
        //      '1497182894540': {
        //         title: 'Test2',
        //         description: null,
        //         category: null,
        //         priority: 'Low',
        //         uid: '1497182894540',
        //     },
        //     '1497182894541': {
        //         title: 'Test3',
        //         description: null,
        //         category: 'Test',
        //         priority: 'Medium',
        //         uid: '1497182894541',
        //     },
        // },

        // object of objects { uid: { title: 'X' }, ...}
        categories: null,
        // categories: {
        //     '1497182894542': {
        //         title: 'Test',
        //         uid: '1497182894542',
        //     },
        //     '1497182894543': {
        //         title: 'App',
        //         uid: '1497182894543',
        //     },
        // }, 
    },
}

export default initialState;
