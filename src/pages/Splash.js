import React from 'react';
import PropTypes from 'prop-types';
import {
    StatusBar,
    View,
    NetInfo,
    Share,
    Platform,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from '../assets/icons/index';

import config from '../config';
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
        this.toggleShareModal = this.toggleShareModal.bind(this);
        this.shareApp = this.shareApp.bind(this);
        this.closeShareModal = this.closeShareModal.bind(this);

        this.quote = utilities.getRandomItemFromDictionary(this.props.quotes);

        this.state = {
            showNetworkModal: false,
            showShareModal: false,
            isFethingData: false,
        }
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            anonymous: PropTypes.bool,
            redirectToWelcomePage: PropTypes.bool,
            uid: PropTypes.string,

            cloudDataSuccess: PropTypes.bool,

            quotes: PropTypes.object,

            dateJoined: PropTypes.number,
            hasSeenShareModal: PropTypes.bool,
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
                    else if (this.props.authenticated && !this.props.cloudDataSuccess && !this.state.isFetchingData) {
                        this.setState({
                            isFetchingData: true,
                        });

                        this.props.dispatch({
                            type: 'loadUserData',
                            uid: this.props.uid,
                        });
                    }

                    // If we have data, we have everything we need
                    else if (this.props.authenticated && this.props.cloudDataSuccess) {

                        // If user has been using app for a week = approx 604800s
                        const currentDate = Date.now();
                        const showShareModal = (currentDate - this.props.dateJoined >= 604800 * 1000);

                        if ((this.props.oneWeekUser || (showShareModal && !this.props.hasSeenShareModal)) && !this.state.showShareModal) {
                            this.toggleShareModal();
                        }
                        else if (!this.state.showShareModal) {
                            this.props.dispatch({
                                type: 'RESET_ERROR'
                            });

                            Actions.home();
                        }
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

    toggleShareModal() {
        this.setState({
            showShareModal: !this.state.showShareModal,
        });
    }

    shareApp() {
        const shareMessage = Platform.OS === 'android' ?
            config.appShareMessage + config.appUrl
            :
            config.appShareMessage; // ios only

        Share.share({
            message: shareMessage,
            url: config.appUrl, // ios only
            title: 'IdeaMe'
        }, {
                // Android only:
                dialogTitle: 'Share IdeaMe',
            })
            .then(() => {
                this.closeShareModal();
            })
            .catch((error) => console.log('Share error:', error.message)); // TODO: Snackbar
    }

    closeShareModal() {
        this.props.dispatch({
            type: 'saveUserData',
            uid: this.props.uid,
            node: 'app',
            userData: {
                hasSeenShareModal: true,
            },
        });

        this.toggleShareModal();

        // Might take a while for the hasSeenShareModal prop to come in so let's redirect immediately
        this.props.dispatch({
            type: 'RESET_ERROR'
        });

        Actions.home();
    }

    render() {
        const networkModal = this.state.showNetworkModal &&
            <InfoModal
                title='Network Error'
                subtitle='Check Your Connection and Hit Retry.'
                buttonText='Retry'
                buttonIconName='refresh'
                canClose={false}
                handlePress={this.runLogic}
                handleClose={this.toggleNetworkModal} />

        const shareModal = this.state.showShareModal &&
            <InfoModal
                title='Enjoying IdeaMe?'
                subtitle='Help us spread the word by sharing the app with your friends.'
                buttonText='Share'
                buttonIconName='share'
                canClose
                handlePress={this.shareApp}
                handleClose={this.closeShareModal} />;

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
                        title={this.quote.title}
                        subtitle={this.quote.author}
                        titleColor={styleConstants.white}
                        subtitleColor={styleConstants.lightGrey}
                        fullWidth />
                </View>

                {networkModal}

                {shareModal}

                <SnackBar />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        anonymous: state.main.userAuth.anonymous,
        redirectToWelcomePage: state.main.userAuth.redirectToWelcomePage,
        uid: state.main.userAuth.uid,

        cloudDataSuccess: state.main.appState.error.type === 'CLOUD_DATA' && state.main.appState.error.success,

        quotes: state.main.appData.quotes,

        dateJoined: state.main.userData.profile.dateJoined,
        oneWeekUser: config.testing.oneWeekUser,
        hasSeenShareModal: state.main.userData.app && state.main.userData.app.hasSeenShareModal,
    };
}

export default connect(mapStateToProps)(Splash);