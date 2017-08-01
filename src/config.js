import { Easing } from 'react-native';

const config = {};

config.appName = 'IdeaMe';
config.appVersion = '0.0.1';
config.appUrl = 'http://shaunsaker.com/showcase/IdeaMe';
config.appShareMessage = 'Hey! Check this out... ';

config.developer = {
    name: 'Shaun Saker',
    email: 'info@shaunsaker.com',
};

config.testing = {
    firstTimeUser: false,
    oneWeekUser: false,
}

config.firebase = {
    debug: false,
    persistence: true,
};

config.animation = {
    duration: {
        short: 250,
        long: 750,
    },
    easing: Easing.gentle,
};

config.modal = {
    animation: 'slide',
};

config.images = {
    maxImageWidth: 100,
    imagePickerOptions: {
        mediaType: 'photo',
        noData: true, // don't attach base64 data - greatly improves performance
        storageOptions: {
            skipBackup: true, // don't backup to iOS cloud
        },
    },
    imageResizerOptions: [
        'JPEG',     // format
        100,        // quality
        0,          // rotation
    ],
    firebaseStorageOptions: {
        contentType: 'image/jpeg',
        contentEncoding: 'base64',
    },
};

config.voiceNotes = {
    format: 'mp4',
}

config.googleSignIn = {
    webClientId: "77557779345-ap7udmcr3md8eu5c7akc1i0nkuekvi4l.apps.googleusercontent.com",
    iosClientId: '',
    offlineAccess: false,
};

export default config;