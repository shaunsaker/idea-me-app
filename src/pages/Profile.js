import React from "react";
import {
    View,
    Text,
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
import ActionModal from '../components/ActionModal';

export class Profile extends React.Component {
    constructor(props) {
        super(props);


        this.toggleMenu = this.toggleMenu.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.toggleActionModal = this.toggleActionModal.bind(this);

        this.state = {
            showMenu: false,
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
        if (type === 'Log Out') {
            this.signOutUser();
        }
    }

    signOutUser() {
        this.props.dispatch({
            type: 'signOutUser'
        });

        Actions.welcome();
    }

    toggleActionModal(idea) {
        this.setState({
            showActionModal: !this.state.showActionModal,
        });
    }

    render() {
        const menu = this.state.showMenu && 
            <Menu 
                values={['About App', 'Settings', 'Give us Feedback', 'Log Out']}
                handleSelect={(type) => props.selectMenuItem(type)} />;

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
                    rightIconName='more-vert'
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

                {actionModal}

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
        numberOfIdeas: state.main.userData.ideas && state.main.userData.ideas.length,
    });
}

export default connect(mapStateToProps)(Profile);