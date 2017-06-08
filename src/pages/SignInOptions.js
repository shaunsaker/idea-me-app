import React from "react";
import {
    View,
    Text,
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import Button from '../components/Button';
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styleConstants from '../styles/styleConstants';

export class SignInOptions extends React.Component {
    constructor(props) {
        super(props);
        
        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
        this.signInUserWithGoogle = this.signInUserWithGoogle.bind(this);
        this.signInUserWithEmail = this.signInUserWithEmail.bind(this);
        this.signInUserAnonymously = this.signInUserAnonymously.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            showModal: false,
        }
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
            cloudDataSuccess: React.PropTypes.bool,
            uid: React.PropTypes.string,
            userEmail: React.PropTypes.string,
			userName: React.PropTypes.string,
			userPhotoUrl: React.PropTypes.string,
            currentLocation: React.PropTypes.string,
        };
    }

    componentDidUpdate() {

		// If we're authenticated and we have not yet loaded data, load/save data to db
		if (this.props.authenticated && !this.props.cloudDataSuccess) {
			this.props.dispatch({
				type: 'loadUser',
				uid: this.props.uid,

                // Add these for the ride in case we have a new user
                node: 'profile',
				userData: {
                    userEmail: this.props.userEmail,
					userName: this.props.userName,
					userPhotoUrl: this.props.userPhotoUrl,
                    userLocation: this.props.currentLocation,
				},
			});
		}

		if (this.props.authenticated && this.props.cloudDataSuccess) {
			this.props.dispatch({
				type: 'RESET_CLOUD_STORAGE_SUCCESS'
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

		this.props.dispatch({
			type: 'signInUserWithGoogle'
		});
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

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {
        const modal = this.state.showModal ?
            <ActionModal 
                title="Are you sure you want to continue anonymously?"
                subtitle="You won't be able to save any of your data."
                handleLeftIconPress={this.signInUserAnonymously}
                handleRightIconPress={this.toggleModal} />
            :
            null;

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
                        styleMode='transparentReversed' />
                    <Button
                        iconName='google'
                        handlePress={this.signInUserWithGoogle} 
                        text='Continue with Google'
                        styleMode='transparentReversed' />
                    <Button
                        iconName='email'
                        handlePress={this.signInUserWithEmail} 
                        text='Continue with Email'
                        styleMode='transparent' />
                    <Button
                        iconName='person'
                        handlePress={this.toggleModal} 
                        text='Continue Anonymously'
                        styleMode='transparent' />
                </View>

				<Growl />

				<Loader />

				{modal}
                
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
		authenticated: state.main.auth.authenticated,
		cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
		uid: state.main.auth.uid,
		userEmail: state.main.userData.profile.userEmail,
		userName: state.main.userData.profile.userName,
		userPhotoUrl: state.main.userData.profile.userPhotoUrl,
		currentLocation: state.main.geolocation.currentLocation,
    });
}

export default connect(mapStateToProps)(SignInOptions);