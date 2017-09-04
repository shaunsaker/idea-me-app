import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import config from '../config';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import InfoBlock from '../components/InfoBlock';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.transBlack,
    },
    modal: {
        width: styleConstants.windowWidth - 32,
        backgroundColor: styleConstants.white,
    },
    infoContainer: {
        backgroundColor: styleConstants.primary,
        paddingTop: 8,
        borderWidth: 1,
        borderColor: styleConstants.white,
        marginBottom: -16,
    },
    buttonContainer: {
        padding: 16,
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

export default (InfoModal = props => {
    /*
        PROPS
            title
            subtitle
            buttonText
            buttonIconName
            canClose
            handlePress
            handleClose
    */

    const closeButton = props.canClose && (
        <View style={styles.closeIconContainer}>
            <Touchable
                onPress={props.handleClose}
                style={styles.closeIconButton}>
                <Icon name="close" style={styles.closeIcon} />
            </Touchable>
        </View>
    );

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
                                titleColor={styleConstants.white}
                                subtitle={props.subtitle}
                                subtitleColor={styleConstants.lightGrey}
                                fullWidth
                            />
                        </View>
                        <Button
                            text={props.buttonText}
                            iconName={props.buttonIconName}
                            backgroundColor={styleConstants.white}
                            handlePress={props.handlePress}
                        />

                        {closeButton}
                    </View>
                </View>
            </Modal>
        </View>
    );
});
