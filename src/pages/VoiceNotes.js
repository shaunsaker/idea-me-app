import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    Player,
    Recorder
} from 'react-native-audio-toolkit';

import config from '../config';
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

        this.reloadRecorder = this.reloadRecorder.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
        this.togglePlayback = this.togglePlayback.bind(this);

        this.recorder;
        this.player;

        this.state = {
            voiceNotes: [],
            newVoiceNote: null,
        }
    }


    static get propTypes() {
        return {

        };
    }

    componentDidMount() {
        this.reloadRecorder();
        // this.reloadPlayer();
    }

    reloadPlayer() {
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(
            this.filePath,
            {
                autoDestroy: false
            }
        );
    }

    reloadRecorder() {
        if (this.recorder) {
            this.recorder.destroy();
        }

        const newFileName = 'IdeaMe-' + utilities.createUID() + '.' + config.voiceNotes.format;

        this.recorder = new Recorder(
            newFileName,
            {
                bitrate: 256000,
                channels: 2,
                sampleRate: 44100,
                quality: 'max',
                //format: 'ac3', // autodetected from path
                //encoder: 'aac', // autodetected from path
            }
        );
    }

    togglePlayback() {
        this.player.playPause((error, playing) => {
            if (error) {
                console.log(error);
            }
            if (playing) {
                // do nothing
            }
        });
    }

    toggleRecording() {
        this.recorder.toggleRecord((error, stopped) => {
            if (error) {
                console.log(error);
            }
            if (stopped) {
                let newVoiceNotes = this.state.voiceNotes;
                newVoiceNotes.push(this.state.newVoiceNote);
                this.setState({
                    voiceNotes: newVoiceNotes,
                    newVoiceNote: null,
                });

                this.reloadRecorder();
            }
        }).prepare((error, path) => {
            this.setState({
                newVoiceNote: path,
            });
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
                    handleAdd={this.recordAudio}
                    voiceNotes={this.state.voiceNotes}
                    handleRecord={this.toggleRecording}
                    handlePlay={this.togglePlayback}
                    handleDelete={null} />

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