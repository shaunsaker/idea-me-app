import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import config from '../config';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 2,
        marginRight: 4,
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.secondary,
    },
    text: {
        fontSize: 28,
        color: styleConstants.white,
    },
});

export default (Logo = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.iconContainer}>
                <Icon name="lightbulb" style={styles.icon} />
            </Text>
            <Text style={[styles.text, styleConstants.secondaryFont]}>
                IdeaMe
            </Text>
        </View>
    );
});
