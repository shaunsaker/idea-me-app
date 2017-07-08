import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateExpand extends React.Component {
    constructor(props) {
        super(props);

        this.expand = this.expand.bind(this);
        this.compress = this.compress.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    static get propTypes() {
        return {
            expand: PropTypes.bool,
            compress: PropTypes.bool,
            expandTo: PropTypes.number,
            compressTo: PropTypes.number,
        }
    }

    componentDidUpdate(prevProps) {
        this.props.expand && this.props.expand !== prevProps.expand && this.expand();
        this.props.compress && this.props.compress !== prevProps.compress && this.compress();
    }

    expand() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.long,
                easing: config.animation.easing,
            }
        ).start();
    }

    compress() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: config.animation.long,
                easing: config.animation.easing,
            }
        ).start();
    }

    render() {
        const widthStyles = {
            width: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.compressTo, this.props.expandTo],
            }),
        }

        return (
            <Animated.View style={widthStyles}>
                {this.props.children}
            </Animated.View>
        );
    }
}