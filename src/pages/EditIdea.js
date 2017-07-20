import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import RadioSelect from '../components/RadioSelect';
import DropdownButton from '../components/DropdownButton';
import TabBar from '../components/TabBar';
import ActionModal from '../modals/ActionModal';
import SnackBar from '../widgets/SnackBar';

export class EditIdea extends React.Component {
    constructor(props) {
        super(props);

        this.updateEditIdeaTitle = this.updateEditIdeaTitle.bind(this);
        this.updateEditIdeaDescription = this.updateEditIdeaDescription.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectPriority = this.selectPriority.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
        this.toggleCancelModal = this.toggleCancelModal.bind(this);
        this.cancelEditIdea = this.cancelEditIdea.bind(this);

        this.state = {
            editIdeaTitle: null,
            editIdeaDescription: null,
            editIdeaCategory: null,
            editIdeaPriority: null,
            showCancelModal: false,
        }
    }

    static get propTypes() {
        return {
            initialIdeaTitle: PropTypes.string,
            initialIdeaDescription: PropTypes.string,
            initialIdeaCategory: PropTypes.string,
            initialIdeaPriority: PropTypes.string,
            ideas: PropTypes.object,
            newNotes: PropTypes.object,
            newPhotos: PropTypes.object,
            newVoiceNotes: PropTypes.object,
            categories: PropTypes.object,
            priorities: PropTypes.object,
            uid: PropTypes.string,
            hasNetwork: PropTypes.bool,
        };
    }

