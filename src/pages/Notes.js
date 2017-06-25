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
        this.addNotes = this.addNotes.bind(this);

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
        if (this.props.newNotes || this.props.idea) {
            const newNotes = this.props.newNotes ? this.props.newNotes : this.props.idea.notes;
            const newNotesArray = utilities.convertObjectArrayToArray(newNotes);
            
            this.setState({
                notes: newNotesArray,
            });
        }
    }

    componentDidUpdate() {
        if (this.props.currentAction === 'addNotes' && this.props.cloudDataSuccess) {
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

    addNotes() {
        const newNotes = utilities.convertArrayToObjectArray(this.state.notes);

        // We are editing an idea's notes
        if (this.props.idea) {
            let newIdea = this.props.idea;
            newIdea['notes'] = newNotes;
            const newIdeas = utilities.updateObjectInObjectArray(this.props.idea.uid, newIdea, this.props.ideas);

            this.props.dispatch({
                type: 'saveUserData',
                node: 'ideas',
                uid: this.props.uid,
                userData: newIdeas,
                currentAction: 'addNotes',
                hasNetwork: this.props.hasNetwork,
            });
        }

        // Otherwise we came from the addIdea page
        else {
            this.props.dispatch({
                type: 'SET_NEW_NOTES',
                newNotes,
            });

            Actions.pop();
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
            <Page>
                
                <Header 
                    headerShadow
                    backgroundColor={styleConstants.white}
                    textColor={styleConstants.primary}
                    closeButton
                    continueButton
                    handleRightIconPress={this.addNotes}
                    text='Notes' />

                <InputContainer>

                    <Input
                        placeholder="ENTER YOUR NEW NOTE HERE"
                        value={this.state.newNote}
                        handleChange={this.updateNewNote}
                        multiline />

                    <InfoBlock
                        title={this.props.idea.title}
                        titleColor={styleConstants.white}
                        subtitle={this.props.idea.description}
                        subtitleColor={styleConstants.lightGrey}
                        fullWidth />

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
        ideas: state.main.userData.ideas,
        uid: state.main.auth.uid,
        currentAction: state.main.app.currentAction,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
        hasNetwork: state.main.app.hasNetwork,
    });
}

export default connect(mapStateToProps)(Notes);