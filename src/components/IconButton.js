import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: styleConstants.primary,
        padding: 16,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: styleConstants.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        position: 'relative',
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white
    },
    countContainer: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: styleConstants.white,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primary,
    },
    disabled: {
        opacity: 0.33,
    }
});

export default IconButton = (props) => {
    /*
        PROPS
            backgroundColor
            iconName
            iconColor
            handlePress
            count
            disabled
    */

    const backgroundColorStyles = props.backgroundColor &&
        {
            backgroundColor: props.backgroundColor,
        };

    const iconColorStyles = props.iconColor &&
        {
            color: props.iconColor,
        };

    const borderColorStyles = props.iconColor &&
        {
            borderColor: props.iconColor,
        };

    const count = props.count || props.count === 0 ?
        <View style={styles.countContainer}>
            <Text style={[styles.countText, styleConstants.primaryFont]}>
                {props.count}
            </Text>
        </View>
        :
        null;

    const button = props.disabled ?
        <View
            style={[styles.iconButton, backgroundColorStyles, borderColorStyles, styles.disabled]}>
            <Icon
                name={props.iconName}
                style={[styles.icon, iconColorStyles]} />
            {count}
        </View>
        :
        <Touchable
            onPress={props.handlePress}
            style={[styles.iconButton, backgroundColorStyles, borderColorStyles]}>
            <Icon
                name={props.iconName}
                style={[styles.icon, iconColorStyles]} />
            {count}
        </Touchable>;

    return button;
}