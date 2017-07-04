import React from 'react';
import PropTypes from 'prop-types';
import {
    StatusBar,
    View,
    NetInfo,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from '../styles/icons/index';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import InfoBlock from '../components/InfoBlock';
import SnackBar from '../components/SnackBar';

export class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.quote = utilities.getRandomItemFromArray(this.props.quotes);
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            cloudDataSuccess: PropTypes.bool,
            redirectToWelcomePage: PropTypes.bool,

            uid: PropTypes.string,
        };
    }

    componentDidMount() {

        // Check if the user is connected to a network
        NetInfo.isConnected.fetch()
            .then((isConnected) => {
                if (!isConnected) {
                    this.props.dispatch({
                        type: 'TOGGLE_NETWORK_STATE'
                    });
                }
            });

        if (this.props.redirectToWelcomePage) {
            Actions.welcome();
        }

        // When a user is signed in and reloads app
        else if (this.props.authenticated && !this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'loadUserData',
                uid: this.props.uid
            });
        }
        else if (!this.props.authenticated) {
            this.props.dispatch({
                type: 'getUserAuth'
            });
        }
    }

    componentDidUpdate() {

        // Redirect user to sign in page if we're not authenticated and have received the redirect flag from getUserAuth
        if (this.props.redirectToWelcomePage) {
            Actions.welcome();
        }

        // If we're authenticated and we have not yet loaded data, load/save data to db
        else if (this.props.authenticated && !this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'loadUserData',
                uid: this.props.uid,
            });
        }

        // If we have data, we have everything we need
        else if (this.props.authenticated && this.props.cloudDataSuccess) {
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
                    name='lightbulb'
                    color={styleConstants.lightGrey}
                    size={64} />

                <View style={{ position: 'absolute', bottom: 0 }}>
                    <InfoBlock
                        fullWidth
                        title={this.quote.title}
                        titleColor={styleConstants.white}
                        subtitle={this.quote.author}
                        subtitleColor={styleConstants.lightGrey} />
                </View>

                <SnackBar />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        quotes: state.main.appData.quotes,

        authenticated: state.main.auth.authenticated,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        redirectToWelcomePage: state.main.auth.redirectToWelcomePage,
        uid: state.main.auth.uid,
    };
}

export default connect(mapStateToProps)(Splash);