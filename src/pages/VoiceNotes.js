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
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

export class VoiceNotes extends React.Component {
    constructor(props) {
        super(props);

        this.addNewVoiceNote = this.addNewVoiceNote.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deleteVoiceNote = this.deleteVoiceNote.bind(this);
        this.saveVoiceNotes = this.saveVoiceNotes.bind(this);

        this.state = {
            voiceNotes: [],
            showDeleteModal: false,
            deleteVoiceNoteUID: null,
        }
    }

    static get propTypes() {
        return {
            idea: PropTypes.object,

            newVoiceNotes: PropTypes.object,
            ideas: PropTypes.object,
            uid: PropTypes.string,
            addIdea: PropTypes.bool,
            currentAction: PropTypes.string,
            cloudDataSuccess: PropTypes.bool,
            hasNetwork: PropTypes.bool,
        };
    }

    componentDidMount() {
        if (this.props.newVoiceNotes || this.props.idea) {
            const newVoiceNotes = this.props.newVoiceNotes ? this.props.newVoiceNotes : this.props.idea.voiceNotes;
            const newVoiceNotesArray = utilities.convertObjectArrayToArray(newVoiceNotes);
            
            this.setState({
                voiceNotes: newVoiceNotesArray,
            });
        }
    }

    componentDidUpdate() {
        if (this.props.currentAction === 'saveVoiceNotes' && this.props.cloudDataSuccess) {
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

    addNewVoiceNote(newVoiceNoteFilePath) {
        let newVoiceNotes = this.state.voiceNotes;
        const newVoiceNote = {
            uid: utilities.createUID(),
            filePath: newVoiceNoteFilePath,
        }
        newVoiceNotes.push(newVoiceNote);
        this.setState({
            voiceNotes: newVoiceNotes,
        });  
    }

    toggleDeleteModal(value) {
        if (value) {
            this.setState({
                showDeleteModal: true,
                deleteVoiceNoteUID: value,
            });
        }
        else {
            this.setState({
                showDeleteModal: false,
                deleteVoiceNoteUID: null,
            });
        }
    }

    deleteVoiceNote(value) {
        let newVoiceNotes = utilities.deleteObjectWithKeyValuePairFromArray({uid: value}, this.state.voiceNotes);

        this.setState({
            voiceNotes: newVoiceNotes,
        }); 

        this.toggleDeleteModal();
    }

    saveVoiceNotes() {
        const newVoiceNotes = utilities.convertArrayToObjectArray(this.state.voiceNotes);

        // Adding an idea
        if (this.props.addIdea) {
            this.props.dispatch({
                type: 'SET_NEW_VOICE_NOTES',
                newVoiceNotes,
            });

            Actions.pop();
        }

        // Editing an idea
        else {
            let newIdea = this.props.idea;
            newIdea['voiceNotes'] = newVoiceNotes;
            console.log(newIdea)
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            this.props.dispatch({
                type: 'saveUserData',
                node: 'ideas',
                uid: this.props.uid,
                userData: newIdeas,
                currentAction: 'saveVoiceNotes',
                hasNetwork: this.props.hasNetwork,
            });
        }
    }

    render() {
        const deleteModal = this.state.showDeleteModal ?
            <ActionModal
                title='Are you sure you want to delete this Voice Note?'
                handleLeftIconPress={() => this.deleteVoiceNote(this.state.deleteVoiceNoteUID)}
                handleRightIconPress={this.toggleDeleteModal} />
            :
            null;

        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding>

                <Header
                    headerShadow
                    closeButton
                    handleLeftIconPress={() => Actions.pop()}
                    continueButton
                    text='Voice Notes'
                    handleRightIconPress={this.saveVoiceNotes} />

                <NoteCard
                    idea={this.props.idea}
                    type='voiceNotes'
                    voiceNotes={this.state.voiceNotes} 
                    displayInfo
                    handleRecord={this.addNewVoiceNote}
                    handlePlay={this.togglePlayback}
                    handleDelete={this.toggleDeleteModal} />

                {deleteModal}

                <SnackBar />

                <Loader
                    position='bottom' />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        newVoiceNotes: state.main.appData.newVoiceNotes,
        ideas: state.main.userData.ideas,        
        uid: state.main.auth.uid,
        currentAction: state.main.app.currentAction,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(VoiceNotes);