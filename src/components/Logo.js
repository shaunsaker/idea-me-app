import React from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";
import Icon from '../styles/icons/index';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 4,
        marginBottom: 2,
        fontSize: 24,
        color: styleConstants.secondary,
    },
    text: {
        fontSize: 32,
        color: styleConstants.white,
    }
});

export default Logo = (props) => {
    return (
        <View
            style={styles.container} >
            <Icon
                name='light-bulb'
                style={styles.icon} />
            <Text style={[styles.text, styleConstants.ranga]}>
                IdeaMe
            </Text>
        </View>
    );
}