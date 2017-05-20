import firestack from '../firestack';

const response = {
    authenticated: null,
    message: null
};

export default class Auth {
    static getUserAuth() {
        return new Promise(resolve => {
            firestack.auth.getCurrentUser()
                .then((user) => {
                    response.authenticated = user.authenticated;
                    response.message = user;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static signUpUser(action) {
        return new Promise(resolve => {
            firestack.auth.createUserWithEmail(action.email, action.password)
                .then((user) => {
                    response.authenticated = true;
                    response.message = user;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static signInUser(action) {
        return new Promise(resolve => {
            firestack.auth.signInWithEmail(action.email, action.password)
                .then((user) => {
                    response.authenticated = true;
                    response.message = user;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static signOutUser() {
        return new Promise(resolve => {
            firestack.auth.signOut()
                .then((user) => {
					response.success = true;
                    resolve(response);
                })
                .catch(error => {
					response.success = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }
}