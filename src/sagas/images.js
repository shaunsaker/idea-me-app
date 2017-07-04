import { call, put } from 'redux-saga/effects';

import Images from '../images/index';

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
		const moveFileOptions = {
			path: imagePickerResponse.message.path,
			outputPath: '/storage/emulated/0/Pictures/IdeaMe_Photos/image-test.jpg',
		}

		const moveFileResponse = yield call(Images.moveFile, moveFileOptions);
		console.log('moveFileResponse', moveFileResponse);

		if (moveFileResponse.success) {
			const imageResizerOptions = {
				uri: moveFileResponse.message.outputPath,
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
					const image = {
						fullSize: imagePickerResponse.message.uri,
						cropped: imageCropperResponse.message,
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