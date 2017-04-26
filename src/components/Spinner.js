import React from "react";
import {
    View,
    Animated,
} from "react-native";
import Octicon from 'react-native-vector-icons/Octicons';

import styles from '../styles/components/Spinner';
import styleConstants from '../styles/styleConstants';

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
        
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.spin();
    }

    spin() {
        this.spinValue.setValue(0);

        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start(() => this.spin());
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        return (
            <Animated.View style={[styles.lightbulb, {transform: [{rotate: spin}] }]}>
                <Octicon
                    name='light-bulb'
                    size={this.props.size ? this.props.size : 32}
                    color={this.props.color ? this.props.color : styleConstants.white} />
            </Animated.View>
        );
    }
}