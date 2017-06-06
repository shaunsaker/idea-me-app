import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    infoContainer: {
        paddingRight: 92,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    infoTextTitle: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
        marginBottom: 8,
    },
    infoTextDescription: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
});

export default InputContainer = (props) => {
    return (
        <View style={styles.infoContainer}>
            <Text style={[styles.infoTextTitle, {color: props.titleColor}, styleConstants.primaryFont]}>
                {props.title}
            </Text>
            <Text style={[styles.infoTextDescription, {color: props.subtitleColor}, styleConstants.primaryFont]}>
                {props.subtitle}
            </Text>
        </View>
    );
}