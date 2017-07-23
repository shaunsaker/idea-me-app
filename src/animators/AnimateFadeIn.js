import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateFadeIn extends React.Component {
    constructor(props) {
        super(props);

        this.fadeIn = this.fadeIn.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.fadeIn();
    }

    fadeIn() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.long,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start();
    }

    render() {
        const opacityStyles = {
            opacity: this.state.animatedValue,
        }

        return (
            <Animated.View style={[this.props.style, opacityStyles]}>
                {this.props.children}
            </Animated.View>
        );
    }
}