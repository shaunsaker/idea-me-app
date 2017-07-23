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
import Touchable from '../components/Touchable';

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
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
});

export default ActionModal = (props) => {
    return (
        <View>
            <Modal
                animationType={config.modal.animation}
                transparent={true}
                visible={true}
                onRequestClose={props.handleRightIconPress}>
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
                        <View style={styles.buttonsContainer}>
                            <Touchable
                                style={styles.iconContainer}
                                onPress={props.handleLeftIconPress} >
                                <Icon
                                    name='check'
                                    style={[styles.icon, { color: styleConstants.danger }]} />
                            </Touchable>
                            <Touchable
                                style={styles.iconContainer}
                                onPress={props.handleRightIconPress} >
                                <Icon
                                    name='close'
                                    style={styles.icon} />
                            </Touchable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}