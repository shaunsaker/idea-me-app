import firestack from '../firestack';
// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'; // TODO: Add this when ready
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const response = {
    authenticated: null,
    message: null,
    success: null
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
                    response.authenticated = false;
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
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static signInUserWithEmail(action) {
        return new Promise(resolve => {
            firestack.auth.signInWithEmail(action.email, action.password)
                .then((user) => {
                    response.authenticated = true;
                    response.message = user;
                    resolve(response);
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static sendPasswordResetEmail(action) {
        return new Promise(resolve => {
            firestack.auth.sendPasswordResetWithEmail(action.email)
                .then(() => {
                    response.success = true;
                    response.message = null;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static signInUserWithFacebook(action) {
        return new Promise(resolve => {

            LoginManager.logInWithReadPermissions(['public_profile, email_address']).then(
                (result) => {
                    if (result.isCancelled) {
                        response.authenticated = false;
                        response.message = 'Facebook login cancelled';
                        resolve(response);
                    } else {
                        AccessToken.getCurrentAccessToken()
                            .then((data) => {
                                firestack.auth.signInWithProvider('facebook', data.accessToken, '')
                                    .then((user) => {
                                        response.authenticated = true;
                                        response.message = user;
                                        resolve(response);
                                    })
                                    .catch(error => {
                                        response.authenticated = false;
                                        response.message = error;
                                        resolve(response);
                                    });
                            })
                            .catch((error) => {
                                response.authenticated = false;
                                response.message = 'Unable to get access token';
                                resolve(response);
                            });
                    }
                },
                (error) => {
                    response.authenticated = false;
                    response.message = error; // TODO: check this 
                    resolve(response);
                }
            )
        });
    }

    // static signInUserWithGoogle(action) {
    //     return new Promise(resolve => {

    //         GoogleSignin.hasPlayServices({ autoResolve: true })
    //             .then(() => {
    //                 GoogleSignin.configure({
    //                     webClientId: '158445764285-o30htc722gonf4qs7bg5ir59vteo5tnj.apps.googleusercontent.com',
    //                     offlineAccess: false
    //                 })
    //                     .then(() => {
    //                         GoogleSignin.signIn()
    //                             .then((user) => {
    //                                 firestack.auth.signInWithProvider('google', user.idToken, '')
    //                                     .then((user) => {
    //                                         response.authenticated = true;
    //                                         response.message = user;
    //                                         resolve(response);
    //                                     })
    //                                     .catch(error => {
    //                                         response.authenticated = false;
    //                                         response.message = error;
    //                                         resolve(response);
    //                                     });
    //                             })
    //                             .catch((error) => {
    //                                 response.authenticated = false;
    //                                 response.message = error; // TODO: check this
    //                                 resolve(response);
    //                             })
    //                             .done();
    //                     })
    //                     .catch((error) => {
    //                         response.authenticated = false;
    //                         response.message = error; // TODO: check this
    //                         resolve(response);
    //                     });
    //             })
    //             .catch((error) => {
    //                 response.authenticated = false;
    //                 response.message = error; // TODO: check this
    //                 resolve(response);
    //             });
    //     });
    // }

    static signInUserAnonymously() {
        return new Promise(resolve => {
            firestack.auth.signInAnonymously()
                .then((user) => {
                    response.authenticated = true;
                    response.message = user;
                    resolve(response);
                })
                .catch(error => {
					response.authenticated = false;
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