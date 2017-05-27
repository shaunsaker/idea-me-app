import React from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";
import OctIcon from 'react-native-vector-icons/Octicons';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 4,
        marginBottom: 2,
    },
    text: {
        fontSize: 32,
        color: styleConstants.white,
    }
});

export default Logo = (props) => {
    return (
        <View
            style={styles.container} >
            <OctIcon
                name='light-bulb'
                color={styleConstants.secondary}
                size={28} 
                style={styles.icon} />
            <Text style={[styles.text, styleConstants.ranga]}>
                IdeaMe
            </Text>
        </View>
    );
}