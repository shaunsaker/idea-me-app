import React from "react";
import {
    View,
    Animated,
    Easing,
    Dimensions
} from "react-native";

import styles from '../styles/components/Loader';
import styleConstants from '../styles/styleConstants';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
        
        this.position = new Animated.Value(-100);
        this.windowWidth = Dimensions.get('window').width;
    }

    componentDidMount() {
        this.translate();
    }

    translate() {
        this.position.setValue(-100);

        Animated.timing(
            this.position,
            {
                toValue: this.windowWidth,
                duration: 1500,
                easing: Easing.ease
            }
        ).start(() => this.translate());
    }

    render() {
        return (
            <View style={styles.loaderContainer}>
                <Animated.View style={[styles.loader, { left: this.position }]} />
            </View>
        );
    }
}