import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from '../styles/icons/index';

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    currentLocationButton: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: styleConstants.primary,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.lightGrey,
    },
    currentLocationButtonDisabled: {
        opacity: 0.33,
    },
    currentLocationTextContainer: {

    },
    currentLocationTitleText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondary,
    },
    currentLocationSubtitleText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
    currentLocationIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentLocationIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
});

export default ItemListHeader = (props) => {
    const header = props.hasError ?
        <View
            style={[styles.currentLocationButton, styles.currentLocationButtonDisabled]}>
            <View style={styles.currentLocationButtonTextContainer}>
                <Text style={[styles.currentLocationTitleText, styleConstants.primaryFont]}>Use your Current Location</Text>
                <Text style={[styles.currentLocationSubtitleText, styleConstants.primaryFont]}>{props.currentLocation}</Text>
            </View>
            <View
                style={styles.currentLocationIconContainer}>
                <Icon name='gps-disabled' style={styles.currentLocationIcon} />
            </View>
        </View>
        :
        <TouchableOpacity
            onPress={() => props.handlePress(props.currentLocation)}
            style={styles.currentLocationButton}>
            <View style={styles.currentLocationButtonTextContainer}>
                <Text style={[styles.currentLocationTitleText, styleConstants.primaryFont]}>Use your Current Location</Text>
                <Text style={[styles.currentLocationSubtitleText, styleConstants.primaryFont]}>{props.currentLocation}</Text>
            </View>
            <View
                style={styles.currentLocationIconContainer}>
                <Icon name='gps-fixed' style={styles.currentLocationIcon} />
            </View>
        </TouchableOpacity>;

    return header;
}