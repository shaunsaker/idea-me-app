import firestack from '../firestack';

const response = {
    success: null,
    message: null,
}

export default class Storage {
    static uploadUserPhoto(action) {
        return new Promise(resolve => {
            firestack.storage.uploadFile('photos/' + action.uid, action.path, { // Note: if you don't want to overwrite the previous photo, add the filename to the save path
				contentType: 'image/jpeg',
				contentEncoding: 'base64'
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