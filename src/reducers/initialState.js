import quotes from '../resources/quotes';
import toolTips from '../resources/toolTips';
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
        hasNetwork: true, // assume this is true on app load
        loading: false,
        showToolTips: false,

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
        currentToolTipUID: 'tooltip-1',
        currentLocation: null,
        currentCategory: 'All Categories',
        temporaryImage: null,

        newNotes: null,
        newPhotos: null,
        newVoiceNotes: null,

        quotes,
        toolTips,
        priorities,

        // From db
        announcement: null,
    },
    userData: {
        settings: {
            shouldPlaySound: {
                title: 'App Sounds',
                iconName: 'bell',
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
        categories: null,
    },
}

export default initialState;
