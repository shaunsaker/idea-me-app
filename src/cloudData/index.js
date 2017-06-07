import firestack from '../firestack';

const response = {
    success: null,
    message: null,
}

export default class CloudData {
    static loadUserData(action) {
        console.log('Attempting to loadUserData', action)
        return new Promise(resolve => { 
            firestack.database.ref('users/' + action.uid).on('value', snapshot => {
                response.success = true;
                response.message = snapshot.val();
                resolve(response);
            }, (error) => {
                response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserData(action) {

        // Allows us to pass in 'profile' and only update that node
        const nodeRef = action.node || '';

        return new Promise(resolve => {
            firestack.database.ref('users/' + action.uid + '/' + nodeRef).update({ 
                ...action.userData,
            })
            .then(() => {
                response.success = true;
                response.message = null;
                resolve(response);
            })
            .catch(error => {
                response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserIdeas(action) {
        const uid = firestack.auth.getCurrentUser().user.uid;

        return new Promise(resolve => {
            firestack.database.ref('users/' + uid).update({ // PLEASE NOTE: use database as method and not as instance, ie. not database()
                ideas: action.ideas
            })
            .then(() => {
                response.success = true;
                response.message = null;
                resolve(response);
            })
            .catch(error => {
                response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserCategories(action) {
        const uid = firestack.auth.getCurrentUser().user.uid;

        return new Promise(resolve => {
            firestack.database.ref('users/' + uid).update({ // PLEASE NOTE: use database as method and not as instance, ie. not database()
                categories: action.categories
            })
            .then(() => {
                response.success = true;
                response.message = null;
                resolve(response);
            })
            .catch(error => {
                response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserLocation(action) {
        const uid = firestack.auth.getCurrentUser().user.uid;

        return new Promise(resolve => {
            firestack.database.ref('users/' + uid + '/profile').update({ 
				userLocation: action.userLocation,
            })
            .then(() => {
                response.success = true;
                response.message = action.userLocation;
                resolve(response);
            })
            .catch(error => {
				response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserPhoto(action) {
        const uid = firestack.auth.getCurrentUser().user.uid;

        return new Promise(resolve => {
            firestack.database.ref('users/' + uid + '/profile').update({ 
				userPhotoUrl: action.userPhotoUrl,
            })
            .then(() => {
                response.success = true;
                response.message = action.userPhotoUrl;
                resolve(response);
            })
            .catch(error => {
				response.success = false;
                response.message = 'Failed';
                resolve(response);
            });
        });
    }
}