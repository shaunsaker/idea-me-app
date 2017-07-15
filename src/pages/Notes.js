import React from "react";
import PropTypes from 'prop-types';
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
import SnackBar from '../components/SnackBar';

export class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.updateNewNote = this.updateNewNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            newNote: null,
            showDeleteModal: false,
            deleteNoteModalTitle: null,
            deleteNoteUID: null,
        }
    }

    static get propTypes() {
        return {
            idea: PropTypes.object, // idea indicates on idea notes
            addIdea: PropTypes.bool, // flag indicating add/edit idea page notes
            newNotes: PropTypes.object,
            ideas: PropTypes.object,
            uid: PropTypes.string,
            cloudDataSuccess: PropTypes.bool,
            hasNetwork: PropTypes.bool,
        };
    }

    componentDidMount() {

        // If our idea has notes or newNotes were passed in as props from add/edit idea pages
        if (this.props.idea.notes || this.props.newNotes) {
            const newNotes = this.props.idea.notes ? this.props.idea.notes : this.props.newNotes;

            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });  
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'CLEAR_ALL_NOTES',
        });
    }

    updateNewNote(value) {
        this.setState({
            newNote: value
        });
    }

    addNote() {
        const newNote = {
            title: this.state.newNote,
            uid: utilities.createUID(),
        };

        // If add/edit idea => update newNotes in store
        if (this.props.addIdea) {
            const newNotes = utilities.pushObjectToObjectArray(newNote, this.props.newNotes);

            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });
        }

        // Else (onIdea) => update ideas notes and save ideas to db
        else {
            let newIdea = this.props.idea;
            let newNotes = newIdea['notes'];
            newNotes = utilities.pushObjectToObjectArray(newNote, newNotes);
            newIdea['notes'] = newNotes;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });

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

        this.setState({
            newNote: null,
        });
    }

    toggleDeleteModal(note) {
        if (note && note.title) {
            this.setState({
                showDeleteModal: true,
                deleteNoteModalTitle: note.title,
                deleteNoteUID: note.uid,
            });
        }
        else {
            this.setState({
                showDeleteModal: false,
                deleteNoteModalTitle: null,
                deleteNoteUID: null,
            });
        }
    }

    deleteNote() {

        // If addIdea prop => remove from this.props.newNotes
        if (this.props.addIdea) {
            const newNotes = utilities.removeObjectFromObjectArray(this.state.deleteNoteUID, this.props.newNotes);

            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });
        }

        // Else (onIdea) => delete from idea and call deleteUserData
        else {
            let newIdea = this.props.idea;
            let newNotes = newIdea['notes'];
            newNotes = utilities.removeObjectFromObjectArray(this.state.deleteNoteUID, newNotes);
            newIdea['notes'] = newNotes;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            // Set new notes so we can view them
            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });

            // Dispatch to store
            this.props.dispatch({
                type: 'UPDATE_USER_DATA',
                node: 'ideas',
                userData: newIdeas,
            });

            // Dispatch to db
            this.props.dispatch({
                type: 'deleteUserData',
                node: 'ideas/' + this.props.idea.uid + '/notes/' + this.state.deleteNoteUID,
                uid: this.props.uid,
                hasNetwork: this.props.hasNetwork,
            });
        }

        this.toggleDeleteModal();
    }

    render() {
        const notesArray = utilities.convertObjectArrayToArray(this.props.newNotes);

        const deleteModal = this.state.showDeleteModal ?
            <ActionModal
                title='Are you sure you want to delete this note?'
                subtitle={this.state.deleteNoteModalTitle}
                handleLeftIconPress={this.deleteNote}
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
                    text='Notes' />

                <NoteCard
                    idea={this.props.idea}
                    type='notes'
                    notes={notesArray}
                    displayInfo
                    handleDelete={this.toggleDeleteModal}
                    handleAdd={this.addNote}
                    inputValue={this.state.newNote}
                    handleChangeText={this.updateNewNote} />

                {deleteModal}

                <SnackBar />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        newNotes: state.main.appData.newNotes,
        ideas: state.main.userData.ideas,
        uid: state.main.auth.uid,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(Notes);