import React from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Dimensions,
} from "react-native";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import InfoBlock from './InfoBlock';
import Touchable from './Touchable';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.transBlack,
    },
    modal: {
        width: window.width - 32,
        backgroundColor: styleConstants.white,
        position: 'relative',
    },
    infoContainer: {
        backgroundColor: styleConstants.primary,
        paddingTop: 8,
        borderWidth: 1,
        borderColor: styleConstants.white,
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
        top: 0,
        right: 0,
    },
    closeIconButton: {
        padding: 8,
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
        <View>
            <Modal 
                animationType={config.modal.animation}
                transparent={true}
                visible={true}
                onRequestClose={props.handleClose}>
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <View style={styles.infoContainer}>
                            <InfoBlock
                                title={props.title}
                                titleColor={styleConstants.secondary}
                                subtitle={props.subtitle}
                                subtitleColor={styleConstants.white}
                                fullWidth />
                            <View style={styles.closeIconContainer}>
                                <Touchable
                                    onPress={props.handleClose}
                                    style={styles.closeIconButton} >
                                    <Icon
                                        name='close'
                                        style={styles.closeIcon} />
                                </Touchable>        
                            </View>
                        </View>
                        {options}
                    </View>
                </View>
            </Modal>
        </View>
    );
}