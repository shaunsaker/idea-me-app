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
    modal: {
        width: window.width - 32,
        backgroundColor: styleConstants.white,
    },
    textContainer: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    titleText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.grey,
        textAlign: 'center',
        marginTop: 8,
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
    const subtitle = props.subtitle ?
        <Text style={[styles.subtitleText, styleConstants.primaryFont]}>{props.subtitle}</Text>
        :
        null;

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.textContainer}>
                    <Text style={[styles.titleText, styleConstants.primaryFont]}>{props.title}</Text>
                    {subtitle}
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={props.handleLeftIconPress} >
                        <Icon
                            name='check'
                            style={[styles.icon, {color: styleConstants.danger}]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={props.handleRightIconPress} >
                        <Icon
                            name='close'
                            style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}