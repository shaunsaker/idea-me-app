import React from "react";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import InfoBlock from '../components/InfoBlock';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styleConstants from '../styles/styleConstants';

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.updateemail = this.updateemail.bind(this);
        this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    static get propTypes() {
        return {
            email: React.PropTypes.string,
            errorType: React.PropTypes.string,
        };
    }

    updateemail(text) {
        this.props.dispatch({
            type: 'UPDATE_USER_EMAIL',
            value: text
        });
    }

    sendPasswordResetEmail() {
        if (this.props.email) {
            this.props.dispatch({
                type: 'TOGGLE_LOADING'
            });

            this.props.dispatch({
                type: 'sendPasswordResetEmail',
                email: this.props.email
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
        const enableContinueButton = this.props.email && this.props.email.indexOf('@') > 0; 

        return (
            <Page
                backgroundColor={styleConstants.primary}>

                <Header
                    backButton
                    headerShadow={false} />

                <InputContainer>
                    <InfoBlock
                        title="Forgot your password?"
                        subtitle="Enter your email address and we'll send you a link to reset it."
                        titleColor={styleConstants.white} 
                        subtitleColor={styleConstants.white} />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.props.email}
                        handleChange={this.updateemail}
                        handleFocus={this.resetError}
                        keyboardType='email-address' />
                </InputContainer>

                <Button
                    iconName='check'
                    handlePress={this.sendPasswordResetEmail}
                    text='Continue'
                    styleMode='primaryReversed' 
                    disabled={!enableContinueButton} />

                <Growl />

                <Loader />
                
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        email: state.main.userData.profile.email,
        errorType: state.main.app.errorType,
    });
}

export default connect(mapStateToProps)(ForgotPassword);