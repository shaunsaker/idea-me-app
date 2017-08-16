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
        categories: null,
    },
}

export default initialState;
