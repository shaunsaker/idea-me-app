import React from "react";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import InfoBlock from '../components/InfoBlock';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styleConstants from '../styles/styleConstants';

export class SignInWithEmail extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.signIn = this.signIn.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    static get propTypes() {
        return {
            userEmail: React.PropTypes.string,
            userPassword: React.PropTypes.string,
            authenticated: React.PropTypes.bool,
            loading: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {

		// If we're authenticated and we have not yet loaded data, load/save data to db
		if (this.props.authenticated && !this.props.apiSuccess) {
			this.props.dispatch({
				type: 'loadUser',
				user: {
					uid: this.props.uid,
					userEmail: this.props.userEmail,
					userName: this.props.userName,
					userPhotoUrl: this.props.userPhotoUrl,
					userLocation: this.props.currentLocation, // In case the user does not have a saved location and we dont have user data in the db
				}
			});
		}

		if (this.props.authenticated && this.props.apiSuccess) {
			Actions.ideas();
		}
    }

    updateUserEmail(text) {
        this.props.dispatch({
            type: 'UPDATE_USER_EMAIL',
            value: text
        });
    }

    updateUserPassword(text) {
        this.props.dispatch({
            type: 'UPDATE_USER_PASSWORD',
            value: text
        });
    }

    signIn() {
        if (this.props.userEmail && (this.props.userPassword && this.props.userPassword.length >= 6)) {
            this.props.dispatch({
                type: 'TOGGLE_LOADING'
            });

            this.props.dispatch({
                type: 'signInUserWithEmail',
                userEmail: this.props.userEmail,
                userPassword: this.props.userPassword
            });
        }
        else if (this.props.userPassword && this.props.userPassword.length < 6) {
            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'Password should be at least 6 characters long'
            });
        }
    }

    resetError() {
        this.props.dispatch({
            type: 'RESET_' + this.props.errorType + '_ERROR'
        });
    }

    render() {
        const enableContinueButton = this.props.userEmail && this.props.userEmail.indexOf('@') > 0 && this.props.userPassword; 

        return (
            <Page>

                <Header
                    text='Forgot Password?'
                    handleTextPress={() => Actions.forgotPassword()}
                    textRight
                    backButton />

                <InputContainer>
                    <InfoBlock
                        title='Sign In'
                        titleColor={styleConstants.white} />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.props.userEmail}
                        handleChange={this.updateUserEmail}
                        handleFocus={this.resetError}
                        keyboardType='email-address' />
                    <Input
                        placeholder="PASSWORD"
                        value={this.props.userPassword}
                        handleChange={this.updateUserPassword}
                        handleFocus={this.resetError}
                        type='password' />
                </InputContainer>
                
                <Button
                    iconName='check'
                    handlePress={this.signIn}
                    text='Continue'
                    styleMode='primaryReversed'
                    disabled={!enableContinueButton} />

                <Growl
                    handleReset={this.resetError} />

                <Loader />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        userEmail: state.main.userData.profile.userEmail,
        userPassword: state.main.auth.userPassword,
        authenticated: state.main.auth.authenticated,
        errorType: state.main.app.errorType,
    });
}

export default connect(mapStateToProps)(SignInWithEmail);