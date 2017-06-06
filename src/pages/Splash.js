import React from 'react';
import {
    StatusBar,
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import GlowLoader from '../components/GlowLoader';
import InfoBlock from '../components/InfoBlock';
import Growl from '../components/Growl';

export class Splash extends React.Component {
    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
			geolocationSuccess: React.PropTypes.bool,
            geolocationErrorMessage: React.PropTypes.string,
            apiSuccess: React.PropTypes.bool,

            uid: React.PropTypes.string,
            redirectToWelcomePage: React.PropTypes.bool
        };
    }

    componentDidMount() {
        if (this.props.redirectToWelcomePage) {
            Actions.welcome();
        }
        else if (this.props.authenticated && this.props.geolocationSuccess && this.props.apiSuccess) {
            Actions.home();
        }

        // When a user is signed in and reloads app
        else if (this.props.authenticated && this.props.geolocationSuccess && !this.props.apiSuccess) {
            this.props.dispatch({
                type: 'loadUserData',
                uid: this.props.uid
            });
        }
        else if (!this.props.authenticated) {
            this.props.dispatch({
                type: 'getUserAuth'
            });

			// Get the user's current location
			if (!this.props.geolocationSuccess) {
				this.props.dispatch({
					type: 'getUserLocation'
				});
			}
        }
    }

    componentDidUpdate() {

		// Redirect user to sign in page if we're not authenticated and have received the redirect flag from getUserAuth
			// Wait for geolocationSuccess before doing so
		if ((this.props.geolocationSuccess || this.props.geolocationErrorMessage) && this.props.redirectToWelcomePage) {
			Actions.welcome();
		}

		// If we're authenticated and we have location and have not yet loaded data, load/save data to db
		else if (this.props.authenticated && (this.props.geolocationSuccess || this.props.geolocationErrorMessage) && !this.props.apiSuccess) {
			this.props.dispatch({
				type: 'loadUserData',
                uid: this.props.uid,
			});
		}

		// If we're authenticated, we have geolocation and we have the userData, redirect to the home page
		else if (this.props.authenticated && (this.props.geolocationSuccess || this.props.geolocationErrorMessage) && this.props.apiSuccess) {
			Actions.home(); 
		}
    }

    render() {
        return (
            <Page 
                justifyContent='center'
                removeBottomPadding >

                <StatusBar backgroundColor={styleConstants.transPrimary} />

                <GlowLoader />

                <View style={{position: 'absolute', bottom: 0}}>
                    <InfoBlock
                        title='The key to success is the key'
                        titleColor={styleConstants.white}
                        subtitle='Shaun Saker'
                        subtitleColor={styleConstants.lightGrey} />
                </View>

                <Growl />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.auth.authenticated,
        apiSuccess: state.main.api.apiSuccess,
        geolocationSuccess: state.main.geolocation.geolocationSuccess,
        geolocationErrorMessage: state.main.geolocation.geolocationErrorMessage,

        uid: state.main.auth.uid,
        redirectToWelcomePage: state.main.auth.redirectToWelcomePage
    };
}

export default connect(mapStateToProps)(Splash);