import React from 'react';
import {
    StatusBar,
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from '../styles/icons/index';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import InfoBlock from '../components/InfoBlock';
import Growl from '../components/Growl';

export class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.quote = utilities.getRandomItemFromArray(this.props.quotes);
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
			geolocationSuccess: React.PropTypes.bool,
            geolocationError: React.PropTypes.bool,
            cloudDataSuccess: React.PropTypes.bool,
            redirectToWelcomePage: React.PropTypes.bool,

            uid: React.PropTypes.string,
        };
    }

    componentDidMount() {
        if (this.props.redirectToWelcomePage) {
            Actions.welcome();
        }
        else if (this.props.authenticated && (this.props.geolocationSuccess || this.props.geolocationError) && this.props.cloudDataSuccess) {
            Actions.home();
        }

        // When a user is signed in and reloads app
        else if (this.props.authenticated && (this.props.geolocationSuccess || this.props.geolocationError) && !this.props.cloudDataSuccess) {
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
		if ((this.props.geolocationSuccess || this.props.geolocationError) && this.props.redirectToWelcomePage) {
			Actions.welcome();
		}

		// If we're authenticated and we have location and have not yet loaded data, load/save data to db
		else if (this.props.authenticated && (this.props.geolocationSuccess || this.props.geolocationError) && !this.props.cloudDataSuccess) {
			this.props.dispatch({
				type: 'loadUserData',
                uid: this.props.uid,
			});
		}

		// If we're authenticated, we have geolocation and we have the userData, redirect to the home page
		else if (this.props.authenticated && (this.props.geolocationSuccess || this.props.geolocationError) && this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS'
            }); 

			Actions.home(); 
		}
    }

    render() {
        return (
            <Page 
                justifyContent='center'
                fauxFooter >

                <StatusBar backgroundColor={styleConstants.transPrimary} />

                <Icon
                    name='light-bulb'
                    color={styleConstants.lightGrey}
                    size={64} />

                <View style={{position: 'absolute', bottom: 0}}>
                    <InfoBlock
                        fullWidth
                        title={this.quote.title}
                        titleColor={styleConstants.white}
                        subtitle={this.quote.author}
                        subtitleColor={styleConstants.lightGrey} />
                </View>

                <Growl />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        quotes: state.main.appData.quotes,

        authenticated: state.main.auth.authenticated,
        geolocationSuccess: state.main.geolocation.geolocationSuccess,
        geolocationError: state.main.geolocation.geolocationError,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        redirectToWelcomePage: state.main.auth.redirectToWelcomePage,
        uid: state.main.auth.uid,
    };
}

export default connect(mapStateToProps)(Splash);