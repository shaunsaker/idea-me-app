import React from "react";
import {
    View,
    Text,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import { AudioRecorder } from 'react-native-audio';

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

        this.recordAudio = this.recordAudio.bind(this);

        this.state = {
            voiceNotes: [],
        }
    }


    static get propTypes() {
        return {

        };
    }

    recordAudio() {
        const path = '/data/user/0/com.ideaMeApp/files';


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
                    handleAdd={this.recordAudio}
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