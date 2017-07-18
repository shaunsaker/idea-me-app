import { Easing } from 'react-native';

const config = {};

config.appName = 'IdeaMe';

config.developer = {
    name: 'Shaun Saker',
    email: 'info@shaunsaker.com',
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
    firestackStorageOptions: {
        contentType: 'image/jpeg',
        contentEncoding: 'base64',
    },
}; 

config.voiceNotes = {
    format: 'mp4',
} 

config.googleSignIn = {
    webClientId: '',
    iosClientId: '',
    offlineAccess: false,
};

export default config;