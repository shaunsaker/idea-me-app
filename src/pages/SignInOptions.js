import React from "react";
import {
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';
import ActionModal from '../components/ActionModal';

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
                backgroundColor={styleConstants.primary}
                fauxFooter={true}>

                <Header 
                    closeButton />

                <View>
                    <Button
                        materialCommunityIcon
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook}                         
                        text='Continue with Facebook'
                        styleMode='transparentReversed' />
                    <Button
                        materialCommunityIcon
                        iconName='google'
                        handlePress={this.signInUserWithGoogle} 
                        text='Continue with Google'
                        styleMode='transparentReversed' />
                    <Button
                        materialCommunityIcon
                        iconName='email'
                        handlePress={this.signInUserWithEmail} 
                        text='Continue with Email'
                        styleMode='transparent' />
                    <Button
                        materialCommunityIcon
                        iconName='face-profile'
                        handlePress={this.toggleModal} 
                        text='Continue Anonymously'
                        styleMode='transparent' />
                </View>

                {modal}

				<Growl />

				<Loader />

                <View />
                
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authenticated: state.main.auth.authenticated,
    });
}

export default connect(mapStateToProps)(SignInOptions);