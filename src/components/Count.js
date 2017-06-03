import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    countContainer: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: 18,
        color: styleConstants.white
    },
});

export default Count = (props) => {
    return (
        <View style={styles.countContainer}>
            <Text style={[styles.countText, styleConstants.robotoCondensed]}>
                {props.count}
                <Text style={styles.separator}> of </Text>
                {props.total}
                <Text style={styles.unit}>{' ' + props.unit}</Text>
            </Text>
        </View>
    );
}