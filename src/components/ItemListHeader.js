import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    currentLocationTextContainer: {

    },
    currentLocationTitleText: {
        fontSize: 16,
        color: styleConstants.secondary,
    },
    currentLocationSubtitleText: {
        fontSize: 18,
        color: styleConstants.white,
    },
    currentLocationIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentLocationIcon: {
        fontSize: 24,
        color: styleConstants.white,
    },
});

export default ItemListHeader = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.handlePress(props.currentLocation)}
            style={styles.currentLocationButton}>
            <View style={styles.currentLocationButtonTextContainer}>
                <Text style={[styles.currentLocationTitleText, styleConstants.robotoCondensed]}>Use your Current Location</Text>
                <Text style={[styles.currentLocationSubtitleText, styleConstants.robotoCondensed]}>{props.currentLocation}</Text>
            </View>
            <View
                style={styles.currentLocationIconContainer}>
                <Icon name='gps-fixed' style={styles.currentLocationIcon} />
            </View>
        </TouchableOpacity>
    )
}