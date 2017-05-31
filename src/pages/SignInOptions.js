import React from "react";
import {
    View,
    Text,
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader/index';
import Growl from '../components/Growl/index';

import styles from '../styles/pages/SignInOptions';
import styleConstants from '../styles/styleConstants';

export class SignInOptions extends React.Component {
    constructor(props) {
        super(props);
        
        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
        this.signInUserWithGoogle = this.signInUserWithGoogle.bind(this);
        this.signInUserWithEmail = this.signInUserWithEmail.bind(this);
        this.signInUserAnonymously = this.signInUserAnonymously.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {
        if (this.props.authenticated) {
            Actions.ideas();
        }
    }

    signInUserWithFacebook() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        // Do stuff
    }

    signInUserWithGoogle() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        // Do stuff
    }

    signInUserWithEmail() {
        Actions.signInWithEmail();
    }

    signInUserAnonymously() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        // Do stuff
    }

    render() {
        return (
            <View style={styles.container}>
                <Header 
                    headerShadow={false}
                    rightIconName='close'
                    rightIconSize={28}
                    rightIconStyle={styles.headerIcon}
                    handleRightIconPress={() => Actions.pop()}/>

                <View style={styles.buttonContainer}>
                    <Button
                        materialCommunityIcon
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook} 
                        style={styles.button}                              
                        text='Continue with Facebook'
                        styleMode='transparentReversed' />
                    <Button
                        materialCommunityIcon
                        iconName='google'
                        handlePress={this.signInUserWithGoogle} 
                        style={styles.button} 
                        text='Continue with Google'
                        styleMode='transparentReversed' />
                    <Button
                        materialCommunityIcon
                        iconName='email'
                        handlePress={this.signInUserWithEmail} 
                        style={styles.button} 
                        text='Continue with Email'
                        styleMode='transparent' />
                    <Button
                        materialCommunityIcon
                        iconName='face-profile'
                        handlePress={this.signInUserAnonymously} 
                        style={styles.button} 
                        text='Continue Anonymously'
                        styleMode='transparent' />
                </View>

				<Growl />

				<Loader />
                
            </View>
        );
    }
}

function mapStateToProps(state) {
    return ({
        errorMessage: state.main.userAuth.userAuthErrorMessage,
        authenticated: state.main.userAuth.authenticated,
    });
}

export default connect(mapStateToProps)(SignInOptions);