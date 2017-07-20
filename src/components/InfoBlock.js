import React from "react";
import {
    View,
    ScrollView,
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
    },
    descriptionWrapper: {

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
            limitDescriptionHeightTo // if provided, scrollView with maxHeight will be used for description
    */

    const fullWidthStyles = props.fullWidth &&
        {
            paddingRight: 16,
        };

    const fullWidthTitleStyles = props.fullWidth &&
        {
            marginRight: 16,
        };

    const subtitle = props.subtitle ?
        props.limitDescriptionHeightTo ?
            <ScrollView
                style={[styles.descriptionWrapper, { maxHeight: props.limitDescriptionHeightTo }]}
                contentContainerStyle={styles.descriptionContainer}>
                <Text style={[styles.infoTextDescription, { color: props.subtitleColor }, styleConstants.primaryFont]}>
                    {props.subtitle}
                </Text>
            </ScrollView>
            :
            <Text style={[styles.infoTextDescription, { color: props.subtitleColor }, styleConstants.primaryFont]}>
                {props.subtitle}
            </Text>
        : null;

    return (
        <View style={[styles.infoContainer, fullWidthStyles]}>
            <Text style={[styles.infoTextTitle, { color: props.titleColor }, styleConstants.primaryFont, fullWidthTitleStyles]}>
                {props.title}
            </Text>
            {subtitle}
        </View>
    );
}