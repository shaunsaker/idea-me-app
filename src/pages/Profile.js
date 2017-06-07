import React from "react";
import {
    View,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
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
import Growl from '../components/Growl';

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

        if (type === 'About App') {
            // TODO
        }
        if (type === 'Settings') {
            // TODO
        }
        if (type === 'Give us Feedback') {
            this.toggleBrowser();
        }
        else if (type === 'Log Out') {
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
                values={['About App', 'Settings', 'Give us Feedback', 'Log Out']}
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
                title={'Are you sure you want to log out?'}
                handleLeftIconPress={() => this.signOutUser()}
                handleRightIconPress={this.toggleActionModal} />;

        return (
            <Page
                removeBottomPadding>

                <Header
                    text='Profile'
                    headerShadow
                    rightIconName='home'
                    handleRightIconPress={this.toggleMenu} />

                <View>
                    <ProfileCard
                        userName={this.props.userName}
                        userPhotoUrl={this.props.userPhotoUrl}
                        userEmail={this.props.userEmail}
                        userLocation={this.props.userLocation}
                        numberOfIdeas={this.props.numberOfIdeas}
                        handleEditImagePress={() => Actions.editProfile()} />

                    <Button
                        iconName='mode-edit'
                        text='Edit Profile'
                        styleMode='transparent'
                        handlePress={() => Actions.editProfile()} />
                </View>

                <TabBar
                    currentPage='profile' />

                {menu}

				{browser}

                {actionModal}

                <Growl />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.auth.uid,
        userName: state.main.userData.profile.userName,
        userEmail: state.main.userData.profile.userEmail,
        userLocation: state.main.userData.profile.userLocation,
        userPhotoUrl: state.main.userData.profile.userPhotoUrl,
        numberOfIdeas: state.main.userData.ideas.length,
    });
}

export default connect(mapStateToProps)(Profile);