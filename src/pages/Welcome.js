import React from "react";
import PropTypes from 'prop-types';
import {
    View
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import Logo from '../components/Logo';
import InfoBlock from '../components/InfoBlock';
import Button from '../components/Button';
import Loader from '../widgets/Loader';
import SnackBar from '../widgets/SnackBar';

import styleConstants from '../assets/styleConstants';

export class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            cloudDataSuccess: PropTypes.bool,

            uid: PropTypes.string,
            userEmail: PropTypes.string,
            userName: PropTypes.string,
            userPhotoUrl: PropTypes.object,
        };
    }

    componentDidUpdate() {

        // If we're authenticated, we have not yet loaded data, load/save data to db
        if (this.props.authenticated && !this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'loadUser',
                uid: this.props.uid,

                // Add these for the ride in case we have a new user
                userData: {
                    settings: this.props.userSettings,
                    profile: {
                        userEmail: this.props.userEmail,
                        userName: this.props.userName,
                        userPhotoUrl: this.props.userPhotoUrl,
                        dateJoined: Date.now(),
                    },
                }
            });
        }

        // If we have data, we have everything we need
        else if (this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_ERROR'
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

    render() {
        return (
            <Page
                fauxFooter>

                <Header
                    text='Log In'
                    handleTextPress={() => Actions.signInWithEmail()}
                    textRight />

                <Logo />

                <InfoBlock
                    title="Have great ideas and no where to store them?"
                    subtitle="You've come to the right place."
                    titleColor={styleConstants.white}
                    subtitleColor={styleConstants.white} />

                <View>
                    <Button
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook}
                        text='Continue with Facebook'
                        backgroundColor={styleConstants.white} />
                    <Button
                        handlePress={() => Actions.signInOptions()}
                        text='More Options'
                        backgroundColor='transparent' />
                </View>

                <SnackBar />

                <Loader />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authenticated: state.main.userAuth.authenticated,
        cloudDataSuccess: state.main.appState.error.type === 'CLOUD_DATA' && state.main.appState.error.success,

        uid: state.main.userAuth.uid,
        userEmail: state.main.userData.profile.userEmail,
        userName: state.main.userData.profile.userName,
        userPhotoUrl: state.main.userData.profile.userPhotoUrl,
        userSettings: state.main.userData.settings,
    });
}

export default connect(mapStateToProps)(Welcome);