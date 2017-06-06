import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from '../styles/icons/index';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: styleConstants.transPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    modalContainer: {

    },
    modal: {
        width: window.width - 32,
        justifyContent: 'center',
        backgroundColor: styleConstants.white,
    },
    modalButton: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: styleConstants.lightGrey,
    },
    modalButtonText: {
        fontSize: 18,
        color: styleConstants.primary,
        textAlign: 'center',
    },
    closeIconContainer: {
        position: 'absolute',
        top: -36,
        right: 0,
    },
    closeIconButton: {
        
    },
    closeIcon: {
        fontSize: 28,
        color: styleConstants.white,
    },
});

export default OptionsModal = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <View style={styles.closeIconContainer}>
                    <TouchableOpacity
                        onPress={props.handleClose}
                        style={styles.closeIconButton} >
                        <Icon
                            name='close'
                            style={styles.closeIcon} />
                    </TouchableOpacity>        
                </View>
                <View style={styles.modal}>
                    <TouchableOpacity
                        onPress={() => props.handleSelect(props.options[0])}
                        style={styles.modalButton} >
                        <Text style={[styles.modalButtonText, styleConstants.robotoCondensed]}>{props.options[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.handleSelect(props.options[1])}
                        style={styles.modalButton} >
                        <Text style={[styles.modalButtonText, styleConstants.robotoCondensed]}>{props.options[1]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}