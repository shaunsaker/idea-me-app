import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
} from "react-native";
import { Player } from 'react-native-audio-toolkit';

import config from '../config';
import utilities from '../utilities';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import Touchable from './Touchable';
import Counter from './Counter';

const styles = StyleSheet.create({
    voiceNoteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.lightGrey,
        borderRadius: 8,
        elevation: 3,
    },
    voiceNoteIconContainer: {

    },
    voiceNoteIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
    voiceNoteDurationTextContainer: {

    },
});

export default class VoiceNotePlayer extends React.Component {
    constructor(props) {
        super(props);

        this.reloadPlayer = this.reloadPlayer.bind(this);
        this.togglePlayback = this.togglePlayback.bind(this);

        this.player;

        this.state = {
            isPlaying: false,
            isPaused: false,
            duration: null,
        }
    }

    static get propTypes() {
        return {
            voiceNote: PropTypes.object.isRequired,
        }
    }

    componentDidMount() {
        this.reloadPlayer();
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.destroy();
        }
    }

    reloadPlayer() {
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(
            utilities.getFileName(this.props.voiceNote.filePath),
            {
                autoDestroy: false
            }
        ).prepare(() => {
            this.setState({
                duration: this.player.duration / 1000,
            });
        });

        this.player.on('ended', () => {
            this.setState({
                isPlaying: false,
                isPaused: false,
            });
        });
    }

    togglePlayback() {

        // 0 => Play || Pause => Play
        if ((!this.state.isPlaying && !this.state.isPaused) || this.state.isPaused) {
            this.setState({
                isPlaying: true,
                isPaused: false,
            });
        }

        // Play => Pause
        else if (this.state.isPlaying) {
            this.setState({
                isPlaying: false,
                isPaused: true,
            });
        }

        this.player.playPause((error, paused) => {

            // Do  nothing
        });
    }

    render() {
        const containerStyles = this.state.isPlaying && {
            backgroundColor: 'transparent',
        }

        const iconName = this.state.isPlaying ? 'pause' : 'play';

        return (
            <Touchable
                onPress={this.togglePlayback}
                style={[styles.voiceNoteContainer, containerStyles]} >
                <View style={styles.voiceNoteIconContainer}>
                    <Icon
                        name={iconName}
                        style={styles.voiceNoteIcon} />
                </View>
                <View style={styles.voiceNoteDurationTextContainer}>
                    <Counter
                        displayDuration={this.state.duration}
                        totalDuration={this.state.duration}
                        startTimer={this.state.isPlaying}
                        pauseTimer={this.state.isPaused} />
                </View>
            </Touchable>
        );
    }
}