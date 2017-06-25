import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import InfoBlock from './InfoBlock';
import Touchable from './Touchable';

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
        borderWidth: 1,
        borderColor: styleConstants.white,
        borderBottomWidth: 0,
        elevation: 10,
    },
    infoContainer: {
        backgroundColor: styleConstants.primary,
        paddingTop: 8,
    },
    modalButton: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: styleConstants.lightGrey,
    },
    modalButtonText: {
        fontSize: styleConstants.regularFont,
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
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
});

export default OptionsModal = (props) => {
    /*
        PROPTYPES
            title
            subtitle
            options
            handleSelect
            handleClose
    */

    const title = props.title ?
        <View style={styles.titleContainer}>
            <Text style={[styles.title, styleConstants.primaryFont]}>
                {props.title}
            </Text>
        </View>
        :
        null;

     const subtitle = props.subtitle ?
        <View style={styles.subtitleContainer}>
            <Text style={[styles.subtitle, styleConstants.primaryFont]}>
                {props.subtitle}
            </Text>
        </View>
        :
        null;    

    const text = props.title || props.subtitle ?
        <View style={styles.textContainer}>
            {title}
            {subtitle}
        </View> 
        :
        null;

    const options = props.options.map((value) => {
        return (
            <Touchable
                key={'option-' + value}
                onPress={() => props.handleSelect(value)}
                style={styles.modalButton}>
                <Text style={[styles.modalButtonText, styleConstants.primaryFont]}>{value}</Text>
            </Touchable>
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <View style={styles.closeIconContainer}>
                    <Touchable
                        onPress={props.handleClose}
                        style={styles.closeIconButton} >
                        <Icon
                            name='close'
                            style={styles.closeIcon} />
                    </Touchable>        
                </View>
                <View style={styles.modal}>
                    <View style={styles.infoContainer}>
                        <InfoBlock
                            title='Create an app'
                            titleColor={styleConstants.white}
                            subtitle='ADD A:'
                            subtitleColor={styleConstants.secondary} />
                    </View>
                    {options}
                </View>
            </View>
        </View>
    );
}