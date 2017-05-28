import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import Logo from '../components/Logo';
import InfoBlock from '../components/InfoBlock';
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

    render() {
        const loader = this.state.loading ?
            <Loader />
            :
            null;

        const errorMessage = this.props.errorMessage ?
            <Growl 
                text={this.props.errorMessage} />  
            :
            null;

        return (
            <View style={styles.container}>
                <Header 
                    headerShadow={false}
                    text='Log In'
                    handleTextPress={() => Actions.signInWithEmail()}
                    textRight={true}/>

                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <InfoBlock
                    title="Have great ideas and no where to store them?"
                    subtitle="You've come to the right place." />

                <View style={styles.buttonContainer}>
                    <Button
                        materialCommunityIcon
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook} 
                        style={styles.button}                              
                        text='Continue with Facebook'
                        styleMode='transparentReversed' />

                    <Button
                        handlePress={() => Actions.signInOptions()} 
                        style={styles.button}                              
                        text='More Options'
                        styleMode='transparent' />
                </View>

                {loader}
                {errorMessage}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return ({
        errorMessage: state.main.userAuth.userAuthErrorMessage,
        authenticated: state.main.userAuth.authenticated,
    });
}

export default connect(mapStateToProps)(Welcome);