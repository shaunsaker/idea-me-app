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
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import InfoBlock from '../components/InfoBlock';
import BulletList from '../components/BulletList';
import Button from '../components/Button';
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
        this.submitNotes = this.submitNotes.bind(this);

        this.state = {
            newNote: null,
            notes: [],
            showDeleteModal: false,
            modalTitle: null,
        }
    }

    static get propTypes() {
        return {
            newNotes: React.PropTypes.object,
        };
    }

    componentDidMount() {
        if (this.props.newNotes) {
            const newNotesArray = utilities.convertObjectArrayToArray(this.props.newNotes);
            
            this.setState({
                notes: newNotesArray,
            });
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

    submitNotes() {
        const newNotes = utilities.convertArrayToObjectArray(this.state.notes);

        this.props.dispatch({
            type: 'SET_NEW_NOTES',
            newNotes,
        });

        Actions.pop();
    }

    render() {
        const enableAddNoteButton = this.state.newNote && this.state.newNote;

        const deleteModal = this.state.showDeleteModal ?
            <ActionModal
                title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
                handleLeftIconPress={() => this.deleteNote(this.state.modalTitle)}
                handleRightIconPress={this.toggleDeleteModal} />
            :
            null;

        return (
            <Page>
                
                <Header 
                    headerShadow
                    closeButton
                    continueButton
                    handleRightIconPress={this.submitNotes}
                    text='Notes' />

                <InputContainer>

                    <Input
                        placeholder="ENTER YOUR NEW NOTE HERE"
                        value={this.state.newNote}
                        handleChange={this.updateNewNote}
                        multiline />

                    <InfoBlock
                        title='Test'
                        titleColor={styleConstants.white}
                        subtitle='Description'
                        subtitleColor={styleConstants.lightGrey} />

                    <BulletList 
                        title='CURRENT NOTES:'
                        values={this.state.notes}
                        handleDelete={this.toggleDeleteModal} />

                </InputContainer>

                <Button 
                    handlePress={this.addNote}
                    text='Add Note'
                    iconName='check'
                    backgroundColor={styleConstants.white}
                    disabled={!enableAddNoteButton}/>

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
    });
}

export default connect(mapStateToProps)(Notes);