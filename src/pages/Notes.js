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
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

export class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.updateNewNote = this.updateNewNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.saveNotes = this.saveNotes.bind(this);

        this.state = {
            newNote: null,
            notes: [],
            showDeleteModal: false,
            modalTitle: null,
        }
    }

    static get propTypes() {
        return {
            idea: React.PropTypes.object,

            newNotes: React.PropTypes.object,
            ideas: React.PropTypes.object,
            uid: React.PropTypes.string,
            addIdea: React.PropTypes.bool,
            currentAction: React.PropTypes.string,
            cloudDataSuccess: React.PropTypes.bool,
            hasNetwork: React.PropTypes.bool,
        };
    }

    componentDidMount() {
        if (this.props.newNotes || this.props.idea) {
            const newNotes = this.props.newNotes ? this.props.newNotes : this.props.idea.notes;
            const newNotesArray = utilities.convertObjectArrayToArray(newNotes);
            
            this.setState({
                notes: newNotesArray,
            });
        }
    }

    componentDidUpdate() {
        if (this.props.currentAction === 'saveNotes' && this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS'
            });

            Actions.pop();
        }
    }

    updateNewNote(value) {
        this.setState({
            newNote: value
        });
    }

    addNote() {
        let newNotes = this.state.notes;

        const newNote = {
            title: this.state.newNote,
            uid: utilities.createUID(),
        };

        newNotes.push(newNote);

        this.setState({
            notes: newNotes,
            newNote: null,
        });
    }

    toggleDeleteModal(value) {
        if (value && value.title) {
            this.setState({
                showDeleteModal: true,
                modalTitle: value.title,
            });
        }
        else {
            this.setState({
                showDeleteModal: false,
                modalTitle: null,
            });
        }
    }

    deleteNote(value) {
        let newNotes = utilities.deleteObjectWithKeyValuePairFromArray({title: value}, this.state.notes);

        this.setState({
            notes: newNotes,
        }); 

        this.toggleDeleteModal();
    }

    saveNotes() {
        const newNotes = utilities.convertArrayToObjectArray(this.state.notes);

        // We are editing an idea's notes
        if (this.props.addIdea) {
            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });

            Actions.pop();
        }

        // Otherwise we came from the addIdea page
        else {
            let newIdea = this.props.idea;
            newIdea['notes'] = newNotes;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            this.props.dispatch({
                type: 'saveUserData',
                node: 'ideas',
                uid: this.props.uid,
                userData: newIdeas,
                currentAction: 'saveNotes',
                hasNetwork: this.props.hasNetwork,
            });
        }
    }

    render() {
        const enableAddNoteButton = this.state.newNote && this.state.newNote;

        const deleteModal = this.state.showDeleteModal ?
            <ActionModal
                title='Are you sure you want to delete this note?'
                subtitle={this.state.modalTitle}
                handleLeftIconPress={() => this.deleteNote(this.state.modalTitle)}
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
                    continueButton
                    showInput
                    inputValue={this.state.newNote}
                    inputPlaceholderText="Add a New Note"
                    handleChangeText={this.updateNewNote}
                    handleRightIconPress={this.saveNotes} />
                  
                <NoteCard
                    idea={this.props.idea}
                    notes={this.state.notes}
                    handleDelete={this.toggleDeleteModal}
                    handleAdd={this.addNote}
                    disabled={!enableAddNoteButton} />

                {deleteModal}

                <SnackBar />

                <Loader 
                    position='bottom'/>

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        newNotes: state.main.appData.newNotes,
        ideas: state.main.userData.ideas,
        uid: state.main.auth.uid,
        currentAction: state.main.app.currentAction,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(Notes);