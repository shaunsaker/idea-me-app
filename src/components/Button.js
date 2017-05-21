import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: window.width - 32,
        height: 56,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
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
    },
    icon: {

    },
    text: {
        fontSize: 18,
    }
});

export default Button = (props) => {
    const transparentStyles = props.transparent ?
        { backgroundColor: 'transparent'}
        :
        null; 

    const icon = props.iconName ?
        <MaterialIcon
            name={props.iconName}
            size={28}
            color={props.transparent ? styleConstants.white : styleConstants.primary}
            style={styles.icon} />
        :
        null;

    const transparentTextStyles = props.transparent ?
        { color: styleConstants.white }
        :
        { color: styleConstants.primary };

    const text = props.text ?
        <Text
            style={[styles.text, transparentTextStyles, styleConstants.robotoCondensed]}>
            {props.text}
        </Text>
        :
        null;

    const buttonStyles = props.style ?
        [styles.button, transparentStyles, props.style]
        :
        styles.button;

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={props.handlePress} >
            {icon}
            {text}
        </TouchableOpacity>
    );
}