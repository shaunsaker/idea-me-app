import React from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";

import config from "../config";

export default class AnimateHeight extends React.Component {
    constructor(props) {
        super(props);

        this.animateIn = this.animateIn.bind(this);
        this.animateOut = this.animateOut.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        };
    }

    static get propTypes() {
        return {
            initialValue: PropTypes.number,
            finalValue: PropTypes.number,
            shouldAnimateIn: PropTypes.bool,
            shouldAnimateOut: PropTypes.bool,
            animateInCallBack: PropTypes.func,
            animateOutCallback: PropTypes.func,
            shouldRepeat: PropTypes.bool,
            shouldLoop: PropTypes.bool, // used with repeat (cycles the animation instead of going back and forth)
            // style: PropTypes.number, // or array
            duration: PropTypes.number,
            easing: PropTypes.object,
        };
    }

    static get defaultProps() {
        return {
            duration: config.animation.duration.short,
            easing: config.animation.easing,
        };
    }

    componentDidMount() {
        // In cases where update needs to be used instead
        const shouldAnimateOnMount =
            (this.props.initialValue || this.props.initialValue === 0) &&
            (this.props.finalValue || this.props.finalValue === 0);

        this.props.shouldAnimateIn && shouldAnimateOnMount && this.animateIn();
    }

    componentDidUpdate(prevProps) {
        // Use case where update used as onMount (see componentDidMount)
        const shouldAnimateOnUpdate =
            !this.props.shouldAnimateOut &&
            ((this.props.initialValue &&
                this.props.initialValue !== prevProps.initialValue) ||
                (this.props.finalValue &&
                    this.props.finalValue !== prevProps.finalValue));

        if (shouldAnimateOnUpdate) {
            this.animateIn();
        } else if (
            this.props.shouldAnimateIn &&
            this.props.shouldAnimateIn !== prevProps.shouldAnimateIn
        ) {
            this.animateIn();
        } else if (
            this.props.shouldAnimateOut &&
            this.props.shouldAnimateOut !== prevProps.shouldAnimateOut
        ) {
            this.animateOut();
        }
    }

    animateIn() {
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: this.props.duration,
            easing: this.props.easing,
            useNativeDriver: false,
        }).start(() => {
            this.props.animateInCallback && this.props.animateInCallback();

            if (this.props.shouldRepeat) {
                if (this.props.shouldLoop) {
                    this.state.animatedValue.setValue(0);
                    this.animateIn();
                } else {
                    this.animateOut();
                }
            }
        });
    }

    animateOut() {
        Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration: this.props.duration,
            easing: this.props.easing,
            useNativeDriver: false,
        }).start(() => {
            this.props.animateOutCallback && this.props.animateOutCallback();
            this.props.shouldRepeat && this.animateIn();
        });
    }

    render() {
        const animatedStyles = {
            height: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.initialValue, this.props.finalValue],
            }),
        };

        return (
            <Animated.View style={[this.props.style, animatedStyles]}>
                {this.props.children}
            </Animated.View>
        );
    }
}
