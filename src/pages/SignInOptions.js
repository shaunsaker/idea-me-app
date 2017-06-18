import React from "react";
import {
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import Button from '../components/Button';
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

import styleConstants from '../styles/styleConstants';

export class SignInOptions extends React.Component {
    constructor(props) {
        super(props);
        
        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
        this.signInUserWithGoogle = this.signInUserWithGoogle.bind(this);
        this.signInUserWithEmail = this.signInUserWithEmail.bind(this);
        this.signInUserAnonymously = this.signInUserAnonymously.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
			cloudDataSuccess: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {
		// If we're authenticated and we have not yet loaded data, load/save data to db
		if (this.props.authenticated && !this.props.cloudDataSuccess) {
			this.props.dispatch({
				type: 'loadUser',
				user: {
					uid: this.props.uid,
					userEmail: this.props.userEmail,
					userName: this.props.userName,
					userPhotoUrl: this.props.userPhotoUrl,
					userLocation: this.props.currentLocation, // In case the user does not have a saved location and we dont have user data in the db
				}
			});
		}

		if (this.props.authenticated && this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS'
            }); 

			Actions.home();
		}
    }

    signInUserWithFacebook() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        this.props.dispatch({
            type: 'signInUserWithFacebook'
        });
    }

    signInUserWithGoogle() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });
        
        // this.props.dispatch({
        //     type: 'signInUserWithGoogle'
        // });
    }

    signInUserWithEmail() {
        Actions.signInWithEmail();
    }

    signInUserAnonymously() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        this.props.dispatch({
            type: 'signInUserAnonymously'
        });
    }

    render() {
        return (
            <Page
                fauxFooter>

                <Header 
                    closeButton />

                <View>
                    <Button
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook}                         
                        text='Continue with Facebook'
                        backgroundColor={styleConstants.white} />
                    <Button
                        iconName='google'
                        handlePress={this.signInUserWithGoogle} 
                        text='Continue with Google'
                        backgroundColor={styleConstants.white} />
                    <Button
                        iconName='mail'
                        handlePress={this.signInUserWithEmail} 
                        text='Continue with Email'
                        backgroundColor='transparent' />
                    <Button
                        iconName='anonymous'
                        handlePress={this.signInUserAnonymously} 
                        text='Continue Anonymously'
                        backgroundColor='transparent' />
                </View>

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
    });
}

export default connect(mapStateToProps)(SignInOptions);