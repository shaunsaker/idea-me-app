import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    infoContainer: {
        paddingRight: 96,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    infoTextTitle: {
        fontSize: 32,
        color: styleConstants.white,
        marginBottom: 8,
    },
    infoTextDescription: {
        fontSize: 18,
        color: styleConstants.white,
    },
});

export default InputContainer = (props) => {
    return (
        <View style={styles.infoContainer}>
            <Text style={[styles.infoTextTitle, {color: props.titleColor}, styleConstants.robotoCondensed]}>
                {props.title}
            </Text>
            <Text style={[styles.infoTextDescription, {color: props.subtitleColor}, styleConstants.robotoCondensed]}>
                {props.subtitle}
            </Text>
        </View>
    );
}