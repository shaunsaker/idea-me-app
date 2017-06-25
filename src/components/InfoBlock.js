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
    const fullWidthStyles = props.fullWidth &&
        {
            paddingRight: 16,
        };
    
    const fullWidthTitleStyles = props.fullWidth && 
        {
            marginRight: 16,
        };

    return (
        <View style={[styles.infoContainer, fullWidthStyles]}>
            <Text style={[styles.infoTextTitle, {color: props.titleColor}, styleConstants.primaryFont, fullWidthTitleStyles]}>
                {props.title}
            </Text>
            <Text style={[styles.infoTextDescription, {color: props.subtitleColor}, styleConstants.primaryFont]}>
                {props.subtitle}
            </Text>
        </View>
    );
}