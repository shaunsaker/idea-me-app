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
    }

    static get propTypes() {
        return {
            userEmail: React.PropTypes.string,
            errorMessage: React.PropTypes.string,
            authenticated: React.PropTypes.bool,
            loading: React.PropTypes.bool,
        };
    }

    updateUserEmail(text) {
        this.props.dispatch({
            type: 'UPDATE_USER_EMAIL',
            value: text
        });
    }

    sendPasswordResetEmail() {
        this.props.dispatch({
            type: 'sendPasswordResetEmail',
            email: this.props.userEmail
        });
    }

    componentDidUpdate() {
        if (this.props.errorMessage) {
            if (this.state.loading) {
                this.setState({
                    loading: false
                });
            }
        }
    }

    render() {
        const loader = this.props.loading ?
            <Loader positionStyle={{ bottom: 56 }} />
            :
            null;

        const errorMessage = this.props.errorMessage ?
            <Growl text={this.props.errorMessage} />
            :
            null;

        return (
            <View style={styles.container}>
                <Header
                    headerShadow={false}
                    leftIconName='chevron-left'
                    leftIconSize={36}
                    leftIconColor={styleConstants.white}
                    leftIconStyle={styles.headerIcon}
                    handleLeftIconPress={() => Actions.pop()} />

                <InfoBlock
                    title="Forgot your password?"
                    subtitle="Enter your email address and we'll send you a link to reset it."/>

                <InputContainer>
                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.props.userEmail}
                        handleChange={this.updateUserEmail}
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
                {loader}
                {errorMessage}
            </View>
        );
    }
}

function MapStateToProps(state) {
    return ({
        userEmail: state.main.userAuth.email,
        errorMessage: state.main.userAuth.userAuthErrorMessage,
        loading: state.main.app.loading,
    });
}

export default connect(MapStateToProps)(ForgotPassword);