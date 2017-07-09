import React from "react";
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
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

export class VoiceNotes extends React.Component {
    constructor(props) {
        super(props);

        this.updateVoiceNotes = this.updateVoiceNotes.bind(this);

        this.state = {
            voiceNotes: [],
        }
    }


    static get propTypes() {
        return {

        };
    }

    updateVoiceNotes(newVoiceNoteFilePath) {
        let newVoiceNotes = this.state.voiceNotes;
        const newVoiceNote = {
            filePath: newVoiceNoteFilePath,
        }
        newVoiceNotes.push(newVoiceNote);
        this.setState({
            voiceNotes: newVoiceNotes,
        });  
    }

    render() {
        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding>

                <Header
                    headerShadow
                    closeButton
                    continueButton
                    text='VoiceNotes'
                    handleRightIconPress={null} />

                <NoteCard
                    idea={this.props.idea}
                    handleRecord={this.updateVoiceNotes}
                    handlePlay={this.togglePlayback}
                    voiceNotes={this.state.voiceNotes} />

                <SnackBar />

                <Loader
                    position='bottom' />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({

    });
}

export default connect(mapStateToProps)(VoiceNotes);