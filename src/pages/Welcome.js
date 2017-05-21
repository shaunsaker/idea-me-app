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
                <StatusBar backgroundColor={styleConstants.primary} />

                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.infoTextTitle, styleConstants.robotoCondensed]}>
                        Have great ideas and no where to store them?
                    </Text>
                    <Text style={[styles.infoTextDescription, styleConstants.robotoCondensed]}>
                        Well you've come to the right place!
                    </Text>
                    <Text style={[styles.infoTextDescription, styleConstants.robotoCondensed]}>
                        Save your ideas, add categories and assign priorities.
                    </Text>
                    <Text style={[styles.infoTextHighlight, styleConstants.robotoCondensed]}>
                        Be in control of your future.
                    </Text>
                </View>

                <View style={styles.buttonGroup}>
                    <Text style={[styles. buttonText, styleConstants.robotoCondensed]}>
                        Continue with one of the following methods below.
                    </Text>
                    <Button
                        iconName='face'
                        handlePress={this.signInUserWithFacebook} 
                        style={styles.button} 
                        text='Continue with Facebook' 
                        transparent={true} />
                    <Button
                        iconName='face'
                        handlePress={this.signInUserWithGoogle} 
                        style={styles.button} 
                        text='Continue with Google' 
                        transparent={true} />
                    <Button
                        iconName='face'
                        handlePress={this.signInUserWithEmail} 
                        style={styles.button} 
                        text='Continue with Email' 
                        transparent={true} />
                    <Button
                        iconName='face'
                        handlePress={this.signInUserAnonymously} 
                        style={styles.button} 
                        text='Continue Anonymously' 
                        transparent={true} />
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