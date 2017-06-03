import React from "react";
import {
    View,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import Card from '../components/Card';
import TabBar from '../components/TabBar';
import ActionModal from '../components/ActionModal';
import Growl from '../components/Growl';
import Loader from '../components/Loader';

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
    }

    render() {
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
                    text='Edit Profile'
                    handleTextPress={() => Actions.editProfile()}
                    textRight={true}
                    headerShadow />

                <TabBar
                    currentPage='profile' />

                {modal}

                <Growl />

                <Loader positionStyle={{ bottom: 50 }} />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.auth.uid,
    });
}

export default connect(mapStateToProps)(Profile);