    componentDidMount() {
        this.updateEditIdeaTitle(this.props.initialIdeaTitle);
        this.props.initialIdeaDescription && this.updateEditIdeaDescription(this.props.initialIdeaDescription);
        this.props.initialIdeaCategory && this.selectCategory(this.props.initialIdeaCategory);
        this.props.initialIdeaPriority && this.selectPriority(this.props.initialIdeaPriority);

        if (this.props.initialIdeaNotes) {
            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes: this.props.initialIdeaNotes,
            });
        }

        if (this.props.initialIdeaPhotos) {
            this.props.dispatch({
                type: 'SET_NEW_PHOTOS',
                newPhotos: this.props.initialIdeaPhotos,
            });
        }

        if (this.props.initialIdeaVoiceNotes) {
            this.props.dispatch({
                type: 'SET_NEW_VOICE_NOTES',
                newVoiceNotes: this.props.initialIdeaVoiceNotes,
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'CLEAR_ALL_NOTES',
        });
    }

    updateEditIdeaTitle(value) {
        this.setState({
            editIdeaTitle: value
        });
    }

    updateEditIdeaDescription(value) {
        this.setState({
            editIdeaDescription: value
        });
    }

    selectCategory(value) {

        if (value === 'Edit Categories') {
            Actions.categories();
        }
        else {
            this.setState({
                editIdeaCategory: value
            });
        }
    }

    selectPriority(value) {
        this.setState({
            editIdeaPriority: value
        });
    }

    updateIdea() {
        const editedIdea = {
            title: utilities.firstCharToUppercase(this.state.editIdeaTitle),
            description: this.state.editIdeaDescription && utilities.firstCharToUppercase(this.state.editIdeaDescription),
            category: this.state.editIdeaCategory,
            priority: this.state.editIdeaPriority,
            notes: this.props.newNotes,
            photos: this.props.newPhotos,
            voiceNotes: this.props.newVoiceNotes,
            uid: this.props.initialIdeaUID,
        };

        let isIdeaTitlePresent;
        const remainingIdeas = utilities.removeObjectFromObjectArray(this.props.initialIdeaUID, this.props.ideas);

        // check if the new idea title is already present (but exclude our current idea)
        isIdeaTitlePresent = utilities.isKeyValuePairPresentInObjectArray({ title: editedIdea.title }, remainingIdeas);

        if (!isIdeaTitlePresent) {
            const newIdeas = utilities.updateObjectInObjectArray(this.props.initialIdeaUID, editedIdea, this.props.ideas);

            this.props.dispatch({
                type: 'UPDATE_USER_DATA',
                node: 'ideas',
                userData: newIdeas,
            });

            this.props.dispatch({
                type: 'saveUserData',
                node: 'ideas',
                uid: this.props.uid,
                userData: newIdeas,
                hasNetwork: this.props.hasNetwork,
            });

            Actions.pop();
        }
        else {
            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'An idea with this title already exists'
            });
        }
    }

    toggleCancelModal() {
        this.setState({
            showCancelModal: !this.state.showCancelModal,
        });
    }

    cancelEditIdea() {

        // Remove unused files
        if (this.props.newPhotos) {

            // Get the difference between newPhotos and initial idea photos
            const newPhotos = utilities.getDifferenceBetweenObjectArrays(this.props.newPhotos, this.props.initialIdeaPhotos);

            if (newPhotos) {
                let newPhotosFullSizeURIArray = utilities.getValuesThatMatchKeyFromObjectArray('fullSize', newPhotos);
                let newPhotosCroppedURIArray = utilities.getValuesThatMatchKeyFromObjectArray('cropped', newPhotos);
                const newPhotosURIArray = newPhotosFullSizeURIArray.concat(newPhotosCroppedURIArray);
                const newPhotosPathsArray = utilities.convertURIsToPaths(newPhotosURIArray);

                for (let i = 0; i < newPhotosPathsArray.length; i++) {
                    this.props.dispatch({
                        type: 'deleteFile',
                        path: newPhotosPathsArray[i],
                    });
                }
            }
        }

        if (this.props.newVoiceNotes) {

            // Get the difference between newVoiceNotes and initial idea voiceNotes
            const newVoiceNotes = utilities.getDifferenceBetweenObjectArrays(this.props.newVoiceNotes, this.props.initialIdeaVoiceNotes);
            const newVoiceNotesPathsArray = utilities.getValuesThatMatchKeyFromObjectArray('filePath', newVoiceNotes);

            for (let i = 0; i < newVoiceNotesPathsArray.length; i++) {
                this.props.dispatch({
                    type: 'deleteFile',
                    path: newVoiceNotesPathsArray[i],
                });
            }
        }

        this.state.showCancelModal && this.toggleCancelModal();
        Actions.pop();
    }

    render() {
        const enableContinueButton = this.state.editIdeaTitle ? true : false;
        const categories = utilities.convertObjectArrayToArray(this.props.categories);
        const priorities = utilities.convertObjectArrayToArray(this.props.priorities);
        const editNotesCount = utilities.getLengthOfObject(this.props.newNotes);
        const editPhotosCount = utilities.getLengthOfObject(this.props.newPhotos);
        const editVoiceNotesCount = utilities.getLengthOfObject(this.props.newVoiceNotes);

        const cancelModal = this.state.showCancelModal &&
            <ActionModal
                title='Are you sure you want to exit without saving your idea?'
                subtitle='You will lose all the data you added.'
                handleLeftIconPress={this.cancelEditIdea}
                handleRightIconPress={this.toggleCancelModal} />;

        return (
            <Page
                removeBottomPadding>

                <Header
                    text='Edit Idea'
                    headerShadow
                    closeButton
                    handleLeftIconPress={enableContinueButton ? this.toggleCancelModal : this.cancelNewIdea}
                    continueButton={enableContinueButton}
                    handleRightIconPress={this.updateIdea}
                />

                <InputContainer
                    style={{ alignItems: 'center' }}>

                    <Input
                        placeholder="WHAT'S THE BIG IDEA?"
                        value={this.state.editIdeaTitle}
                        handleChange={this.updateEditIdeaTitle}
                        maxLength={16} />

                    <Input
                        placeholder='ENTER YOUR DESCRIPTION HERE'
                        value={this.state.editIdeaDescription}
                        handleChange={this.updateEditIdeaDescription}
                        multiline />

                    <RadioSelect
                        displayText='SELECT A PRIORITY'
                        currentValue={this.state.editIdeaPriority}
                        values={priorities}
                        handleSelect={this.selectPriority} />

                    <DropdownButton
                        displayText='Select a Category'
                        currentValue={this.state.editIdeaCategory}
                        values={categories}
                        handleSelect={this.selectCategory}
                        buttonBackgroundColor={styleConstants.primary}
                        pushContent />

                </InputContainer>

                <TabBar
                    backgroundColor={styleConstants.white}
                    color={styleConstants.primary}
                    tabs={
                        [
                            {
                                title: 'Note',
                                icon: 'note',
                                action: () => Actions.notes({
                                    idea: {
                                        title: this.state.editIdeaTitle,
                                        description: this.state.editIdeaDescription,
                                    },
                                    addIdea: true,
                                }),
                                count: editNotesCount,
                                disabled: !this.state.editIdeaTitle,
                            },
                            {
                                title: 'Photo',
                                icon: 'camera',
                                action: () => Actions.photos({
                                    idea: {
                                        title: this.state.editIdeaTitle,
                                        description: this.state.editIdeaDescription,
                                    },
                                    addIdea: true,
                                }),
                                count: editPhotosCount,
                                disabled: !this.state.editIdeaTitle,
                            },
                            {
                                title: 'Voice Note',
                                icon: 'voice',
                                action: () => Actions.voiceNotes({
                                    idea: {
                                        title: this.state.editIdeaTitle,
                                        description: this.state.editIdeaDescription,
                                    },
                                    addIdea: true,
                                }),
                                count: editVoiceNotesCount,
                                disabled: !this.state.editIdeaTitle,
                            },
                        ]
                    } />

                {cancelModal}

                <SnackBar />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        initialIdeaUID: state.routes.scene.uid,
        initialIdeaTitle: state.routes.scene.title,
        initialIdeaDescription: state.routes.scene.description,
        initialIdeaCategory: state.routes.scene.category,
        initialIdeaPriority: state.routes.scene.priority,
        initialIdeaNotes: state.routes.scene.notes,
        initialIdeaPhotos: state.routes.scene.photos,
        initialIdeaVoiceNotes: state.routes.scene.voiceNotes,
        ideas: state.main.userData.ideas,
        newNotes: state.main.appData.newNotes,
        newPhotos: state.main.appData.newPhotos,
        newVoiceNotes: state.main.appData.newVoiceNotes,
        categories: state.main.userData.categories,
        priorities: state.main.appData.priorities,
        uid: state.main.auth.uid,
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(EditIdea);