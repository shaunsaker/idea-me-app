import { Easing } from 'react-native';

const config = {};

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
}

config.images = {
    maxImageWidth: 100,
    imagePickerOptions: {
        mediaType: 'photo',
        noData: true,
    },
    imageResizerOptions: [
        'JPEG',
        100,
    ],
    firestackStorageOptions: {
        contentType: 'image/jpeg',
        contentEncoding: 'base64',
    },
};  

config.googleSignIn = {
    webClientId: '',
    iosClientId: '',
    offlineAccess: false,
};

export default config;