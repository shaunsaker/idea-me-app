import React from "react";
import {
    View,
    Text,
    Animated,
} from "react-native";
import Octicon from 'react-native-vector-icons/Octicons';

import styles from '../styles/components/GlowLoader';
import styleConstants from '../styles/styleConstants';

export default class GlowLoader extends React.Component {
    constructor(props) {
        super(props);

        this.color = new Animated.Value(0);
    }

    componentDidMount() {
        this.glow();
    }

    glow() {
        Animated.sequence([
            Animated.timing(
                this.color,
                {
                    toValue: 100,
                    duration: 1500,
                }
            ),
            Animated.timing(
                this.color,
                {
                    toValue: 0,
                    duration: 1500,
                }
            )
        ]).start(() => this.glow());
    }

    render() {
        const animatedColor = this.color.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(255, 255, 255, 1)', 'rgba(253, 216, 53, 1)']
        });

        return (
            <Animated.Text style={{ color: animatedColor }}>
                <Octicon
                    name='light-bulb'
                    size={this.props.size ? this.props.size : 32} />
            </Animated.Text>
        );
    }
}