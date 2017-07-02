import React from "react";
import {
    View,
    Text,
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
            idea: React.PropTypes.object,

            newPhotos: React.PropTypes.array,
            ideas: React.PropTypes.object,

            uid: React.PropTypes.string,
            hasNetwork: React.PropTypes.bool,
            cloudDataSuccess: React.PropTypes.bool,
        };
    }

    componentDidMount() {
        if (this.props.newPhotos || this.props.idea) {
            const newPhotos = this.props.newPhotos.length ? this.props.newPhotos : this.props.idea.photos;
            const newPhotosArray = utilities.convertObjectArrayToArray(newPhotos);
            
            this.props.dispatch({
                type: 'UPDATE_NEW_PHOTOS',
                newPhotos: newPhotosArray,
            });
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
        this.props.dispatch({
            type: 'UPDATE_NEW_PHOTOS',
            newPhotos: [],
        });
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
            ideaPhoto: true,
        });
    }

    toggleDeletePhotoModal(index) {
        this.setState({
            showDeletePhotoModal: !this.state.showDeletePhotoModal,
            deletePhotoIndex: index && index,
        });
    }

    deletePhoto() {
        let newPhotos = this.props.newPhotos;
        newPhotos.splice(this.state.deletePhotoIndex, 1);

        this.props.dispatch({
            type: 'UPDATE_NEW_PHOTOS',
            newPhotos,
        }); 

        this.toggleDeletePhotoModal();
    }

    savePhotos() {
        const newPhotos = utilities.convertArrayToObjectArray(this.props.newPhotos);

        let newIdea = this.props.idea;
        newIdea['photos'] = newPhotos;
        const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

        this.props.dispatch({
            type: 'saveUserData',
            node: 'ideas',
            uid: this.props.uid,
            userData: newIdeas,
            currentAction: 'savePhotos',
            hasNetwork: this.props.hasNetwork,
        });
    }

    render() {
        const photoViewer = this.state.showPhotoViewer ?
            <PhotoViewer
                photos={this.props.newPhotos}
                scrollToIndex={this.state.photoViewerIndex}
                handleClose={this.togglePhotoViewer} />
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
                    photos={this.props.newPhotos}
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