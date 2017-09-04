import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styleConstants from '../assets/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    infoContainer: {
        paddingRight: 96,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    infoTextTitle: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
    },
    descriptionWrapper: {},
    descriptionContainer: {},
    infoTextDescriptionContainer: {},
    infoTextDescription: {
        marginTop: 8,
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
});

export default (InfoBlock = props => {
    /* PROPTYPES
            title: PropTypes.string,
            subtitle: PropTypes.string,
            titleColor: PropTypes.string,
            subtitleColor: PropTypes.string,
            fullWidth: PropTypes.bool,
    */

    const fullWidthStyles = this.props.fullWidth && {
        paddingRight: 16,
    };

    const fullWidthTitleStyles = this.props.fullWidth && {
        marginRight: 16,
    };

    const subtitle = (
        <Text
            style={[
                styles.infoTextDescription,
                { color: this.props.subtitleColor },
                styleConstants.primaryFont,
            ]}>
            {this.props.subtitle}
        </Text>
    );

    return (
        <View style={[styles.infoContainer, fullWidthStyles]}>
            <Text
                style={[
                    styles.infoTextTitle,
                    { color: this.props.titleColor },
                    styleConstants.primaryFont,
                    fullWidthTitleStyles,
                ]}>
                {this.props.title}
            </Text>
            {subtitle}
        </View>
    );
});
