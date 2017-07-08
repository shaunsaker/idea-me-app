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
import utilities from '../utilities';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import AnimateBlink from '../animators/AnimateBlink';
import AnimateRotate from '../animators/AnimateRotate';
import AnimateFadeIn from '../animators/AnimateFadeIn';

const window = Dimensions.get('window');

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
    durationText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    }
});

export default class VoiceNoteRecorder extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnPressIn = this.handleOnPressIn.bind(this);
        this.handleOnPressOut = this.handleOnPressOut.bind(this);
        this.expandButton = this.expandButton.bind(this);
        this.compressButton = this.compressButton.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);

        this.initialButtonWidth = 52;
        this.finalButtonWidth = window.width - 64; // 64 = margin + padding
        this.timer;

        this.state = {
            animatedValue: new Animated.Value(0),
            isExpanded: false,
            isExpanding: false,
            isCompressed: true,
            isCompressing: false,
            duration: 0,
        }
    }

    static get propTypes() {
        return {

        }
    }

    handleOnPressIn() {
        this.clearTimer(); // in case of mid-transition change
        this.expandButton();
    }

    handleOnPressOut() {
        this.clearTimer();
        this.compressButton();
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

            this.startTimer();
            // this.props.handleRecord(); // start recording
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

            // this.props.handleRecord(); // stop recording
        });
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.setState({
                duration: this.state.duration += 1,
            });
        }, 1000);
    }

    clearTimer() {
        clearInterval(this.timer);

        this.setState({
            duration: 0,
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

        const durationText = this.state.isExpanded && !this.state.isCompressing &&
            <AnimateFadeIn>
                <View style={styles.durationTextContainer}>
                    <Text style={[styles.durationText, styleConstants.primaryFont]}>
                        {utilities.getPrettyMinutesFromSeconds(this.state.duration)}
                    </Text>
                </View>
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
                            {durationText}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}