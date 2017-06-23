import React from "react";
import {
    View,
    Linking,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ProfileCard from '../components/ProfileCard';
import Button from '../components/Button';
import TabBar from '../components/TabBar';
import Browser from '../components/Browser';
import ActionModal from '../components/ActionModal';
import SnackBar from '../components/SnackBar';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
		this.toggleBrowser = this.toggleBrowser.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.toggleActionModal = this.toggleActionModal.bind(this);
        this.setCopySuccess = this.setCopySuccess.bind(this);
        this.setBrowserError = this.setBrowserError.bind(this);

        // TabBar
        this.tabs = [
        {
            title: 'Home',
            icon: 'home',
            action: () => Actions.home(),
            active: false,
        },
        {
            title: 'Categories',
            icon: 'folder',
            action: () => Actions.categories(),
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
            showBrowser: false,
            showActionModal: false,
        }
    }

    static get propTypes() {
        return {
            uid: React.PropTypes.string,
            userName: React.PropTypes.string,
            userEmail: React.PropTypes.string,
            userLocation: React.PropTypes.string,
            userPhotoUrl: React.PropTypes.string,
            numberOfIdeas: React.PropTypes.number, 
        };
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    selectMenuItem(type) {
        this.toggleMenu();

        if (type === 'Edit Profile') {
            Actions.editProfile();
        }
        else if (type === 'About App') {

            // TODO
        }
        else if (type === 'Settings') {

            // TODO
        }
        else if (type === 'Give us Feedback') {
            this.toggleBrowser();
        }
        else if (type === 'Get in Touch') {
            Linking.openURL('mailto:' + config.developer.email + '?subject=IdeaMe App');
        }
        else {
            this.toggleActionModal();
        }
    }

	toggleBrowser() {
		this.setState({
			showBrowser: !this.state.showBrowser,
		});
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

    setCopySuccess() {
        this.props.dispatch({
            type: 'USER_SUCCESS',
            message: 'Link copied to clipboard successfully.'
        });    
    }

    setBrowserError() {
        this.toggleBrowser();

        this.props.dispatch({
            type: 'USER_ERROR',
            message: 'Could not load webpage.'
        }); 
    }

    render() {
        const menu = this.state.showMenu && 
            <Menu 
                values={['Edit Profile', 'About App', 'Settings', 'Give us Feedback', 'Get in Touch', 'Log Out']}
                handleSelect={(type) => this.selectMenuItem(type)} />;

		const browser = this.state.showBrowser ? 
			<Browser
				uri='https://goo.gl/forms/RQZxYiLZw7DxNDu03' 
				handleClose={this.toggleBrowser}
                handleCopySuccess={this.setCopySuccess}
                handleBrowserError={this.setBrowserError} />
			:
			null;                

        const actionModal = this.state.showActionModal &&
            <ActionModal
                title={'Are you sure you want to Log Out?'}
                handleLeftIconPress={() => this.signOutUser()}
                handleRightIconPress={this.toggleActionModal} />;

        return (
            <Page
                removeBottomPadding
                backgroundColor={styleConstants.white}>

                <Header
                    text='Profile'
                    headerShadow
                    rightIconName='menu'
                    handleRightIconPress={this.toggleMenu} />

                <ProfileCard
                    userName={this.props.userName}
                    userPhotoUrl={this.props.userPhotoUrl}
                    userEmail={this.props.userEmail}
                    userLocation={this.props.userLocation}
                    numberOfIdeas={this.props.numberOfIdeas}
                    handleEditImagePress={() => Actions.editProfile()} />

                <TabBar
                    tabs={this.tabs} />

                {menu}

				{browser}

                {actionModal}

                <SnackBar />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.auth.uid,
        userName: state.main.userData.profile.userName || 'Not Set',
        userEmail: state.main.userData.profile.userEmail || 'Not Set',
        userLocation: state.main.userData.profile.userLocation || 'Not Set',
        userPhotoUrl: state.main.userData.profile.userPhotoUrl,
        numberOfIdeas: state.main.userData.ideas && state.main.userData.ideas.length,
    });
}

export default connect(mapStateToProps)(Profile);