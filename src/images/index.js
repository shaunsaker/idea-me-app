import {
	ImageEditor,
} from "react-native";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

import config from '../config';

const response = {
	success: null,
	message: null,
}

export default class Photos {
	static takePhoto() {
		return new Promise(resolve => {
			ImagePicker.launchCamera(config.images.imagePickerOptions, (imagePickerResponse) => {
				if (!imagePickerResponse.didCancel) {
					response = {
						success: true,
						message: imagePickerResponse,
					}
					resolve(response);
				}
				else {
					response = {
						success: false,
						message: null,
					}
					resolve(response);
				}
			});
		});
	}

	static choosePhoto() {
		return new Promise(resolve => {
			ImagePicker.launchImageLibrary(config.images.imagePickerOptions, (imagePickerResponse) => {
				if (!imagePickerResponse.didCancel) {
					response = {
						success: true,
						message: imagePickerResponse,
					}
					resolve(response);
				}
				else {
					response = {
						success: false,
						message: null,
					}
					resolve(response);
				}
			});
		});
	}

	static resizeImage(action) {
		return new Promise(resolve => {
			let portrait = action.height > action.width;

			const imageResizerOptions = [
				action.uri, // uri to image
				portrait ? config.images.maxImageWidth : config.images.maxImageWidth * 2, // maxWidth
				portrait ? config.images.maxImageWidth * 2 : config.images.maxImageWidth, // maxHeight
				...config.images.imageResizerOptions, // type, quality, rotation
			];

			ImageResizer.createResizedImage(...imageResizerOptions)
				.then((resizedImageUri) => {
					response = {
						success: true,
						message: {
							uri: resizedImageUri,
							portrait: portrait,
							width: action.width,
							height: action.height,
						}
					}
					resolve(response);
				})
				.catch((error) => {
					response = {
						success: false,
						message: error,
					}
					resolve(response);
				});
		});
	}

	static cropImage(action) {
		return new Promise(resolve => {
			const offsetX = action.portrait ? 0 : (config.images.maxImageWidth / 2 * action.width / action.height) - config.images.maxImageWidth / 2;
			const offsetY = action.portrait ? (config.images.maxImageWidth / 2 * action.height / action.width) - config.images.maxImageWidth / 2 : 0;

			const cropOptions = {
				offset: {
					x: offsetX,
					y: offsetY
				},
				size: {
					width: config.images.maxImageWidth,
					height: config.images.maxImageWidth
				}
			};

			ImageEditor.cropImage(action.uri, cropOptions,
				(uri) => {
					response = {
						success: true,
						message: uri,
					};
					resolve(response);
				},
				(error) => {
					response = {
						success: false,
						message: error,
					};
					resolve(response);
				});
		});
	}

	static moveFile(action) {
		return new Promise(resolve => {
			const mkdirOptions = {
				NSURLIsExcludedFromBackupKey: true // iOS only
			}

			RNFS.exists(action.path).then((result) => {
				RNFS.mkdir('/storage/emulated/0/Pictures/IdeaMe_Photos/', mkdirOptions)
					.then(() => {
						RNFS.moveFile(action.path, action.outputPath)
							.then(() => {
								response = {
									success: true,
									message: {
										outputPath: action.outputPath,
									},
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
					})
					.catch((error) => {
						response = {
							success: false,
							message: error.message,
						}

						resolve(response);
					})
			});
		});
	}
}