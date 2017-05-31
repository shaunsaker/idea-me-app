import React from "react";
import {
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

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
            <Page
                backgroundColor={styleConstants.primary}
                fauxFooter={true} >

                <Header 
                    headerShadow={false}
                    rightIconName='close'
                    rightIconSize={28}
                    handleRightIconPress={() => Actions.pop()}/>

                <View>
                    <Button
                        materialCommunityIcon
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook}                         
                        text='Continue with Facebook'
                        styleMode='transparentReversed' />
                    <Button
                        materialCommunityIcon
                        iconName='google'
                        handlePress={this.signInUserWithGoogle} 
                        text='Continue with Google'
                        styleMode='transparentReversed' />
                    <Button
                        materialCommunityIcon
                        iconName='email'
                        handlePress={this.signInUserWithEmail} 
                        text='Continue with Email'
                        styleMode='transparent' />
                    <Button
                        materialCommunityIcon
                        iconName='face-profile'
                        handlePress={this.signInUserAnonymously} 
                        text='Continue Anonymously'
                        styleMode='transparent' />
                </View>

				<Growl />

				<Loader />
                
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        errorMessage: state.main.auth.authErrorMessage,
        authenticated: state.main.auth.authenticated,
    });
}

export default connect(mapStateToProps)(SignInOptions);