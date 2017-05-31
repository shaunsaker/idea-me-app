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
import Loader from '../components/Loader/index';
import Growl from '../components/Growl/index';

import styles from '../styles/pages/Welcome';
import styleConstants from '../styles/styleConstants';

export class Welcome extends React.Component {
    constructor(props) {
        super(props);
        
        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {
        if (this.props.authenticated) {
            Actions.ideas();
        }
    }

    signInUserWithFacebook() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        // Do stuff
    }

    render() {
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
                    subtitle="You've come to the right place." 
                    titleColor={styleConstants.white} 
                    subtitleColor={styleConstants.white} />

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

                <Growl />

                <Loader />

            </View>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authenticated: state.main.userAuth.authenticated,
    });
}

export default connect(mapStateToProps)(Welcome);