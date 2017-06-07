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

        this.getQuote = this.getQuote.bind(this);

        this.state = {
            quote: {
                title: null,
                author: null,
            }
        }
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
			geolocationSuccess: React.PropTypes.bool,
            geolocationError: React.PropTypes.string,
            cloudDataSuccess: React.PropTypes.bool,

            uid: React.PropTypes.string,
            redirectToWelcomePage: React.PropTypes.bool
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
            this.getQuote();

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
			Actions.home(); 
		}
    }

    getQuote() {
        const randomQuote = utilities.getRandomItemFromArray(this.props.quotes);

        this.setState({
            quote: randomQuote
        }); 
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
                        title={this.state.quote.title}
                        titleColor={styleConstants.white}
                        subtitle={this.state.quote.author}
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
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        geolocationSuccess: state.main.geolocation.geolocationSuccess,
        geolocationError: state.main.geolocation.geolocationError,

        uid: state.main.auth.uid,
        redirectToWelcomePage: state.main.auth.redirectToWelcomePage
    };
}

export default connect(mapStateToProps)(Splash);