import RNFS from 'react-native-fs';

import config from '../config';

const response = {
    success: null,
    message: null,
}

export default class FileSystem {
    static createAppPhotoDirectory() {
        return new Promise(resolve => {
            const appPhotosDir = RNFS.PicturesDirectoryPath + '/' + config.appName;
            console.log('appPhotosDir:', appPhotosDir);

            RNFS.mkdir(appPhotosDir)
                .then(() => {
                    response = {
                        success: true,
                        message: appPhotosDir,
                    }

                    resolve(response);
                })
                .catch((error) => {
                    response = {
                        success: false,
                        message: error.message,
                    }

                    resolve(response);
                });
        });
    }

    static moveFile(action) {
        return new Promise(resolve => {
            RNFS.moveFile(action.path, action.outputPath)
                .then(() => {
                    response = {
                        success: true,
                        message: action.outputPath,
                    }

                    resolve(response);
                })
                .catch((error) => {
                    response = {
                        success: false,
                        message: error.message,
                    }

                    resolve(response);
                });
        });
    }
}