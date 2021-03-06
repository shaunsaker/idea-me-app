import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import Permissions from '../permissions';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import PhotoViewer from '../components/PhotoViewer';
import Loader from '../widgets/Loader';
import SnackBar from '../widgets/SnackBar';
import OptionsModal from '../modals/OptionsModal';
import ActionModal from '../modals/ActionModal';

export class Photos extends React.Component {
    constructor(props) {
        super(props);

        this.togglePhotoViewer = this.togglePhotoViewer.bind(this);
        this.togglePhotoModal = this.togglePhotoModal.bind(this);
        this.selectPhotoOption = this.selectPhotoOption.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);

        this.state = {
            showPhotoViewer: false,
            showPhotoModal: false,
            showDeleteModal: false,
            deletePhotoIndex: null,
        };
    }

    static get propTypes() {
        return {
            idea: PropTypes.object, // idea indicates on idea photos
            addIdea: PropTypes.bool, // flag indicating add/edit idea page photos

            temporaryImage: PropTypes.object,
            newPhotos: PropTypes.object,
            ideas: PropTypes.object,
            uid: PropTypes.string,
        };
    }

    componentDidMount() {
        // If our idea has photos or newPhotos were passed in as props from add/edit idea pages
        if (this.props.idea.photos || this.props.newPhotos) {
            const newPhotos = this.props.idea.photos
                ? this.props.idea.photos
                : this.props.newPhotos;

            this.props.dispatch({
                type: 'SET_NEW_PHOTOS',
                newPhotos,
            });
        }
    }

    componentDidUpdate(prevProps) {
        // If an image was taken/saved
        if (
            this.props.temporaryImage &&
            this.props.temporaryImage !== prevProps.temporaryImage
        ) {
            const newPhotos = utilities.pushObjectToDictionary(
                this.props.temporaryImage,
                this.props.newPhotos
            );

            this.props.dispatch({
                type: 'SET_NEW_PHOTOS',
                newPhotos,
            });

            if (!this.props.addIdea) {
                let newIdea = utilities.cloneObject(this.props.idea);
                newIdea['photos'] = newPhotos;
                const newIdeas = utilities.updateObjectInDictionary(
                    this.props.idea.uid,
                    newIdea,
                    this.props.ideas
                );

                // Dispatch to store
                this.props.dispatch({
                    type: 'UPDATE_USER_DATA',
                    node: 'ideas',
                    userData: newIdeas,
                });

                // Dispatch to db
                this.props.dispatch({
                    type: 'saveUserData',
                    node: 'ideas',
                    uid: this.props.uid,
                    userData: newIdeas,
                });
            }
        }
    }

    componentWillUnmount() {
        if (!this.props.addIdea) {
            this.props.dispatch({
                type: 'CLEAR_NEW_PHOTOS',
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
            showPhotoModal: !this.state.showPhotoModal,
        });
    }

    selectPhotoOption(option) {
        this.togglePhotoModal();

        if (option === 'Take a Photo') {
            Permissions.handlePermission(
                'camera',
                () => {
                    this.props.dispatch({
                        type: 'handleImage',
                        option,
                        maxWidth: Math.ceil(styleConstants.noteCardCell),
                    });
                },
                () => {
                    this.props.dispatch({
                        type: 'SET_ERROR',
                        errorType: 'USER',
                        message: 'We need your permission to use your camera.',
                    });
                }
            );
        } else {
            Permissions.handlePermission(
                'photo',
                () => {
                    this.props.dispatch({
                        type: 'handleImage',
                        option,
                        maxWidth: Math.ceil(styleConstants.noteCardCell),
                    });
                },
                () => {
                    this.props.dispatch({
                        type: 'SET_ERROR',
                        errorType: 'USER',
                        message:
                            'We need your permission to access your photo gallery.',
                    });
                }
            );
        }
    }

    toggleDeleteModal(photo) {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deletePhotoUID: photo && photo.uid, // will be null if closed
        });
    }

    deletePhoto() {
        this.toggleDeleteModal();

        let newPhotos = utilities.removeObjectFromDictionary(
            this.state.deletePhotoUID,
            this.props.newPhotos
        );

        this.props.dispatch({
            type: 'SET_NEW_PHOTOS',
            newPhotos,
        });

        if (!this.props.addIdea) {
            let newIdea = utilities.cloneObject(this.props.idea);
            newIdea['photos'] = newPhotos;
            const newIdeas = utilities.updateObjectInDictionary(
                this.props.idea.uid,
                newIdea,
                this.props.ideas
            );

            // Dispatch to store
            this.props.dispatch({
                type: 'UPDATE_USER_DATA',
                node: 'ideas',
                userData: newIdeas,
            });

            // Dispatch to db
            this.props.dispatch({
                type: 'deleteUserData',
                node:
                    'ideas/' +
                    this.props.idea.uid +
                    '/photos/' +
                    this.state.deletePhotoUID,
                uid: this.props.uid,
            });
        }
    }

    render() {
        const photosArray = utilities.convertDictionaryToArray(
            this.props.newPhotos
        );

        const photoViewer = this.state.showPhotoViewer && (
            <PhotoViewer
                photos={photosArray}
                scrollToIndex={this.state.photoViewerIndex}
                handleClose={this.togglePhotoViewer}
                handleDeletePhoto={this.toggleDeleteModal}
            />
        );

        const photoModal = this.state.showPhotoModal && (
            <OptionsModal
                title="Choose an Option"
                options={['Take a Photo', 'Choose a Photo']}
                handleSelect={this.selectPhotoOption}
                handleClose={this.togglePhotoModal}
            />
        );

        const deletePhotoModal = this.state.showDeleteModal && (
            <ActionModal
                title={'Are you sure you want to delete this photo?'}
                handleLeftIconPress={this.deletePhoto}
                handleRightIconPress={this.toggleDeleteModal}
            />
        );

        return (
            <Page backgroundColor={styleConstants.white} removeBottomPadding>
                <Header headerShadow backButton text="Photos" />

                <NoteCard
                    idea={this.props.idea}
                    type="photos"
                    photos={photosArray}
                    displayInfo
                    handleViewPhotos={this.togglePhotoViewer}
                    handleAdd={this.togglePhotoModal}
                    handleDelete={this.toggleDeleteModal}
                />

                {photoViewer}

                {photoModal}

                {deletePhotoModal}

                <SnackBar />

                <Loader />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        temporaryImage: state.main.appData.temporaryImage,
        newPhotos: state.main.appData.newPhotos,
        ideas: state.main.userData.ideas,
        uid: state.main.userAuth.uid,
    };
}

export default connect(mapStateToProps)(Photos);
