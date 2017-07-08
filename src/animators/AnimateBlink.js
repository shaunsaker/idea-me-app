import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateBlink extends React.Component {
    constructor(props) {
        super(props);

        this.blinkIn = this.blinkIn.bind(this);
        this.blinkOut = this.blinkOut.bind(this);

        this.state = {
            animatedValue: new Animated.Value(1), // start shown
        }
    }

    static get propTypes() {
        return {
            shouldAnimate: PropTypes.bool,
        }
    }

    componentDidMount() {
        this.props.shouldAnimate && this.blinkOut(); // start shown then blinkOut
    }

    componentDidUpdate(prevProps) {
        if (this.props.shouldAnimate && this.props.shouldAnimate !== prevProps.shouldAnimate) {
            this.blinkOut();
        }
    }

    blinkIn() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.long,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start(() => {
            this.props.shouldAnimate && this.blinkOut();
        });
    }

    blinkOut() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: config.animation.long,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start(() => {
            this.blinkIn();
        });
    }

    render() {
        const opacityStyles = {
            opacity: this.state.animatedValue,
        }

        return (
            <Animated.View style={opacityStyles}>
                {this.props.children}
            </Animated.View>
        );
    }
}