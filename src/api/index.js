import firestack from '../firestack';

const response = {
    success: null,
    message: null,
}

export default class ApiData {
    static saveUserIdeas(action) {
        let uid = action.uid;

        // If we did not receive the uid via props, get the uid from firestack
        if (!uid) {
            uid = firestack.auth.getCurrentUser().user.uid; // TODO: Check this
        }
        
        const userData = action.ideas;

        return new Promise(resolve => {
            firestack.database.ref(uid).update({ // PLEASE NOTE: use database as method and not as instance, ie. not database()
                ideas: userData
            })
            .then(() => {
                response.success = true;
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
        
        const userData = action.categories;

        return new Promise(resolve => {
            firestack.database.ref(uid).update({ // PLEASE NOTE: use database as method and not as instance, ie. not database()
                categories: userData
            })
            .then(() => {
                response.success = true;
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

        console.log(uid);
        
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