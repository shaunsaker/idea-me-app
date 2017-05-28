import firestack from '../firestack';

const response = {
    success: null,
    message: null,
}

export default class Data {
    static saveUserIdeas(action) {
        let uid = action.uid;

        // If we did not receive the uid via props, get the uid from firestack
        if (!uid) {
            uid = firestack.auth.getCurrentUser().user.uid; // BUG: This does not work after first time sign in
        }

        return new Promise(resolve => {
            firestack.database.ref(uid).update({ // PLEASE NOTE: use database as method and not as instance, ie. not database()
                ideas: action.ideas
            })
            .then(() => {
                response.success = true;
                response.message = null;
                resolve(response);
            })
            .catch(error => {
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserCategories(action) {
        let uid = action.uid;

        // If we did not receive the uid via props, get the uid from firestack
        if (!uid) {
            uid = firestack.auth.getCurrentUser().user.uid; // TODO: Check this
        }

        return new Promise(resolve => {
            firestack.database.ref(uid).update({ // PLEASE NOTE: use database as method and not as instance, ie. not database()
                categories: action.categories
            })
            .then(() => {
                response.success = true;
                response.message = null;
                resolve(response);
            })
            .catch(error => {
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static loadUserData(action) {
        let uid = action.uid;

        // If we did not receive the uid via props, get the uid from firestack
        if (!uid) {
            uid = firestack.auth.getCurrentUser().user.uid; // TODO: Check this
        }
        
        let userData;

        return new Promise(resolve => { 
            firestack.database.ref(uid).on('value', snapshot => {
                response.success = true;
                response.message = snapshot.val();
                resolve(response);
            }, (error) => {
                response.message = error.message;
                resolve(response);
            });
        });
    }
}