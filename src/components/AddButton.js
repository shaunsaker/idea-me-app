import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: styleConstants.primary,
        padding: 16,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: styleConstants.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    addIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white
    },
});

export default AddButton = (props) => {
        return (
            <Touchable
                onPress={props.handlePress}
                style={styles.addButton}>
                <Icon
                    name='add'
                    style={styles.addIcon} />
            </Touchable>
        );
}