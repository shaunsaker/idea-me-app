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
import SnackBar from '../components/SnackBar';

import styleConstants from '../styles/styleConstants';

export class SignInWithEmail extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
            cloudDataSuccess: React.PropTypes.bool,

            uid: React.PropTypes.string,
            userEmail: React.PropTypes.string,
            userPassword: React.PropTypes.string,
            currentLocation: React.PropTypes.string,
        };
    }

    componentDidUpdate() {

		// If we're authenticated and we have not yet loaded data, load/save data to db
		if (this.props.authenticated && this.props.currentLocation && !this.props.cloudDataSuccess) {
			this.props.dispatch({
				type: 'loadUserData',
                uid: this.props.uid,

                // Add these for the ride in case we have a new user
                node: 'profile',
				userData: {
                    userEmail: this.props.userEmail,
                    userLocation: this.props.currentLocation,
				}
			});
		}

        // If we have data, we have everything we need
		if (this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS'
            });

			Actions.home();
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
                    backgroundColor={styleConstants.white}
                    disabled={!enableContinueButton} />

                <SnackBar />

                <Loader
                    position='bottom' />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authenticated: state.main.auth.authenticated,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,

        uid: state.main.auth.uid,
        userEmail: state.main.userData.profile.userEmail,
        userPassword: state.main.auth.userPassword,
        currentLocation: state.main.geolocation.currentLocation,
    });
}

export default connect(mapStateToProps)(SignInWithEmail);