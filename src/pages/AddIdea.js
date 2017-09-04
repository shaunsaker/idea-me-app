import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import RadioSelect from '../components/RadioSelect';
import DropdownButton from '../components/DropdownButton';
import TabBar from '../components/TabBar';
import SnackBar from '../widgets/SnackBar';
import ActionModal from '../modals/ActionModal';

export class AddIdea extends React.Component {
    constructor(props) {
        super(props);

        this.updateNewIdeaTitle = this.updateNewIdeaTitle.bind(this);
        this.updateNewIdeaDescription = this.updateNewIdeaDescription.bind(
            this
        );
        this.selectCategory = this.selectCategory.bind(this);
        this.selectPriority = this.selectPriority.bind(this);
        this.saveNewIdea = this.saveNewIdea.bind(this);
        this.toggleCancelModal = this.toggleCancelModal.bind(this);
        this.cancelNewIdea = this.cancelNewIdea.bind(this);

        this.state = {
            newIdeaTitle: null,
            newIdeaDescription: null,
            newIdeaCategory: null,
            newIdeaPriority: null,
            showCancelModal: false,
        };
    }

    static get propTypes() {
        return {
            ideas: PropTypes.object,
            categories: PropTypes.object,
            priorities: PropTypes.object,
            newNotes: PropTypes.object,
            newPhotos: PropTypes.object,
            newVoiceNotes: PropTypes.object,
            uid: PropTypes.string,
        };
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'CLEAR_ALL_NOTES',
        });
    }

    updateNewIdeaTitle(value) {
        this.setState({
            newIdeaTitle: value,
        });
    }

    updateNewIdeaDescription(value) {
        this.setState({
            newIdeaDescription: value,
        });
    }

    selectCategory(value) {
        if (value === 'Edit Categories') {
            Actions.categories();
        } else {
            this.setState({
                newIdeaCategory: value,
            });
        }
    }

    selectPriority(value) {
        this.setState({
            newIdeaPriority: value,
        });
    }

    saveNewIdea() {
        const newIdea = {
            title: utilities.firstCharToUppercase(this.state.newIdeaTitle),
            description:
                this.state.newIdeaDescription &&
                utilities.firstCharToUppercase(this.state.newIdeaDescription),
            category: this.state.newIdeaCategory,
            priority: this.state.newIdeaPriority,
            notes: this.props.newNotes,
            photos: this.props.newPhotos,
            voiceNotes: this.props.newVoiceNotes,
            uid: utilities.createUID(),
        };

        let isIdeaTitlePresent;

        // if we have ideas
        if (this.props.ideas) {
            // check if the idea title is already present
            isIdeaTitlePresent = utilities.isKeyValuePairPresentInDictionary(
                { title: newIdea.title },
                this.props.ideas
            );
        }

        if (!isIdeaTitlePresent) {
            const newIdeas = utilities.pushObjectToDictionary(
                newIdea,
                this.props.ideas
            );

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
            });

            Actions.pop();
        } else {
            this.props.dispatch({
                type: 'SET_ERROR',
                errorType: 'USER',
                message: 'An idea with this title already exists',
            });
        }
    }

    toggleCancelModal() {
        this.setState({
            showCancelModal: !this.state.showCancelModal,
        });
    }

    cancelNewIdea() {
        // Remove unused files
        if (this.props.newPhotos) {
            let newPhotosFullSizeURIArray = utilities.getValuesThatMatchKeyFromDictionary(
                'fullSize',
                this.props.newPhotos
            );
            let newPhotosCroppedURIArray = utilities.getValuesThatMatchKeyFromDictionary(
                'cropped',
                this.props.newPhotos
            );
            const newPhotosURIArray = newPhotosFullSizeURIArray.concat(
                newPhotosCroppedURIArray
            );
            const newPhotosPathsArray = utilities.convertURIsToPaths(
                newPhotosURIArray
            );

            for (let i = 0; i < newPhotosPathsArray.length; i++) {
                this.props.dispatch({
                    type: 'deleteFile',
                    path: newPhotosPathsArray[i],
                });
            }
        }

        if (this.props.newVoiceNotes) {
            const newVoiceNotesPathsArray = utilities.getValuesThatMatchKeyFromDictionary(
                'filePath',
                this.props.newVoiceNotes
            );

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
        const enableContinueButton = this.state.newIdeaTitle ? true : false;
        const categories = utilities.convertDictionaryToArray(
            this.props.categories
        );
        const priorities = utilities.convertDictionaryToArray(
            this.props.priorities
        );
        const newNotesCount = utilities.getLengthOfObject(this.props.newNotes);
        const newPhotosCount = utilities.getLengthOfObject(
            this.props.newPhotos
        );
        const newVoiceNotesCount = utilities.getLengthOfObject(
            this.props.newVoiceNotes
        );

        const cancelModal = this.state.showCancelModal && (
            <ActionModal
                title="Are you sure you want to exit without saving your idea?"
                subtitle="You will lose all the data you added."
                handleLeftIconPress={this.cancelNewIdea}
                handleRightIconPress={this.toggleCancelModal}
            />
        );

        return (
            <Page removeBottomPadding>
                <Header
                    headerShadow
                    text="Add an Idea"
                    closeButton
                    handleLeftIconPress={
                        enableContinueButton ? (
                            this.toggleCancelModal
                        ) : (
                            this.cancelNewIdea
                        )
                    }
                    continueButton={enableContinueButton}
                    handleRightIconPress={this.saveNewIdea}
                />

                <InputContainer style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="WHAT'S THE BIG IDEA?"
                        value={this.state.newIdeaTitle}
                        handleChange={this.updateNewIdeaTitle}
                        maxLength={16}
                    />

                    <Input
                        placeholder="ENTER YOUR DESCRIPTION HERE"
                        value={this.state.newIdeaDescription}
                        handleChange={this.updateNewIdeaDescription}
                        multiline
                    />

                    <RadioSelect
                        displayText="SELECT A PRIORITY"
                        currentValue={this.state.newIdeaPriority}
                        values={priorities}
                        handleSelect={this.selectPriority}
                    />

                    <DropdownButton
                        displayText="SELECT A CATEGORY"
                        currentValue={this.state.newIdeaCategory}
                        values={categories}
                        handleSelect={this.selectCategory}
                        buttonBackgroundColor={styleConstants.primary}
                        pushContent
                    />
                </InputContainer>

                <TabBar
                    backgroundColor={styleConstants.white}
                    color={styleConstants.primary}
                    tabs={[
                        {
                            title: 'Note',
                            icon: 'note',
                            action: () =>
                                Actions.notes({
                                    idea: {
                                        title: this.state.newIdeaTitle,
                                        description: this.state
                                            .newIdeaDescription,
                                    },
                                    addIdea: true,
                                }),
                            count: newNotesCount,
                            disabled: !this.state.newIdeaTitle,
                        },
                        {
                            title: 'Photo',
                            icon: 'camera',
                            action: () =>
                                Actions.photos({
                                    idea: {
                                        title: this.state.newIdeaTitle,
                                        description: this.state
                                            .newIdeaDescription,
                                    },
                                    addIdea: true,
                                }),
                            count: newPhotosCount,
                            disabled: !this.state.newIdeaTitle,
                        },
                        {
                            title: 'Voice Note',
                            icon: 'voice',
                            action: () =>
                                Actions.voiceNotes({
                                    idea: {
                                        title: this.state.newIdeaTitle,
                                        description: this.state
                                            .newIdeaDescription,
                                    },
                                    addIdea: true,
                                }),
                            count: newVoiceNotesCount,
                            disabled: !this.state.newIdeaTitle,
                        },
                    ]}
                />

                {cancelModal}

                <SnackBar />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.main.userData.ideas,
        newNotes: state.main.appData.newNotes,
        newPhotos: state.main.appData.newPhotos,
        newVoiceNotes: state.main.appData.newVoiceNotes,
        categories: state.main.userData.categories,
        priorities: state.main.appData.priorities,
        uid: state.main.userAuth.uid,
    };
}

export default connect(mapStateToProps)(AddIdea);
