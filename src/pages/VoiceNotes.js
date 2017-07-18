import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Recorder } from 'react-native-audio-toolkit';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import ActionModal from '../modals/ActionModal';
import SnackBar from '../components/SnackBar';

export class VoiceNotes extends React.Component {
    constructor(props) {
        super(props);

        this.addNewVoiceNote = this.addNewVoiceNote.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deleteVoiceNote = this.deleteVoiceNote.bind(this);

        this.state = {
            showDeleteModal: false,
            deleteVoiceNoteUID: null,
        }
    }

    static get propTypes() {
        return {
            idea: PropTypes.object,
            addIdea: PropTypes.bool,

            newVoiceNotes: PropTypes.object,
            ideas: PropTypes.object,
            uid: PropTypes.string,
            hasNetwork: PropTypes.bool,
        };
    }

    componentDidMount() {

        // If our idea has voiceNotes or newVoiceNotes were passed in as props from add/edit idea pages
        if (this.props.idea.voiceNotes || this.props.newVoiceNotes) {
            const newVoiceNotes = this.props.idea.voiceNotes ? this.props.idea.voiceNotes : this.props.newVoiceNotes;

            this.props.dispatch({
                type: 'SET_NEW_VOICE_NOTES',
                newVoiceNotes,
            });
        }
    }

    componentWillUnmount() {
        if (!this.props.addIdea) {
            this.props.dispatch({
                type: 'CLEAR_NEW_VOICE_NOTES',
            });
        }
    }

    addNewVoiceNote(newVoiceNoteFilePath) {
        const newVoiceNote = {
            uid: utilities.createUID(),
            filePath: newVoiceNoteFilePath,
        }

        const newVoiceNotes = utilities.pushObjectToObjectArray(newVoiceNote, this.props.newVoiceNotes);

        this.props.dispatch({
            type: 'SET_NEW_VOICE_NOTES',
            newVoiceNotes,
        });

        if (!this.props.addIdea) {
            let newIdea = utilities.cloneObject(this.props.idea);
            newIdea['voiceNotes'] = newVoiceNotes;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

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
                hasNetwork: this.props.hasNetwork,
            });
        }
    }

    toggleDeleteModal(voiceNote) {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteVoiceNoteUID: voiceNote && voiceNote.uid, // will be null if closed
        });
    }

    deleteVoiceNote() {
        const newVoiceNotes = utilities.removeObjectFromObjectArray(this.state.deleteVoiceNoteUID, this.props.newVoiceNotes);

        this.props.dispatch({
            type: 'SET_NEW_VOICE_NOTES',
            newVoiceNotes,
        });

        if (!this.props.addIdea) {
            let newIdea = utilities.cloneObject(this.props.idea);
            newIdea['voiceNotes'] = newVoiceNotes;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            // Dispatch to store
            this.props.dispatch({
                type: 'UPDATE_USER_DATA',
                node: 'ideas',
                userData: newIdeas,
            });

            // Dispatch to db
            this.props.dispatch({
                type: 'deleteUserData',
                node: 'ideas/' + this.props.idea.uid + '/voiceNotes/' + this.state.deleteVoiceNoteUID,
                uid: this.props.uid,
                hasNetwork: this.props.hasNetwork,
            });
        }

        this.toggleDeleteModal();
    }

    render() {
        const voiceNotesArray = utilities.convertObjectArrayToArray(this.props.newVoiceNotes);

        const deleteModal = this.state.showDeleteModal ?
            <ActionModal
                title='Are you sure you want to delete this Voice Note?'
                handleLeftIconPress={this.deleteVoiceNote}
                handleRightIconPress={this.toggleDeleteModal} />
            :
            null;

        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding>

                <Header
                    headerShadow
                    backButton
                    text='Voice Notes' />

                <NoteCard
                    idea={this.props.idea}
                    type='voiceNotes'
                    voiceNotes={voiceNotesArray}
                    displayInfo
                    handleRecord={this.addNewVoiceNote}
                    handlePlay={this.togglePlayback}
                    handleDelete={this.toggleDeleteModal} />

                {deleteModal}

                <SnackBar />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        newVoiceNotes: state.main.appData.newVoiceNotes,
        ideas: state.main.userData.ideas,
        uid: state.main.auth.uid,
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(VoiceNotes);