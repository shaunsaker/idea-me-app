import { call, put } from 'redux-saga/effects';
import RNFS from 'react-native-fs';

import Images from '../images/index';
import FileSystem from '../fileSystem/index';

import config from '../config';
import utilities from '../utilities';

export function* handleImage(action) {
    let imagePickerResponse;

    if (action.option === 'Take a Photo') {
        imagePickerResponse = yield call(Images.takePhoto);
        console.log('imagePickerResponse', imagePickerResponse);
    }

    // Choose a Photo
    else {
        imagePickerResponse = yield call(Images.choosePhoto);
        console.log('imagePickerResponse', imagePickerResponse);
    }

    if (imagePickerResponse.success) {
        const appPhotosDir = RNFS.PicturesDirectoryPath + '/' + config.appName;
        console.log('appPhotosDir:', appPhotosDir);

        const createDirectoryResponse = yield call(FileSystem.createDirectory, appPhotosDir);
        console.log('createDirectoryResponse', createDirectoryResponse);

        if (createDirectoryResponse.success) {
            const outputPath = createDirectoryResponse.message + '/' + utilities.getFileName(fileExistsResponse.message);
            console.log('Output path: ', outputPath);

            const moveFileOptions = {
                path: fileExistsResponse.message,
                outputPath,
            }

            const moveFileResponse = yield call(FileSystem.moveFile, moveFileOptions);
            console.log('moveFileResponse', moveFileResponse);

            if (moveFileResponse.success) {
                const imageResizerOptions = {
                    uri: "file:" + moveFileResponse.message,
                    width: imagePickerResponse.message.width,
                    height: imagePickerResponse.message.height,
                }

                const imageResizerResponse = yield call(Images.resizeImage, imageResizerOptions);
                console.log('imageResizerResponse', imageResizerResponse);

                if (imageResizerResponse.success) {
                    const imageCropperOptions = {
                        uri: imageResizerResponse.message.uri,
                        portrait: imageResizerResponse.message.portrait,
                        width: imageResizerResponse.message.width,
                        height: imageResizerResponse.message.height,
                    }

                    const imageCropperResponse = yield call(Images.cropImage, imageCropperOptions);
                    console.log('imageCropperResponse', imageCropperResponse);

                    if (imageCropperResponse.success) {
                        const croppedImagePath = imageCropperResponse.message.replace('file:', '');
                        const croppedImageOutputPath = utilities.appendStringToFileName(moveFileResponse.message, '-cropped');

                        const moveCroppedFileOptions = {
                            path: croppedImagePath,
                            outputPath: croppedImageOutputPath,
                        }

                        const moveCroppedFileResponse = yield call(FileSystem.moveFile, moveCroppedFileOptions);

                        if (moveCroppedFileResponse.success) {
                            const image = {
                                fullSize: "file:" + moveFileResponse.message,
                                cropped: "file:" + moveCroppedFileResponse.message,
                                uid: utilities.createUID(),
                            };

                            if (action.ideaPhoto) { // flag indicating this is an idea's photo
                                yield put({
                                    type: 'UPDATE_NEW_PHOTOS',
                                    newPhoto: image,
                                });
                            }
                            else {

                                // Won't save afterwards, the user should save it themselves
                                yield put({
                                    type: 'SET_USER_PHOTO',
                                    userPhotoUrl: image,
                                });
                            }
                        }
                    }
                    else {
                        console.log('Error')
                    }
                }
                else {
                    console.log('Error')
                }
            }
            else {
                console.log('Error')
            }
        }
        else {
            console.log('Error')
        }
    }
    else {
        console.log('Error')
    }
}