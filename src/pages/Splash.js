import React from 'react';
import PropTypes from 'prop-types';
import {
    StatusBar,
    View,
    NetInfo,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from '../assets/icons/index';

import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import InfoBlock from '../components/InfoBlock';
import InfoModal from '../modals/InfoModal';
import SnackBar from '../widgets/SnackBar';

export class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.runLogic = this.runLogic.bind(this);
        this.toggleNetworkState = this.toggleNetworkState.bind(this);
        this.toggleNetworkModal = this.toggleNetworkModal.bind(this);

        this.quote = utilities.getRandomItemFromArray(this.props.quotes);

        this.state = {
            showNetworkModal: false,
        }
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
        this.runLogic();
    }

    componentDidUpdate() {
        this.runLogic();
    }

    runLogic() {

        // Check if the user is connected to a network
        NetInfo.isConnected.fetch()
            .then((isConnected) => {
                if (!isConnected) {

                    // Only if a modal is not already present
                    if (!this.state.showNetworkModal) {
                        this.toggleNetworkState();
                    }
                }
                else {
                    if (this.state.showNetworkModal) {
                        this.toggleNetworkState();
                    }

                    // Redirect user to sign in page if we're not authenticated and have received the redirect flag from getUserAuth
                    if (this.props.redirectToWelcomePage) {
                        Actions.welcome();
                    }

                    // Anonymous user (no data)
                    else if (this.props.authenticated && this.props.anonymous) {
                        this.props.dispatch({
                            type: 'TOGGLE_LOADING',
                        });

                        Actions.home();
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
                    else if (!this.props.authenticated) {
                        this.props.dispatch({
                            type: 'getUserAuth',
                        });
                    }
                }
            });
    }

    toggleNetworkState() {
        this.props.dispatch({
            type: 'TOGGLE_NETWORK_STATE'
        });

        this.toggleNetworkModal();
    }

    toggleNetworkModal() {
        this.setState({
            showNetworkModal: !this.state.showNetworkModal,
        });
    }

    render() {
        const networkModal = this.state.showNetworkModal &&
            <InfoModal
                title='Network Error'
                subtitle='Check Your Connection and Hit Retry'
                handlePress={this.runLogic}
                handleClose={this.toggleNetworkModal} />

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

                {networkModal}

                <SnackBar />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        quotes: state.main.appData.quotes,

        authenticated: state.main.auth.authenticated,
        anonymous: state.main.auth.anonymous,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        redirectToWelcomePage: state.main.auth.redirectToWelcomePage,
        uid: state.main.auth.uid,
    };
}

export default connect(mapStateToProps)(Splash);