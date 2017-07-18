import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateHeight extends React.Component {
    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    static get propTypes() {
        return {
            height: PropTypes.number,
        }
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.short,
                easing: config.animation.easing,
            }
        ).start();
    }

    render() {
        const animatedStyles = {
            height: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, this.props.height],
            }),
        }

        return (
            <Animated.View style={animatedStyles}>
                {this.props.children}
            </Animated.View>
        );
    }
}