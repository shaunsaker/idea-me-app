import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

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
});

export default IconButton = (props) => {
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

    return (
        <Touchable
            onPress={props.handlePress}
            style={[styles.iconButton, backgroundColorStyles, borderColorStyles]}>
            <Icon
                name={props.iconName}
                style={[styles.icon, iconColorStyles]} />
            {count}
        </Touchable>
    );
}