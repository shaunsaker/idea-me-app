import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import BlankInput from './BlankInput';

const styles = StyleSheet.create({
    container: {
        minHeight: 53,
        paddingLeft: 16,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: styleConstants.primary,
        flexDirection: 'row',
        alignItems: 'center',
        width: styleConstants.windowWidth - 64, // 64 = margin + padding
        backgroundColor: styleConstants.white,

    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
});

export default NoteTaker = (props) => {

    /* PROPTYPES

        text: PropTypes.string,
        handleAddNote: PropTypes.func,
        inputValue: PropTypes.string,
        handleChangeText: PropTypes.func,

    */

    return (
        <View style={styles.container}>
            <Icon
                name='note'
                style={styles.icon} />
            <BlankInput
                placeholderText={props.text}
                placeholderTextColor={styleConstants.lightGrey}
                value={props.inputValue}
                valueColor={styleConstants.primary}
                handleChange={props.handleChangeText}
                handleFocus={null}
                handleBlur={null}
                autoFocus={false}
                multiline />
        </View>
    );
}