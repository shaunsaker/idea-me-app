import React from "react";
import PropTypes from 'prop-types';
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
import ActionModal from '../components/ActionModal';
import SnackBar from '../components/SnackBar';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editUserName: null,
            editUserEmail: null,
            showPhotoModal: false,
            showCancelModal: false,
        }

        this.togglePhotoModal = this.togglePhotoModal.bind(this);
        this.selectPhotoOption = this.selectPhotoOption.bind(this);
        this.updateEditUserName = this.updateEditUserName.bind(this);
        this.updateEditUserEmail = this.updateEditUserEmail.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
        this.toggleCancelModal = this.toggleCancelModal.bind(this);
        this.cancelEditProfile = this.cancelEditProfile.bind(this);
    }

    static get propTypes() {
        return {
            uid: PropTypes.string,
            userName: PropTypes.string,
            userEmail: PropTypes.string,
            userLocation: PropTypes.string,
            userPhotoUrl: PropTypes.object,
            temporaryImage: PropTypes.object,
        };
    }

    componentDidMount() {
        this.updateEditUserName(this.props.userName);
        this.updateEditUserEmail(this.props.userEmail);
    }

    togglePhotoModal() {
        this.setState({
            showPhotoModal: !this.state.showPhotoModal
        });
    }

    selectPhotoOption(option) {
        this.togglePhotoModal();

        this.props.dispatch({
            type: 'handleImage',
            option, // Take a Photo / Choose a Photo
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
        const prettyUserName = utilities.prettifyString(this.state.editUserName);
        const userPhotoUrl = this.props.temporaryImage ? this.props.temporaryImage : this.props.userPhotoUrl;
        const userData = {
            userName: prettyUserName,
            userEmail: this.state.editUserEmail,
            userLocation: this.props.userLocation,
            userPhotoUrl,
        }

        this.props.dispatch({
            type: 'UPDATE_USER_DATA',
            node: 'profile',
            userData,
        });

        this.props.dispatch({
            type: 'saveUserData',
            node: 'profile',
            uid: this.props.uid,
            userData,
        });

        Actions.pop();
    }

    toggleCancelModal() {
        this.setState({
            showCancelModal: !this.state.showCancelModal,
        });
    }

    cancelEditProfile() {
        if (this.props.temporaryImage) {
            let newPhotoFullSizeURI = this.props.temporaryImage.fullSize;
            let newPhotoCroppedURI = this.props.temporaryImage.cropped;
            const newPhotosURIArray = [newPhotoFullSizeURI, newPhotoCroppedURI]
            const newPhotosPathsArray = utilities.convertURIsToPaths(newPhotosURIArray);

            this.props.dispatch({
                type: 'CLEAR_TEMPORARY_IMAGE'
            });

            for (let i = 0; i < newPhotosPathsArray.length; i++) {
                this.props.dispatch({
                    type: 'deleteFile',
                    path: newPhotosPathsArray[i],
                });
            }
        }

        this.state.showCancelModal && this.toggleCancelModal();
        Actions.pop();
    }

    render() {
        const enableContinueButton = this.state.editUserEmail && this.state.editUserName ? true : false;
        const userPhotoUrl = this.props.temporaryImage ? this.props.temporaryImage.cropped : this.props.userPhotoUrl && this.props.userPhotoUrl.cropped;

        const photoModal = this.state.showPhotoModal ?
            <OptionsModal
                title='Choose an Option'
                options={['Take a Photo', 'Choose a Photo']}
                handleSelect={this.selectPhotoOption}
                handleClose={this.togglePhotoModal} />
            :
            null;

        const cancelModal = this.state.showCancelModal &&
            <ActionModal
                title='Are you sure you want to exit without saving your profile?'
                subtitle='You will lose all the data you added.'
                handleLeftIconPress={this.cancelEditProfile}
                handleRightIconPress={this.toggleCancelModal} />;

        return (
            <Page>

                <Header
                    text='Edit Profile'
                    closeButton
                    handleLeftIconPress={enableContinueButton ? this.toggleCancelModal : this.cancelEditProfile}
                    continueButton={enableContinueButton}
                    handleRightIconPress={this.updateUserDetails}
                    headerShadow />

                <InputContainer>

                    <EditableImage
                        uri={userPhotoUrl}
                        handlePress={this.togglePhotoModal} />

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

                {photoModal}

                {cancelModal}

                <SnackBar />

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
        temporaryImage: state.main.images.temporaryImage,
    });
}

export default connect(mapStateToProps)(Profile);