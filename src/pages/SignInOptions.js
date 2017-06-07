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
            showModal:false
        }
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
        this.toggleModal();

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
                subtitle="You won't be able to save any of your ideas."
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
                        iconName='anonymous'
                        handlePress={this.toggleModal} 
                        text='Continue Anonymously'
                        styleMode='transparent' />
                </View>

                {modal}

				<Growl />

				<Loader />
                
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