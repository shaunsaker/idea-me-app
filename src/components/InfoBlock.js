import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    infoContainer: {
        paddingRight: 96,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    infoTextTitle: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
    },
    descriptionWrapper: {
        maxHeight: height / 4.5,
    },
    descriptionContainer: {

    },
    infoTextDescription: {
        marginTop: 8,
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
});

export default InputContainer = (props) => {
    /*
        PROPTYPES
            title
            subtitle
            titleColor
            subtitleColor
            fullWidth
    */

    const fullWidthStyles = props.fullWidth &&
        {
            paddingRight: 16,
        };
    
    const fullWidthTitleStyles = props.fullWidth && 
        {
            marginRight: 16,
        };

    const subtitle = props.subtitle &&
        props.fixSubtitleHeight ?
            <Text style={[styles.infoTextDescription, {color: props.subtitleColor}, styleConstants.primaryFont]}>
                {props.subtitle}
            </Text>
            :
            <ScrollView
                style={styles.descriptionWrapper}
                contentContainerStyle={styles.descriptionContainer}>
                <Text style={[styles.infoTextDescription, {color: props.subtitleColor}, styleConstants.primaryFont]}>
                    {props.subtitle}
                </Text>
            </ScrollView>;

    return (
        <View style={[styles.infoContainer, fullWidthStyles]}>
            <Text style={[styles.infoTextTitle, {color: props.titleColor}, styleConstants.primaryFont, fullWidthTitleStyles]}>
                {props.title}
            </Text>
            {subtitle}
        </View>
    );
}