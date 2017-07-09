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
            newVoiceNote: {
                filePath: null,
                initialDuration: null, // used to calculate duration of recording
            },
            isPlaying: false,
        }
    }


    static get propTypes() {
        return {

        };
    }

    componentDidMount() {
        this.reloadRecorder();
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

    toggleRecording() {
        const time = Date.now();

        this.recorder.toggleRecord((error, stopped) => {
            if (error) {
                console.log(error);
            }

            // Stop recording
            if (stopped) {
                let newVoiceNotes = this.state.voiceNotes;
                const duration = Math.floor((time - this.state.newVoiceNote.initialDuration) / 1000);
                let newVoiceNote = {
                    filePath: this.state.newVoiceNote.filePath,
                    duration
                };

                newVoiceNotes.push(newVoiceNote);
                this.setState({
                    voiceNotes: newVoiceNotes,
                    newVoiceNote: {
                        filePath: null,
                        initialDuration: null,
                    },
                });

                this.reloadRecorder();
            }

            // Start recording
            else {
                let newVoiceNote = this.state.newVoiceNote;
                newVoiceNote.initialDuration = time;
                this.setState({
                    newVoiceNote
                });
            }
        }).prepare((error, path) => {
            this.setState({
                newVoiceNote: {
                    filePath: path,
                }
            });
        });
    }

    togglePlayback(filePath) {
        this.setState({
            isPlaying: !this.state.isPlaying,
        });
        // console.log('Playing')

        // const fileName = utilities.getFileName(filePath);
        // console.log('Attempting to play:', fileName)

        // if (this.player) {
        //     this.player.destroy();
        // }

        // this.player = new Player(
        //     fileName, // BUG: does not work with fileName, filePath or URI
        //     {
        //         autoDestroy: false
        //     }
        // ).prepare((error) => {
        //     if (error) {
        //         console.log('Prepare Player:', error.err);
        //     }
        //     else {

        //         // Start playing the file once prepare has completed
        //         this.player.playPause((error, playing) => {
        //             if (error) {
        //                 console.log('Play Pause:', error.err);
        //             }

        //             // Playing
        //             else if (playing) {
        //                 this.setState({
        //                     isPlaying: !this.state.isPlaying,
        //                 });
        //                 console.log('Playing')
        //             }

        //             // Paused
        //             else {
        //                 console.log('Paused')
        //             }
        //         });
        //     }
        // });

        // this.player.on('ended')
        // this.player.on('pause')
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
                    text='Voice Notes'
                    handleRightIconPress={null} />

                <NoteCard
                    idea={this.props.idea}
                    voiceNotes={this.state.voiceNotes}
                    handleAdd={this.recordAudio}
                    handleRecord={this.toggleRecording}
                    handlePlay={this.togglePlayback}
                    isPlaying={this.state.isPlaying}
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