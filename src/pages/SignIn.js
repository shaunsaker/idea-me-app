import React from "react";
import {
    View,
    Text
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Input from '../components/Input';
import FooterButton from '../components/FooterButton';
import Growl from '../components/Growl';

import styles from '../styles/pages/SignIn';
import styleConstants from '../styles/styleConstants';

export class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.signIn = this.signIn.bind(this);

        this.state = {
            loading: false
        }
    }

    static get propTypes() {
        return {
            userEmail: React.PropTypes.string,
            userPassword: React.PropTypes.string,
            errorMessage: React.PropTypes.string,
            authenticated: React.PropTypes.bool
        };
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
            this.setState({
                loading: true 
            });

            this.props.dispatch({
                type: 'signInUser',
                email: this.props.userEmail,
                password: this.props.userPassword
            });
        }
        else if (this.props.userPassword && this.props.userPassword.length < 6) {
            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'Password should be at least 6 characters long'
            });
            setTimeout(() => {
                this.props.dispatch({
                    type: 'RESET_USER_ERROR'
                });
            }, 2500);  
        }
        else {
            const emptyInput = this.props.userEmail ? 'password' : 'email';

            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'You forgot to enter your ' + emptyInput
            });
            setTimeout(() => {
                this.props.dispatch({
                    type: 'RESET_USER_ERROR'
                });
            }, 2500);
        }
    }

    componentDidUpdate() {
        if (this.props.errorMessage) {
            if (this.state.loading) {
                this.setState({
                    loading: false
                });
            }
        }
        else if (this.props.authenticated) {
            Actions.home();
        }
    }

    render() {
        const errorMessage = this.props.errorMessage ?
            <Growl text={this.props.errorMessage} />
            :
            null;

        return (
            <View style={{ height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Email..."
                            value={this.props.userEmail}
                            handleChange={this.updateUserEmail} 
                            keyboardType='email-address' 
                            autoFocus={true} />
                        <View style={styles.passwordContainer}>
                            <Input
                                placeholder="Password..."
                                value={this.props.userPassword}
                                handleChange={this.updateUserPassword}
                                type='password' />
                            <Text style={[styles.passwordText, styleConstants.robotoCondensed ]}>* Password at least 6 characters long</Text>
                        </View>
                    </View>
                    <FooterButton
                        text='SIGN IN'
                        loading={this.state.loading}
                        handlePress={this.signIn} />
                </View>
                {errorMessage}
            </View>
        );
    }
}

function MapStateToProps(state) {
    return ({
        userEmail: state.main.user.email,
        userPassword: state.main.user.password,
        errorMessage: state.main.user.errorMessage,
        authenticated: state.main.user.authenticated
    });
}

export default connect(MapStateToProps)(SignIn);