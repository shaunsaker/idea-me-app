import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateRotate extends React.Component {
    constructor(props) {
        super(props);

        this.rotateForward = this.rotateForward.bind(this);
        this.rotateBackward = this.rotateBackward.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    static get propTypes() {
        return {
            rotateForward: PropTypes.bool,
            rotateBackward: PropTypes.bool,
            rotateTo: PropTypes.string,
            duration: PropTypes.number,
        }
    }

    componentDidUpdate(prevProps) {
        this.props.rotateForward && this.props.rotateForward !== prevProps.rotateForward && this.rotateForward();
        this.props.rotateBackward && this.props.rotateBackward !== prevProps.rotateBackward && this.rotateBackward();
    }

    rotateForward() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: this.props.duration,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start();
    }

    rotateBackward() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: this.props.duration,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start();
    }

    render() {
        const rotation = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', this.props.rotateTo],
        });
        const rotationStyles = {
            transform: [
                {rotate: rotation},
            ],
        }

        return (
            <Animated.View style={rotationStyles}>
                {this.props.children}
            </Animated.View>
        );
    }
}