import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateTranslateY extends React.Component {
    constructor(props) {
        super(props);

        this.animateIn = this.animateIn.bind(this);
        this.animateOut = this.animateOut.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    static get propTypes() {
        return {
            initialValue: PropTypes.number,
            finalValue: PropTypes.number,
            duration: PropTypes.number,
            shouldAnimateOut: PropTypes.bool,
            animateOutCallback: PropTypes.func,
        }
    }

    componentDidMount() {
        this.animateIn();
    }

    componentDidUpdate(prevProps) {
        if (this.props.shouldAnimateOut && this.props.shouldAnimateOut !== prevProps.shouldAnimateOut) {
            this.animateOut();
        }
    }

    animateIn() {
        console.log('Animating in')
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: this.props.duration || config.animation.short,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start();
    }

    animateOut() {
        console.log('Animating out')
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: this.props.duration || config.animation.short,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start(this.props.animateOutCallback);
    }

    render() {
        const animatedStyles = {
            transform: [{
                translateY: this.state.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.initialValue, this.props.finalValue],
                }),
            }],
        }

        return (
            <Animated.View style={[this.props.styles && this.props.styles, animatedStyles]}>
                {this.props.children}
            </Animated.View>
        );
    }
}