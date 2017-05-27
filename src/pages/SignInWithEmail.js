import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import InfoBlock from '../components/InfoBlock';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styles from '../styles/pages/SignInWithEmail';
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
            errorMessage: React.PropTypes.string,
            authenticated: React.PropTypes.bool,
            loading: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {
        if (this.props.authenticated) {
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
                type: 'SET_LOADING_TRUE'
            });

            this.props.dispatch({
                type: 'signInUserWithEmail',
                email: this.props.userEmail,
                password: this.props.userPassword
            });
        }
        else if (this.props.userPassword && this.props.userPassword.length < 6) {
            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'Password should be at least 6 characters long'
            });
        }
        else {
            const emptyInput = this.props.userEmail ? 'password' : 'email';

            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'You forgot to enter your ' + emptyInput
            });
        }
    }

    resetError() {
        this.props.dispatch({
            type: 'RESET_' + this.props.errorType + '_ERROR'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={styleConstants.primary}
                    contentColor={styleConstants.white}
                    headerShadow={false}
                    text='Forgot Password?'
                    handleTextPress={() => Actions.forgotPassword()}
                    textStyle={styleConstants.robotoCondensed}
                    textRight={true}
                    leftIconName='chevron-left'
                    leftIconSize={36}
                    handleLeftIconPress={() => Actions.pop()} />

                <InfoBlock
                    title='Sign In'/>

                <InputContainer>
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
                
                <View style={styles.buttonContainer}>
                    <Button
                        iconName='check'
                        handlePress={this.signIn}
                        text='Continue'
                        style={styles.button}
                        styleMode='primaryReversed' />
                </View>

                <Growl
                    handleReset={this.resetError} />
                <Loader />
            </View>
        );
    }
}

function MapStateToProps(state) {
    return ({
        userEmail: state.main.userAuth.email,
        userPassword: state.main.userAuth.password,
        authenticated: state.main.userAuth.authenticated,
        errorType: state.main.app.errorType,
    });
}

export default connect(MapStateToProps)(SignInWithEmail);