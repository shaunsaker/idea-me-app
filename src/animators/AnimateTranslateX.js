import React from "react";
import PropTypes from 'prop-types';
import {
    Animated,
} from "react-native";

import config from '../config';

export default class AnimateTranslateX extends React.Component {
    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);

        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    static get propTypes() {
        return {
            initialValue: PropTypes.number,
            finalValue: PropTypes.number,
            duration: PropTypes.number,
            repeat: PropTypes.bool,
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
                duration: this.props.duration || config.animation.short,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start(() => {
            if (this.props.repeat) {
                this.setState({
                    animatedValue: new Animated.Value(0)
                });

                this.animate();
            }
        });
    }

    render() {
        const animatedStyles = {
            transform: [{
                translateX: this.state.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.initialValue, this.props.finalValue],
                }),
            }],
        }

        return (
            <Animated.View style={animatedStyles}>
                {this.props.children}
            </Animated.View>
        );
    }
}