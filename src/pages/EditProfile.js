import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import EditableImage from '../components/EditableImage';
import Input from '../components/Input';
import Button from '../components/Button';
import SnackBar from '../widgets/SnackBar';
import OptionsModal from '../modals/OptionsModal';
import ActionModal from '../modals/ActionModal';

const styles = StyleSheet.create({
    currentLocationButtonContainer: {
        marginHorizontal: 16,
    },
    currentLocationButton: {

    },
    currentLocationButtonText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.lightGrey,
        textDecorationLine: 'underline',
    },
    currentLocationLoadingContainer: {
        position: 'absolute',
        bottom: 45,
        left: 16,
    },
});

export class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editUserName: null,
            editUserEmail: null,
            editUserLocation: null,
            showPhotoModal: false,
            showCancelModal: false,
            hasFetchedLocation: false,
            isFetchingLocation: false,
        }

        this.togglePhotoModal = this.togglePhotoModal.bind(this);
        this.selectPhotoOption = this.selectPhotoOption.bind(this);
        this.updateEditUserName = this.updateEditUserName.bind(this);
        this.updateEditUserEmail = this.updateEditUserEmail.bind(this);
        this.updateEditUserLocation = this.updateEditUserLocation.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
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
            currentLocation: PropTypes.string,
            temporaryImage: PropTypes.object,
        };
    }

    componentDidMount() {
        this.updateEditUserName(this.props.userName);
        this.updateEditUserEmail(this.props.userEmail);
        this.updateEditUserLocation(this.props.userLocation);
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentLocation && this.props.currentLocation !== prevProps.currentLocation) {
            this.updateEditUserLocation(this.props.currentLocation);

            this.setState({
                hasFetchedLocation: true,
                isFetchingLocation: false,
            });
        }
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

    updateEditUserLocation(value) {
        this.setState({
            editUserLocation: value,
        });
    }

    getUserLocation() {
        this.updateEditUserLocation('');

        this.setState({
            isFetchingLocation: true,
        });

        this.props.dispatch({
            type: 'getUserLocation',
        });
    }

    updateUserDetails() {
        const prettyUserName = utilities.prettifyString(this.state.editUserName);
        const userPhotoUrl = this.props.temporaryImage ? this.props.temporaryImage : this.props.userPhotoUrl;
        const userData = {
            userName: prettyUserName,
            userEmail: this.state.editUserEmail,
            userLocation: this.props.currentLocation ? this.props.currentLocation : this.props.userLocation,
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
        const enableContinueButton = this.state.editUserEmail && this.state.editUserName && this.state.editUserLocation ? true : false;
        const userPhotoUrl = this.props.temporaryImage ? this.props.temporaryImage.cropped : this.props.userPhotoUrl && this.props.userPhotoUrl.cropped;

        const currentLocationComponent = this.state.isFetchingLocation ?
            <View style={styles.currentLocationLoadingContainer}>
                <ActivityIndicator
                    size="small"
                    color={styleConstants.lightGrey} />
            </View>
            :
            !this.state.hasFetchedLocation &&
            <View style={styles.currentLocationButtonContainer}>
                <TouchableOpacity
                    onPress={this.getUserLocation}
                    style={styles.currentLocationButton}>
                    <Text style={[styles.currentLocationButtonText, styleConstants.primaryFont]}>
                        Use Your Current location
                        </Text>
                </TouchableOpacity>
            </View>;

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

                    <Input
                        placeholder="LOCATION"
                        value={this.state.editUserLocation}
                        handleChange={this.updateEditUserLocation} />

                    {currentLocationComponent}

                </InputContainer>

                {photoModal}

                {cancelModal}

                <SnackBar />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.userAuth.uid,
        userName: state.main.userData.profile.userName,
        userEmail: state.main.userData.profile.userEmail,
        userLocation: state.main.userData.profile.userLocation,
        currentLocation: state.main.appData.currentLocation,
        userPhotoUrl: state.main.userData.profile.userPhotoUrl,
        temporaryImage: state.main.appData.temporaryImage,
    });
}

export default connect(mapStateToProps)(EditProfile);