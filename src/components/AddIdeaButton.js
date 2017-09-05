import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    cardContainer: {
        ...styleConstants.smallShadow,
        position: 'relative',
        width: styleConstants.windowWidth - 32,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
    },
    icon: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.lightGrey,
    },
    text: {
        marginTop: 8,
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
});

export default (AddIdeaButton = props => {
    /*
        PROPTYPES
        
        handlePress: PropTypes.func.isRequired
    */

    return (
        <Touchable onPress={props.handlePress} style={styles.cardContainer}>
            <Icon name="add" style={styles.icon} />
            <Text style={[styles.text, styleConstants.primaryFont]}>
                Add an Idea
            </Text>
        </Touchable>
    );
});
