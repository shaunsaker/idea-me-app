import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

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
        fontSize: 18,
        color: styleConstants.primary
    },
});

export default DeleteButton = (props) => {
        return (
            <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                    onPress={props.handlePress}
                    style={styles.deleteButton}>
                    <Icon
                        name='close'
                        style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
        );
}