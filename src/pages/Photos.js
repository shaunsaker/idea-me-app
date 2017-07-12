import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Dimensions,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import PhotoViewer from '../components/PhotoViewer';
import OptionsModal from '../components/OptionsModal';
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

const { width, height } = Dimensions.get('window');

export class Photos extends React.Component {
    constructor(props) {
        super(props);

        this.togglePhotoViewer = this.togglePhotoViewer.bind(this);
        this.togglePhotoModal = this.togglePhotoModal.bind(this);
        this.selectPhotoOption = this.selectPhotoOption.bind(this);
        this.toggleDeletePhotoModal = this.toggleDeletePhotoModal.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.savePhotos = this.savePhotos.bind(this);

        this.state = {
            showPhotoViewer: false,
            showPhotoModal: false,
            showDeletePhotoModal: false,
            deletePhotoIndex: null,
        }
    }

    static get propTypes() {
        return {
            idea: PropTypes.object,

            newPhotos: PropTypes.object,
            ideas: PropTypes.object,
            uid: PropTypes.string,
            hasNetwork: PropTypes.bool,
            cloudDataSuccess: PropTypes.bool,
        };
    }

    componentDidMount() {
        if (this.props.idea) {
            const newPhotos = this.props.idea.photos;
            
            if (newPhotos) {
                this.props.dispatch({
                    type: 'SET_NEW_PHOTOS',
                    newPhotos: this.props.idea.photos,
                });
            }
        }
    }

    componentDidUpdate() {
        if (this.props.currentAction === 'savePhotos' && this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS'
            });

            Actions.pop();
        }
    }

    componentWillUnmount() {
        if (!this.props.addIdea) {
            this.props.dispatch({
                type: 'CLEAR_ALL_NOTES',
            });
        }
    }

    togglePhotoViewer(index) {
        this.setState({
            showPhotoViewer: !this.state.showPhotoViewer,
            photoViewerIndex: index,
        });
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
            ideaPhoto: true, // TODO: this flag will be used for profile photos rather
            maxWidth: Math.ceil((width - 122) / 3), // 122 = padding + margin
        });
    }

    toggleDeletePhotoModal(uid) {
        this.setState({
            showDeletePhotoModal: !this.state.showDeletePhotoModal,
            deletePhotoUID: uid && uid,
        });
    }

    deletePhoto() {
        let newPhotos = utilities.removeObjectFromObjectArray(this.state.deletePhotoUID, this.props.newPhotos);

        this.props.dispatch({
            type: 'SET_NEW_PHOTOS',
            newPhotos,
        }); 

        this.toggleDeletePhotoModal();
    }

    savePhotos() {

        // Adding an idea
        if (this.props.addIdea) {
            this.props.dispatch({
                type: 'SET_NEW_PHOTOS',
                newPhotos: this.props.newPhotos,
            });

            Actions.pop();
        }

        // Editing an idea
        else {
            let newIdea = this.props.idea;
            newIdea['photos'] = this.props.newPhotos;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            this.props.dispatch({
                type: 'saveUserData',
                node: 'ideas',
                uid: this.props.uid,
                userData: newIdeas,
                currentAction: 'savePhotos',
                hasNetwork: this.props.hasNetwork,
                ideaPhoto: true, // TODO: rather set profile photo flag
            });
        }
    }

    render() {
        const photosArray = utilities.convertObjectArrayToArray(this.props.newPhotos);

        const photoViewer = this.state.showPhotoViewer ?
            <PhotoViewer
                photos={photosArray}
                scrollToIndex={this.state.photoViewerIndex}
                handleClose={this.togglePhotoViewer}
                handleDeletePhoto={this.toggleDeletePhotoModal} />
            :
            null;

        const photoModal = this.state.showPhotoModal ?
            <OptionsModal
                title='Choose an Option'
                options={['Take a Photo', 'Choose a Photo']}
                handleSelect={this.selectPhotoOption}
                handleClose={this.togglePhotoModal} />
            :
            null;

        const deletePhotoModal = this.state.showDeletePhotoModal ?
            <ActionModal 
                title={'Are you sure you want to delete this photo?'}
                handleLeftIconPress={() => this.deletePhoto()}
                handleRightIconPress={this.toggleDeletePhotoModal} />
            :
            null;

        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding>

                <Header
                    headerShadow
                    closeButton
                    continueButton
                    text='Photos'
                    handleRightIconPress={this.savePhotos} />

                <NoteCard
                    idea={this.props.idea}
                    type='photos'
                    photos={photosArray}
                    displayInfo
                    handleViewPhotos={this.togglePhotoViewer}
                    handleAdd={this.togglePhotoModal}
                    handleDelete={this.toggleDeletePhotoModal} />

                {photoViewer}

                {photoModal}

                {deletePhotoModal}

                <SnackBar />

                <Loader
                    position='bottom' />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        newPhotos: state.main.appData.newPhotos,
        ideas: state.main.userData.ideas,
        uid: state.main.auth.uid,
        hasNetwork: state.main.app.hasNetwork,
        currentAction: state.main.app.currentAction,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    });
}

export default connect(mapStateToProps)(Photos);