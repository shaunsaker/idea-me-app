import React from "react";
import {
    View,
    Text,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";
import Icon from '../styles/icons/index';;

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 13,
        marginTop: -36,
    },
});

export default class GlowLoader extends React.Component {
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
            <Animated.View style={[styles.container, {transform: [{scale: animatedSize}]}]}>
                <Animated.Text style={{ color: animatedColor }}>
                    <Icon
                        name='light-bulb'
                        size={64} />
                </Animated.Text>
            </Animated.View>
        );
    }
}