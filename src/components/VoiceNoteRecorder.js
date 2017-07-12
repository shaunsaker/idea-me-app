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
import { Recorder } from 'react-native-audio-toolkit';

import config from '../config';
import utilities from '../utilities';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import AnimateBlink from '../animators/AnimateBlink';
import AnimateRotate from '../animators/AnimateRotate';
import AnimateFadeIn from '../animators/AnimateFadeIn';
import Counter from './Counter';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

    },
    button: {
        height: 53,
        padding: 16,
        borderRadius: 36,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    buttonIcon: {
        fontSize: styleConstants.iconFont,
    },
    durationTextContainer: {
        justifyContent: 'center',
        marginLeft: 8,
    },
});

export default class VoiceNoteRecorder extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnPressIn = this.handleOnPressIn.bind(this);
        this.handleOnPressOut = this.handleOnPressOut.bind(this);
        this.expandButton = this.expandButton.bind(this);
        this.compressButton = this.compressButton.bind(this);
        this.reloadRecorder = this.reloadRecorder.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);

        this.initialButtonWidth = 52;
        this.finalButtonWidth = width - 64; // 64 = margin + padding
        this.recorder;

        this.state = {
            animatedValue: new Animated.Value(0),
            isExpanded: false,
            isExpanding: false,
            isCompressed: true,
            isCompressing: false,
            newVoiceNoteFilePath: null,
        }
    }

    static get propTypes() {
        return {
            handleRecord: PropTypes.func.isRequired,
        }
    }

    componentDidMount() {
        this.reloadRecorder();
    }

    handleOnPressIn() {
        this.expandButton();
    }

    handleOnPressOut() {
        this.compressButton();;
    }

    expandButton() {
        this.setState({
            isCompressed: false,
            isExpanding: true,
        });

        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.short,
                easing: config.animation.easing,
            }
        ).start(() => {
            this.setState({
                isExpanding: false,
                isExpanded: true,
            });

            this.toggleRecording(); // start recording
        });
    }

    compressButton() {
        this.setState({
            isExpanded: false,
            isCompressing: true,
        });

        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: config.animation.short,
                easing: config.animation.easing,
            }
        ).start(() => {
            this.setState({
                isExpanded: false, // fixes a bug when compressing mid-transition
                isCompressing: false,
                isCompressed: true,
            });

            this.toggleRecording(); // stop recording
        });
    }

    reloadRecorder() {
        if (this.recorder) {
            this.recorder.destroy();
        }

        const newFileName = 'IdeaMe-' + utilities.createUID() + '.mp4';

        this.recorder = new Recorder(
            newFileName, // this.fileName
            {
                bitrate: 256000,
                channels: 2,
                sampleRate: 44100,
                quality: 'max',
                //format: 'ac3', // autodetected from path
                //encoder: 'aac', // autodetected from path
            }
        ).prepare((error, path) => {
            this.setState({
                newVoiceNoteFilePath: path,
            })
        });
    }

    toggleRecording() {
        this.recorder.toggleRecord((error, stopped) => {
            if (error) {
                console.log(error);
            }
            if (stopped) {
                this.props.handleRecord(this.state.newVoiceNoteFilePath);
                this.reloadRecorder();
            }
        });
    }

    render() {
        const widthStyles = {
            width: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.initialButtonWidth, this.finalButtonWidth],
            }),
        }
        const backgroundColorStyles = {
            backgroundColor: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [styleConstants.primary, styleConstants.white],
            }),
        }
        const color = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [styleConstants.secondary, styleConstants.danger],
        });
        const colorStyles = {
            color,
        }
        const borderColorStyles = {
            borderColor: color,
        }

        const duration = this.state.isExpanded && !this.state.isCollapsing &&
            <AnimateFadeIn style={styles.durationTextContainer}>
                <Counter
                    startTimer />
            </AnimateFadeIn>;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPressIn={this.handleOnPressIn}
                    onPressOut={this.handleOnPressOut}>
                    <View>
                        <Animated.View style={[styles.button, widthStyles, backgroundColorStyles, borderColorStyles]}>
                            <AnimateBlink
                                shouldAnimate={this.state.isExpanded && !this.state.isCompressing}>
                                <AnimateRotate
                                    rotateForward={this.state.isExpanding}
                                    rotateBackward={this.state.isCompressing}
                                    rotateTo='-360deg'
                                    duration={config.animation.duration.long} >
                                    <Animated.Text style={colorStyles}>
                                        <Icon
                                            name='voice'
                                            style={styles.buttonIcon} />
                                    </Animated.Text>
                                </AnimateRotate>
                            </AnimateBlink>
                            {duration}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}