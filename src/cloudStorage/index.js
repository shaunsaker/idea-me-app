import firestack from '../firestack';

import config from '../config';

const response = {
    success: null,
    message: null,
}

export default class CloudStorage {
    static uploadUserPhoto(action) {
        return new Promise(resolve => {
            firestack.storage.uploadFile('photos/' + action.uid, action.uri, { // Note: if you don't want to overwrite the previous photo, add the filename to the save uri
                ...config.images.firestackStorageOptions
			})
            .then((data) => {
                response.success = true;
                response.message = {
                    photoUrl: data.downloadUrl,
                    uid: action.uid
                };
                resolve(response);
            })
            .catch(error => {
				response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }
}