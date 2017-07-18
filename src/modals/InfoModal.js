import React from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
} from "react-native";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

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
});

export default InfoModal = (props) => {
    /*
        PROPS
            title
            subtitle
            handlePress
            handleClose
    */

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
                                fullWidth />
                        </View>
                        <Button
                            text='Retry'
                            iconName='refresh'
                            backgroundColor={styleConstants.white}
                            handlePress={props.handlePress} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}