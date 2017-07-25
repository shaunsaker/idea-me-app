import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Linking,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from '../config';
import utilities from '../utilities';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ProfileCard from '../components/ProfileCard';
import IconButton from '../components/IconButton';
import TabBar from '../components/TabBar';
import ActionModal from '../modals/ActionModal';
import SnackBar from '../widgets/SnackBar';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.toggleActionModal = this.toggleActionModal.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this); // If the user moved/deleted their image from their device, allow them to delete the ref to it

        // TabBar
        this.tabs = [
            {
                title: 'Home',
                icon: 'home',
                action: () => Actions.home(),
                active: false,
            },
            {
                title: 'Profile',
                icon: 'person',
                action: () => Actions.profile(),
                active: true,
            },
        ];

        this.state = {
            showMenu: false,
            showActionModal: false,
        }
    }

    static get propTypes() {
        return {
            uid: PropTypes.string,
            userName: PropTypes.string,
            userEmail: PropTypes.string,
            userLocation: PropTypes.string,
            userPhotoUrl: PropTypes.object,
            numberOfIdeas: PropTypes.number,
        };
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    selectMenuItem(type) {
        this.toggleMenu();

        if (type === 'About App') {

            // TODO
        }
        else if (type === 'Settings') {

            // TODO
        }
        else if (type === 'Give us Feedback') {
            Linking.openURL('www.google.com');
        }
        else if (type === 'Get in Touch') {
            Linking.openURL('mailto:' + config.developer.email + '?subject=IdeaMe App');
        }

        // Logout
        else {
            this.toggleActionModal();
        }
    }

    toggleActionModal() {
        this.setState({
            showActionModal: !this.state.showActionModal,
        });
    }

    signOutUser() {
        this.props.dispatch({
            type: 'signOutUser'
        });

        Actions.welcome();
    }

    deletePhoto() {

        // Dispatch to store
        this.props.dispatch({
            type: 'SET_USER_PHOTO',
            userPhotoUrl: null,
        });

        // Dispatch to db
        this.props.dispatch({
            type: 'deleteUserData',
            node: 'profile/userPhotoUrl',
            uid: this.props.uid,
            hasNetwork: this.props.hasNetwork,
        });
    }

    render() {
        const numberOfIdeas = utilities.getLengthOfObject(this.props.ideas);

        const menu = this.state.showMenu &&
            <Menu
                values={['About App', 'Settings', 'Give us Feedback', 'Get in Touch', 'Log Out']}
                handleSelect={(type) => this.selectMenuItem(type)} />;

        const actionModal = this.state.showActionModal &&
            <ActionModal
                title='Are you sure you want to Log Out?'
                handleLeftIconPress={() => this.signOutUser()}
                handleRightIconPress={this.toggleActionModal} />;

        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding>

                <Header
                    text='Profile'
                    headerShadow
                    rightIconName='menu'
                    handleRightIconPress={this.toggleMenu} />

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ProfileCard
                        userName={this.props.userName}
                        userPhotoUrl={this.props.userPhotoUrl && this.props.userPhotoUrl.cropped}
                        userEmail={this.props.userEmail}
                        userLocation={this.props.userLocation}
                        numberOfIdeas={numberOfIdeas}
                        handleEditImagePress={() => Actions.editProfile()}
                        handleDeletePhoto={this.deletePhoto} />
                </View>

                <View style={{ position: 'absolute', bottom: 68, right: 16 }}>
                    <IconButton
                        iconName='edit'
                        backgroundColor={styleConstants.primary}
                        iconColor={styleConstants.realWhite}
                        handlePress={() => Actions.editProfile()} />
                </View>

                <TabBar
                    tabs={this.tabs} />

                {menu}

                {actionModal}

                <SnackBar />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.userAuth.uid,
        userName: state.main.userData.profile.userName || 'Not Set',
        userEmail: state.main.userData.profile.userEmail || 'Not Set',
        userLocation: state.main.userData.profile.userLocation || 'Not Set',
        userPhotoUrl: state.main.userData.profile.userPhotoUrl,
        ideas: state.main.userData.ideas,
    });
}

export default connect(mapStateToProps)(Profile);