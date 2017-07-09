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

import config from '../config';
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

        this.animationDuration = config.animation.duration.short;

        this.state = {
            progressTrackLength: null,
            currentTranslateAmount: 0,
            translateAmountPerCycle: null,
            animatedValue: new Animated.Value(0),
        }
    }

    static get propTypes() {
        return {
            voiceNote: PropTypes.object.isRequired,
            handlePlay: PropTypes.func.isRequired,
            isPlaying: PropTypes.bool, 
        }
    }

    componentDidMount() {
        this.refs.progressTrack.measure((a, b, c, d, e, width) => {
            const progressTrackLength = width - 70;
            const translateAmountPerCycle = (progressTrackLength * this.animationDuration) / (this.props.voiceNote.duration * 1000);

            this.setState({
                progressTrackLength,
                translateAmountPerCycle,
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.isPlaying && this.props.isPlaying !== prevProps.isPlaying) {
            this.translateProgressMarker();
        }
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
            if (this.props.isPlaying && nextTranslateAmount <= this.state.progressTrackLength) {
                this.setState({
                    currentTranslateAmount: nextTranslateAmount,
                });

                this.translateProgressMarker();
            }
            else if (!this.props.isPaused) {
                this.setState({
                    currentTranslateAmount: 0,
                });
            }
        });
    }

    render() {
        const iconName = this.props.isPlaying ? 'pause' : 'play';
        const progressMarkerStyles = {
            transform: [
                { translateX: this.state.currentTranslateAmount},
            ],
        }

        return (
            <View style={styles.voiceNoteContainer}>
                <Touchable
                    onPress={() => this.props.handlePlay(this.props.voiceNote.filePath)}
                    style={styles.voiceNoteIconContainer}>
                    <Icon
                        name={iconName}
                        style={styles.voiceNoteIcon} />
                </Touchable>
                <View style={styles.voiceNoteDurationTextContainer}>
                    <Counter
                        displayDuration={this.props.voiceNote.duration}
                        totalDuration={this.props.voiceNote.duration}
                        startTimer={this.props.isPlaying} />
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