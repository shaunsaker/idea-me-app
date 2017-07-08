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
        this.startTimer = this.startTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
        this.expandButton = this.expandButton.bind(this);
        this.compressButton = this.compressButton.bind(this);

        this.timer;
        this.initialButtonWidth = 52;
        this.finalButtonWidth = window.width - 64; // 64 = margin + padding

        this.state = {
            animatedValue: new Animated.Value(0),
            isExpanded: false,
            displayIcon: true,
        }
    }

    static get propTypes() {
        return {

        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    handleOnPressIn() {
        this.expandButton();
    }

    handleOnPressOut() {
        this.compressButton();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.setState({
                displayIcon: !this.state.displayIcon,
            });
        }, config.animation.duration.long);
    }

    clearTimer() {
        clearInterval(this.timer);
    }

    expandButton() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.short,
                easing: config.animation.easing,
            }
        ).start(() => {
            this.setState({
                isExpanded: true,
            });
            this.startTimer();
        });
    }

    compressButton() {
        this.clearTimer();
        this.setState({
            isExpanded: false,
        });

        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: config.animation.short,
                easing: config.animation.easing,
            }
        ).start();
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
        const rotation = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        const colorStyles = {
            color: this.state.displayIcon ? color : styleConstants.white,
        }
        const borderColorStyles = {
            borderColor: color,
        }
        const rotationStyles = {
            transform: [
                {rotate: rotation},
            ],
        }

        const durationText = this.state.isExpanded &&
            <View style={styles.durationTextContainer}>
                <Text style={[styles.durationText, styleConstants.primaryFont]}>
                    0:00
                </Text>
            </View>;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPressIn={this.handleOnPressIn}
                    onPressOut={this.handleOnPressOut}>
                    <View>
                        <Animated.View style={[styles.button, widthStyles, backgroundColorStyles, borderColorStyles]}>
                            <Animated.Text style={[colorStyles, rotationStyles]}>
                                <Icon
                                    name='voice'
                                    style={styles.buttonIcon} />
                            </Animated.Text>
                            {durationText}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}