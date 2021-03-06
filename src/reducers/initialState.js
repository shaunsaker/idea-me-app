import quotes from '../resources/quotes';
import priorities from '../resources/priorities';

const initialState = {
    userAuth: {
        authenticated: null,
        uid: null,

        firstTimeUser: null,
        anonymous: null,
        redirectToWelcomePage: null,

        userPassword: null,
    },
    appState: {
        loading: false,

        error: {
            type: null,
            message: null,
            success: null, // if true, indicates success message
        },
        retryAction: {
            type: null,
            data: null,
        },
    },
    appData: {
        currentLocation: null,
        currentCategory: 'All Categories',
        temporaryImage: null,

        newNotes: null,
        newPhotos: null,
        newVoiceNotes: null,

        quotes,
        priorities,
    },
    userData: {
        settings: {
            shouldPlaySound: {
                title: 'Sounds',
                iconName: 'music_note',
                enabled: true,
                uid: 'shouldPlaySound',
            },
        },
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoUrl: null,
        },
        ideas: null,
        categories: {
            'category-1': {
                uid: 'category-1',
                title: 'Home',
            },
            'category-2': {
                uid: 'category-2',
                title: 'Work',
            },
            'category-3': {
                uid: 'category-3',
                title: 'Save the World',
            },
        },
    },
};

export default initialState;
