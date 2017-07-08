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

        this.filePath = 'IdeaMe-' + utilities.createUID() + '.mp4';
        this.recorder;
        this.player;

        this.state = {
            voiceNotes: [],
        }
    }


    static get propTypes() {
        return {

        };
    }

    componentDidMount() {
        this.reloadRecorder();
        this.reloadPlayer();
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

        this.recorder = new Recorder(
            this.filePath,
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
            console.log('Playback toggling');
            if (error) {
                console.log(error);
            }
            if (playing) {
                console.log('Playing')
            }
        });
    }

    toggleRecording() {
        this.recorder.toggleRecord((error, stopped) => {
            console.log('Recording toggling');
            if (error) {
                console.log(error);
            }
            if (stopped) {
                console.log('Recording stopped');
                this.reloadRecorder();
            }
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
                    voiceNotes={this.state.voiceNotes} />

                <TouchableOpacity
                    onPress={this.toggleRecording}
                    style={{ paddingVertical: 16 }}>
                    <Text>Record</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.togglePlayback}
                    style={{ paddingVertical: 16 }}>
                    <Text>Play</Text>
                </TouchableOpacity>

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