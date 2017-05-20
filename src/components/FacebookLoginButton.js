import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,    
} from 'react-native';
import { connect } from 'react-redux';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    AccessToken
} = FBSDK;

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    button: {

    },
    buttonText: {

    }
});

export class FacebookLoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signInUserWithFacebook() {
        console.log('Signing in')
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Facebook login cancelled');
                } else {
                    console.log(result);
                    AccessToken.getCurrentAccessToken()
                    .then((data) => {
                        console.log(data);
                        this.props.dispatch({
                            type: 'signInUserWithFacebook',
                            accessToken: data.accessToken
                        });
                    })
                    .catch((error) => {
                        console.log('Access token error', error);
                    });
                }
            },
            (error) => {
                console.log('Facebook login error', error);
            }
        )
    }

    signOut() {
        LoginManager.logOut().then((data) => console.log('User logged out', data)).catch((error) => console.log('Error logging out', error));
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.signInUserWithFacebook}
                    style={styles.button}>
                    <Text style={[styles.buttonText]}>Sign in with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.signOut}
                    style={styles.button}>
                    <Text style={[styles.buttonText]}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default connect()(FacebookLoginButton);