import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: width - 32,
        height: 56,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        marginTop: 16,
        alignSelf: 'center',
    },
    disabled: {
        opacity: 0.33
    },
    icon: {
        position: 'absolute',
        left: 16,
        fontSize: styleConstants.iconFont,
    },
    text: {
        fontSize: styleConstants.regularFont,
    }
});

export default Button = (props) => {
    /*
        PROPTYPES
            backgroundColor
            iconName
            disabled
            text
            handlePress
            androidRipple
            androidRippleColor
    */

    const altColor =
        props.backgroundColor === 'transparent' || props.backgroundColor === styleConstants.primary ?
            styleConstants.white
            :
            styleConstants.primary;       

    const icon = 
        props.iconName ?
            <Icon
                name={props.iconName}
                style={[styles.icon, {color: altColor}]} />
            :
            null;

    const button = props.disabled ?
        <View
            style={[styles.button, styles.disabled, { backgroundColor: props.backgroundColor }, props.style]}>
            {icon}
            <Text
                style={[styles.text, { color: altColor }, styleConstants.primaryFont]}>
                {props.text}
            </Text>
        </View>  
        :
        <Touchable
            onPress={props.handlePress} 
            style={[styles.button, { backgroundColor: props.backgroundColor }, props.style]}
            androidRipple
            androidRippleColor={altColor}>
            {icon}
            <Text
                style={[styles.text, { color: altColor }, styleConstants.primaryFont]}>
                {props.text}
            </Text>
        </Touchable>

    return (
        <View>
            {button}
        </View>
    );
}