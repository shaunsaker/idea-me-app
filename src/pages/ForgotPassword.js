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

import styles from '../styles/pages/ForgotPassword';
import styleConstants from '../styles/styleConstants';

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    static get propTypes() {
        return {
            userEmail: React.PropTypes.string,
            authenticated: React.PropTypes.bool,
        };
    }

    updateUserEmail(text) {
        this.props.dispatch({
            type: 'UPDATE_USER_EMAIL',
            value: text
        });
    }

    sendPasswordResetEmail() {
        if (this.props.userEmail) {
            this.props.dispatch({
                type: 'SET_LOADING_TRUE'
            });

            this.props.dispatch({
                type: 'sendPasswordResetEmail',
                email: this.props.userEmail
            });
        }
        else {
            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'You forgot to enter your email'
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
                    leftIconName='chevron-left'
                    leftIconSize={36}
                    handleLeftIconPress={() => Actions.pop()} />

                <InfoBlock
                    title="Forgot your password?"
                    subtitle="Enter your email address and we'll send you a link to reset it."/>

                <InputContainer>
                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.props.userEmail}
                        handleChange={this.updateUserEmail}
                        handleFocus={this.resetError}
                        keyboardType='email-address' />
                </InputContainer>

                <View style={styles.buttonContainer}>
                    <Button
                        iconName='check'
                        handlePress={this.sendPasswordResetEmail}
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
        errorType: state.main.app.errorType,
    });
}

export default connect(MapStateToProps)(ForgotPassword);