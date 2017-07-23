import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import ActionModal from '../modals/ActionModal';
import SnackBar from '../widgets/SnackBar';

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
        if (!this.props.addIdea) {
            this.props.dispatch({
                type: 'CLEAR_NEW_NOTES',
            });
        }
    }

    updateNewNote(value) {
        this.setState({
            newNote: value
        });
    }

    addNote() {
        const newNote = {
            title: utilities.prettifyString(this.state.newNote),
            uid: utilities.createUID(),
        };

        const newNotes = utilities.pushObjectToObjectArray(newNote, this.props.newNotes);

        this.props.dispatch({
            type: 'SET_NEW_NOTES',
            newNotes,
        });

        if (!this.props.addIdea) {
            let newIdea = utilities.cloneObject(this.props.idea);
            newIdea['notes'] = newNotes;
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

        this.updateNewNote('');
    }

    toggleDeleteModal(note) {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteNoteModalTitle: note && note.title, // will be null if closed
            deleteNoteUID: note && note.uid, // will be null if closed
        });
    }

    deleteNote() {
        const newNotes = utilities.removeObjectFromObjectArray(this.state.deleteNoteUID, this.props.newNotes);

        this.props.dispatch({
            type: 'SET_NEW_NOTES',
            newNotes,
        });

        if (!this.props.addIdea) {
            let newIdea = utilities.cloneObject(this.props.idea);
            newIdea['notes'] = newNotes;
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
                node: 'ideas/' + this.props.idea.uid + '/notes/' + this.state.deleteNoteUID,
                uid: this.props.uid,
                hasNetwork: this.props.hasNetwork,
            });
        }

        this.toggleDeleteModal();
    }

    render() {
        const notesArray = utilities.convertObjectArrayToArray(this.props.newNotes);

        const deleteModal = this.state.showDeleteModal &&
            <ActionModal
                title='Are you sure you want to delete this note?'
                subtitle={this.state.deleteNoteModalTitle}
                handleLeftIconPress={this.deleteNote}
                handleRightIconPress={this.toggleDeleteModal} />;

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
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(Notes);