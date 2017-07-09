import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from "react-native";
import { Player } from 'react-native-audio-toolkit'; 

import config from '../config';
import utilities from '../utilities';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import Counter from './Counter';

const styles = StyleSheet.create({
    voiceNoteContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    voiceNoteIconContainer: {

    },
    voiceNoteIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
    voiceNoteDurationTextContainer: {
        marginLeft: 8,
    },
    voiceNoteProgressContainer: {
        flex: 1,
        marginHorizontal: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    voiceNoteProgressMarker: {
        position: 'absolute',
        top: 4.5,
        backgroundColor: styleConstants.primary,
        width: 16,
        height: 16,
        borderRadius: 8,
        zIndex: 1,
    },
    voiceNoteProgressTrack: {
        height: 2,
        backgroundColor: styleConstants.lightGrey,
    },
});

export default class VoiceNotePlayer extends React.Component {
    constructor(props) {
        super(props);

        this.reloadPlayer = this.reloadPlayer.bind(this);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.translateProgressMarker = this.translateProgressMarker.bind(this);

        this.animationDuration = config.animation.duration.short;
        this.player;

        this.state = {
            progressTrackLength: null,
            currentTranslateAmount: 0,
            translateAmountPerCycle: null,
            animatedValue: new Animated.Value(0),
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

        this.refs.progressTrack.measure((a, b, c, d, e, width) => {
            const progressTrackLength = width - 8;
            const translateAmountPerCycle = (progressTrackLength * this.animationDuration) / (this.state.duration * 1000);

            this.setState({
                progressTrackLength,
                translateAmountPerCycle,
            });
        });
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

        // 0 => Play
        if (!this.state.isPlaying && !this.state.isPaused) {
            this.setState({
                isPlaying: true,
                isPaused: false,
            });

            this.translateProgressMarker();
        }

        // Play => Pause
        else if (this.state.isPlaying) {
            this.setState({
                isPlaying: false,
                isPaused: true,
            });
        }

        // Pause => Play
        else if (this.state.isPaused) {
            this.setState({
                isPlaying: true,
                isPaused: false,
            });

            this.translateProgressMarker();
        }

        this.player.playPause((error, paused) => {

            // Do  nothing
        });
    }

    translateProgressMarker() {
        let nextTranslateAmount = this.state.currentTranslateAmount + this.state.translateAmountPerCycle;

        Animated.timing(
            this.state.animatedValue,
            {
                toValue: nextTranslateAmount,
                duration: this.animationDuration,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start(() => {

            // 0/Paused => Play
            if (this.state.isPlaying && nextTranslateAmount <= this.state.progressTrackLength) {
                this.setState({
                    currentTranslateAmount: nextTranslateAmount,
                });

                this.translateProgressMarker();
            }

            // Play => Paused
            else if (this.state.isPaused) {
                // do nothing
            }

            // Stopped
            else {
                this.setState({
                    currentTranslateAmount: 0,
                });
            }
        });
    }

    render() {
        const iconName = this.state.isPlaying ? 'pause' : 'play';
        const progressMarkerStyles = {
            transform: [
                { translateX: this.state.currentTranslateAmount},
            ],
        }

        return (
            <View style={styles.voiceNoteContainer}>
                <Touchable
                    onPress={this.togglePlayback}
                    style={styles.voiceNoteIconContainer}>
                    <Icon
                        name={iconName}
                        style={styles.voiceNoteIcon} />
                </Touchable>
                <View style={styles.voiceNoteDurationTextContainer}>
                    <Counter
                        displayDuration={this.state.duration}
                        totalDuration={this.state.duration}
                        startTimer={this.state.isPlaying}
                        pauseTimer={this.state.isPaused} />
                </View>
                <View style={styles.voiceNoteProgressContainer}>
                    <Animated.View style={[styles.voiceNoteProgressMarker, progressMarkerStyles]} />
                    <View  
                        ref='progressTrack'
                        onLayout={() => null} 
                        style={styles.voiceNoteProgressTrack} />
                </View>
            </View>
        );
    }
}