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
import InputContainer from '../components/InputContainer';
import EditableImage from '../components/EditableImage';
import Input from '../components/Input';
import Button from '../components/Button';
import OptionsModal from '../components/OptionsModal';
import SnackBar from '../components/SnackBar';
import Loader from '../components/Loader';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editUserName: null,
            editUserEmail: null,
            showModal: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.selectModalOption = this.selectModalOption.bind(this);
        this.updateEditUserName = this.updateEditUserName.bind(this);
        this.updateEditUserEmail = this.updateEditUserEmail.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
    }

    static get propTypes() {
        return {
            uid: React.PropTypes.string,
            userName: React.PropTypes.string,
            userEmail: React.PropTypes.string,
            userLocation: React.PropTypes.string,
            userPhotoUrl: React.PropTypes.object,
            cloudDataSuccess: React.PropTypes.bool,
        };
    }

    componentDidMount() {
        this.updateEditUserName(this.props.userName);
        this.updateEditUserEmail(this.props.userEmail);
    }

    componentDidUpdate() {
        if (this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS'
            });

            Actions.pop();
        }
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    selectModalOption(option) {
        this.toggleModal();

        this.props.dispatch({
            type: 'handleImage',
            option, // Take a Photo / Choose a Photo
            uid: this.props.uid,
        });
    }

    updateEditUserName(value) {
        this.setState({
            editUserName: value
        });
    }

    updateEditUserEmail(value) {
        this.setState({
            editUserEmail: value
        });
    }

    updateUserDetails() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        const prettyUserName = utilities.prettifyString(this.state.editUserName);

        this.props.dispatch({
            type: 'saveUserData',
            node: 'profile',
            uid: this.props.uid,
            userData: {
                userName: prettyUserName,
                userEmail: this.state.editUserEmail,
                userLocation: this.props.userLocation,
                userPhotoUrl: this.props.userPhotoUrl,
            }
        });
    }

    render() {
        const modal = this.state.showModal ?
            <OptionsModal
                title='Choose an Option'
                options={['Take a Photo', 'Choose a Photo']}
                handleSelect={this.selectModalOption}
                handleClose={this.toggleModal} />
            :
            null;

        const enableContinueButton = this.state.editUserEmail && this.state.editUserName ? true : false;

        return (
            <Page>

                <Header
                    text='Edit Profile'
                    backButton
                    continueButton={enableContinueButton}
                    handleRightIconPress={this.updateUserDetails}
                    headerShadow />

                <InputContainer>

                    <EditableImage
                        uri={this.props.userPhotoUrl.cropped}
                        handlePress={this.toggleModal} />

                    <Input
                        placeholder="NAME"
                        value={this.state.editUserName}
                        handleChange={this.updateEditUserName}
                        maxLength={16} />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.state.editUserEmail}
                        handleChange={this.updateEditUserEmail} />

                </InputContainer>

                <Button
                    iconName='location_edit'
                    text={this.props.userLocation}
                    backgroundColor={styleConstants.white}
                    handlePress={() => Actions.editLocation()} />

                {modal}

                <SnackBar />

                <Loader
                    position='bottom' />

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
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    });
}

export default connect(mapStateToProps)(Profile);