import React from "react";
import {
    View,
    Text,
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Logo from '../components/Logo';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styles from '../styles/pages/Welcome';
import styleConstants from '../styles/styleConstants';

export class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
        
        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
        this.signInUserWithGoogle = this.signInUserWithGoogle.bind(this);
        this.signInUserWithEmail = this.signInUserWithEmail.bind(this);
        this.signInUserAnonymously = this.signInUserAnonymously.bind(this);
    }

    static get propTypes() {
        return {
            errorMessage: React.PropTypes.string,
            authenticated: React.PropTypes.bool,
        };
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
            Actions.ideas();
        }
    }

    signInUserWithFacebook() {
        this.setState({
            loading: true
        }); 

        // Do stuff
    }

    signInUserWithGoogle() {
        this.setState({
            loading: true
        }); 

        // Do stuff
    }

    signInUserWithEmail() {
        Actions.signInWithEmail();
    }

    signInUserAnonymously() {
        this.setState({
            loading: true
        }); 

        // Do stuff
    }

    render() {
        const loader = this.state.loading ?
            <Loader />
            :
            null;

        const errorMessage = this.props.errorMessage ?
            <Growl text={this.props.errorMessage} />
            :
            null;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={styleConstants.transPrimary} />

                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.infoTextTitle, styleConstants.robotoCondensed]}>
                        Have great ideas and no where to store them?
                    </Text>
                    <Text style={[styles.infoTextDescription, styleConstants.robotoCondensed]}>
                        You've come to the right place.
                    </Text>
                </View>

                <View style={styles.buttonGroup}>
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

                {loader}
                {errorMessage}
            </View>
        );
    }
}

function MapStateToProps(state) {
    return ({
        errorMessage: state.main.userAuth.userAuthErrorMessage,
        authenticated: state.main.userAuth.authenticated,
    });
}

export default connect(MapStateToProps)(Welcome);