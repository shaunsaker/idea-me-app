import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Animated,
} from "react-native";
import Icon from '../styles/icons/index';

import config from '../config';
import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 2,
        marginRight: 4,
    },
    icon: {
        fontSize: styleConstants.iconFont,
    },
    text: {
        fontSize: 28,
        color: styleConstants.white,
    }
});

export default class Logo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animatedValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: config.animation.duration.long,
                easing: config.animation.easing,
            }
        ).start();
    }

    render() {
        const animatedColor = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [styleConstants.lightGrey, styleConstants.secondary]
        });

        return (
            <View
                style={styles.container} >
                <Animated.Text style={[styles.iconContainer, {color: animatedColor}]}>
                    <Icon
                        name='lightbulb'
                        style={styles.icon} />
                </Animated.Text>
                <Text style={[styles.text, styleConstants.secondaryFont]}>
                    IdeaMe
                </Text>
            </View>
        );
    }
}