import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: window.width - 32,
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
        borderRadius: 36
    },
    icon: {
        position: 'absolute',
        left: 16
    },
    text: {
        fontSize: 18,
    }
});

export default Button = (props) => {
    /* 
        The Button component has 4 style modes
            transparent => Transparent background with white text/icon and white border
            transparentReversed => White background with primary text/icon and white border
            primary => Primary colour background with white text/icon and white border
            primaryReversed => White background with primary colour text/icon and white border
    */

    const backgroundColor =
        props.styleMode === 'transparent' ?
            'transparent'
            :
            props.styleMode === 'transparentReversed' || props.styleMode === 'primaryReversed' ?
                styleConstants.white
                :
                styleConstants.primary;

    const textColor =
        props.styleMode === 'transparent' || props.styleMode === 'primary' ?
            styleConstants.white
            :
            styleConstants.primary;       

    const icon = props.materialCommunityIcon ?
        <MaterialCommunityIcon
            name={props.iconName}
            size={28}
            color={textColor}
            style={styles.icon} />
        :
        <MaterialIcon
            name={props.iconName}
            size={28}
            color={textColor}
            style={styles.icon} />;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, props.style]}
            onPress={props.handlePress} >
            {icon}
            <Text
                style={[styles.text, { color: textColor }, styleConstants.robotoCondensed]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}