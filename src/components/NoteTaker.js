import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from "react-native";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import AnimateFadeIn from '../animators/AnimateFadeIn';
import AnimateRotate from '../animators/AnimateRotate';
import BlankInput from './BlankInput';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

    },
    button: {
        minHeight: 53,
        paddingLeft: 16,
        borderRadius: 36,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIcon: {
        fontSize: styleConstants.iconFont,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    actionButtonIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default class NoteTaker extends React.Component {
    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleActionButtonPress = this.handleActionButtonPress.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.expandButton = this.expandButton.bind(this);
        this.compressButton = this.compressButton.bind(this);

        this.initialButtonWidth = 52;
        this.finalButtonWidth = width - 64; // 64 = margin + padding

        this.state = {
            animatedValue: new Animated.Value(0),
            isExpanded: false,
            isExpanding: false,
            isCompressed: true,
            isCompressing: false,
        }
    }

    static get propTypes() {
        return {
            text: PropTypes.string,
            handleAddNote: PropTypes.func,
            inputValue: PropTypes.string,
            handleChangeText: PropTypes.func,
        }
    }

    handleOpen() {
        this.expandButton();
    }

    handleActionButtonPress() {
        if (this.props.inputValue && this.props.inputValue.length > 0) {
            this.props.handleAdd();
        }
        else {
            this.handleClose();
        }
    }

    handleClose() {
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
                isCompressing: false,
                isCompressed: true,
            });
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
            outputRange: [styleConstants.secondary, styleConstants.primary],
        });
        const colorStyles = {
            color,
        }
        const borderColorStyles = {
            borderColor: color,
        }

        const actionButton = this.state.isExpanded &&
            <AnimateFadeIn>
                <TouchableOpacity
                    onPress={this.handleActionButtonPress}
                    style={styles.actionButton}>
                    <Icon
                        name='close'
                        style={styles.actionButtonIcon} />
                </TouchableOpacity>
            </AnimateFadeIn>;

        const input = this.state.isExpanded &&
            <AnimateFadeIn style={styles.inputWrapper}>
                <BlankInput
                    placeholderText={this.props.text}
                    placeholderTextColor={styleConstants.lightGrey}
                    value={this.props.inputValue}
                    valueColor={styleConstants.primary}
                    handleChange={this.props.handleChangeText}
                    handleFocus={null}
                    handleBlur={null}
                    autoFocus={true}
                    multiline />
            </AnimateFadeIn>;
            

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={this.handleOpen}>
                    <View>
                        <Animated.View style={[styles.button, widthStyles, backgroundColorStyles, borderColorStyles]}>
                            <AnimateRotate
                                rotateForward={this.state.isExpanding}
                                rotateBackward={this.state.isCompressing}
                                rotateTo='-360deg'
                                duration={config.animation.duration.long}>
                                <Animated.Text style={colorStyles}>
                                    <Icon
                                        name='note'
                                        style={styles.buttonIcon} />
                                </Animated.Text>
                            </AnimateRotate>
                            {input}
                            <AnimateRotate
                                rotateForward={this.props.inputValue && this.props.inputValue.length > 0}
                                rotateBackward={!this.props.inputValue}
                                rotateTo='45deg'
                                duration={config.animation.duration.short}>
                                {actionButton}
                            </AnimateRotate>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}