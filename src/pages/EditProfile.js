import React from "react";
import {
    View,
    ImageEditor,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import config from '../config';
import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import EditableImage from '../components/EditableImage';
import Input from '../components/Input';
import Button from '../components/Button';
import OptionsModal from '../components/OptionsModal';
import Growl from '../components/Growl';
import Loader from '../components/Loader';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editUserName: null,
            editUserEmail: null,
            showModal: false,}

        this.toggleModal = this.toggleModal.bind(this);
        this.selectModalOption = this.selectModalOption.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.choosePhoto = this.choosePhoto.bind(this);
        this.handleImage = this.handleImage.bind(this);
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
            userPhotoUrl: React.PropTypes.string,
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

    selectModalOption(type) {
        if (type === 'Take a Photo') {
            this.takePhoto();
        }
        else {
            this.choosePhoto();
        }
    }

    takePhoto() {        
        this.toggleModal();

        ImagePicker.launchCamera(config.images.imagePickerOptions, (response) => {
            if (!response.didCancel) {
                this.handleImage(response);
            }
        });
    }

    choosePhoto() {
        this.toggleModal();

        ImagePicker.launchImageLibrary(config.images.imagePickerOptions, (response) => {
            if (!response.didCancel) {
                this.handleImage(response);
            }
        });
    }

    handleImage(response) {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        const portrait = response.height > response.width;

        const imageResizerOptions = [
            response.path, // path to image
            portrait ? config.images.maxImageWidth : config.images.maxImageWidth * 2, // maxWidth
            portrait ? config.images.maxImageWidth * 2 : config.images.maxImageWidth, // maxHeight
            ...config.images.imageResizerOptions,
        ];

        const offsetX = portrait ? 0 : (config.images.maxImageWidth / 2 * response.width / response.height) - config.images.maxImageWidth / 2;
        const offsetY = portrait ? (config.images.maxImageWidth / 2 * response.height / response.width) - config.images.maxImageWidth / 2 : 0;

        ImageResizer.createResizedImage(...imageResizerOptions)
            .then((resizedImageUri) => {
                const cropOptions = {
                    offset: {
                        x: offsetX,
                        y: offsetY
                    },
                    size: {
                        width: config.images.maxImageWidth,
                        height: config.images.maxImageWidth
                    }
                };

                ImageEditor.cropImage(resizedImageUri, cropOptions,
                    (uri) => {
                        this.props.dispatch({
                            type: 'uploadUserPhoto',
                            uid: this.props.uid,
                            path: uri
                        });
                    },
                    (error) => {
                        this.props.dispatch({
                            type: 'CLOUD_STORAGE_ERROR',
                            message: error.message
                        });
                    });
            })
            .catch((error) => {
                this.props.dispatch({
                    type: 'CLOUD_STORAGE_ERROR',
                    message: error.message
                });
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

        const prettyUserName = utilities.prettifyUserName(this.state.editUserName);

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
                options={['Take a Photo', 'Choose a Photo']}
                handleSelect={this.selectModalOption}
                handleClose={this.toggleModal}/>
            :
            null;

        const enableContinueButton = this.state.editUserEmail && this.state.editUserName;

        return (
            <Page>

                <Header
                    text='Edit Profile'
                    closeButton
                    headerShadow />

                <InputContainer>
                    <EditableImage
                        uri={this.props.userPhotoUrl}
                        handlePress={this.toggleModal} />

                    <Input
                        placeholder="NAME"
                        value={this.state.editUserName}
                        handleChange={this.updateEditUserName} />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.state.editUserEmail}
                        handleChange={this.updateEditUserEmail} />

                    <Button
                        iconName='edit-location'
                        text={this.props.userLocation}
                        styleMode='transparent'
                        handlePress={() => Actions.editLocation()} />
                </InputContainer>

                <Button
                    iconName='check'
                    text='Continue'
                    styleMode='primaryReversed'
                    handlePress={this.updateUserDetails}
                    disabled={!enableContinueButton} />

                {modal}

                <Growl />

                <Loader />

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