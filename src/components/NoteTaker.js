import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import AnimateTranslateX from '../animators/AnimateTranslateX';
import BlankInput from './BlankInput';
import Touchable from './Touchable';

const styles = StyleSheet.create({
    container: {
        minHeight: 53,
        paddingHorizontal: 16,
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
    addButton: {

    },
});

export default NoteTaker = (props) => {

    /* PROPTYPES

        text: PropTypes.string,
        handleAdd: PropTypes.func,
        inputValue: PropTypes.string,
        handleChangeText: PropTypes.func,

    */

    const addButton = props.inputValue && props.inputValue.length ?
        <AnimateTranslateX
            initialValue={40}
            finalValue={0}
            shouldAnimateIn>
            <Touchable
                onPress={props.handleAdd}
                style={styles.addButton}>
                <Icon
                    name='add'
                    style={styles.icon} />
            </Touchable>
        </AnimateTranslateX>
        :
        null;

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
            {addButton}
        </View>
    );
}