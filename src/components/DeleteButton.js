import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: styleConstants.lightGrey,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        fontSize: 12,
        color: styleConstants.primary
    },
});

export default DeleteButton = (props) => {
        return (
            <View style={styles.deleteButtonContainer}>
                <Touchable
                    onPress={props.handlePress}
                    style={styles.deleteButton}>
                    <Icon
                        name='close'
                        style={styles.deleteIcon} />
                </Touchable>
            </View>
        );
}