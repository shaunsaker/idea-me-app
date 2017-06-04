import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

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

        this.selectMenuItem = this.selectMenuItem.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.signOutUser = this.signOutUser.bind(this);

        this.state = {
            showModal: false,
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

    selectMenuItem(type) {

    }

    toggleModal(idea) {
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    signOutUser() {
        this.props.dispatch({
            type: 'signOutUser'
        });

        Actions.welcome();
    }

    render() {
        /*const menu = () => 
            <Menu 
                values={['About App', 'Settings', 'Give us Feedback', 'Log Out']}
                handleSelect={(type) => props.selectMenuItem(type)} 
                color={styleConstants.white} />;*/

        const modal = this.state.showModal ?
            <ActionModal
                title={'Are you sure you want to log out?'}
                handleLeftIconPress={() => this.signOutUser()}
                handleRightIconPress={this.toggleModal} />
            :
            null;

        return (
            <Page
                backgroundColor={styleConstants.primary}
                removeBottomPadding={true}>

                <Header
                    text='Profile'
                    headerShadow />

                <TouchableOpacity
                    onPress={this.signOutUser}>
                    <Text>Sign Out</Text>
                </TouchableOpacity>

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

                {modal}

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