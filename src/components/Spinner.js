import React from "react";
import {
    View,
    Text,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";
import Octicon from 'react-native-vector-icons/Octicons';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    lightbulb: {
        paddingLeft: 7,
    }
});

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);

        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.glow();
    }

    glow() {
        Animated.sequence([
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 100,
                    duration: 1500,
                }
            ),
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 750,
                }
            )
        ]).start(() => this.glow());
    }

    render() {
        const animatedColor = this.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(255, 255, 255, 1)', 'rgba(253, 216, 53, 1)']
        });

        const animatedSize = this.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 1.1]
        });

        return (
            <Animated.View style={{transform: [{scale: animatedSize}]}}>
                <Animated.Text style={{ color: animatedColor }}>
                    <Octicon
                        name='light-bulb'
                        size={this.props.size ? this.props.size : 32} />
                </Animated.Text>
            </Animated.View>
        );
    }
}