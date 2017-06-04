import React from "react";
import {
    View,
    ImageEditor,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

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

        this.imagePickerOptions = {
            mediaType: 'photo',
            noData: true, // greatly improves performance
        };

        this.maxImageSize = 100;

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
        };
    }

    componentDidMount() {
        this.updateEditUserName(this.props.userName);
        this.updateEditUserEmail(this.props.userEmail);
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

        ImagePicker.launchCamera(this.imagePickerOptions, (response) => {
            if (!response.didCancel) {
                this.handleImage(response);
            }
        });
    }

    choosePhoto() {
        this.toggleModal();

        ImagePicker.launchImageLibrary(this.imagePickerOptions, (response) => {
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
            portrait ? this.maxImageSize : this.maxImageSize * 2, // maxWidth
            portrait ? this.maxImageSize * 2 : this.maxImageSize, // maxHeight
            'JPEG', // compressFormat
            100, // quality
        ];

        const offsetX = portrait ? 0 : (this.maxImageSize / 2 * response.width / response.height) - this.maxImageSize / 2;
        const offsetY = portrait ? (this.maxImageSize / 2 * response.height / response.width) - this.maxImageSize / 2 : 0;

        ImageResizer.createResizedImage(...imageResizerOptions)
            .then((resizedImageUri) => {
                const cropOptions = {
                    offset: {
                        x: offsetX,
                        y: offsetY
                    },
                    size: {
                        width: this.maxImageSize,
                        height: this.maxImageSize
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
                            type: 'STORAGE_ERROR',
                            message: error.message
                        });
                    });
            })
            .catch((error) => {
                this.props.dispatch({
                    type: 'STORAGE_ERROR',
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
        const prettyUserName = utilities.prettifyUserName(this.state.editUserName);

        // Save to DB
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
            <Page
                backgroundColor={styleConstants.primary} >

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
                        iconName='location-on'
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
    });
}

export default connect(mapStateToProps)(Profile);