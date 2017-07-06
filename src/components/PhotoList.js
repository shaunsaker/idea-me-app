import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import PhotoWithError from './PhotoWithError';

const window = Dimensions.get('window');
const imageWidth = (window.width - 32 - 32 - 16 - 16 - 24 - 2) / 3; // BUG: 2?

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.white,
    },
    photosWrapper: {
        flex: 1,
        padding: 8,
    },
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 16,
    },
    photoContainer: {
        width: imageWidth,
        height: imageWidth,
        marginHorizontal: 4,
        marginBottom: 8,
    },
    photo: {
        width: imageWidth,
        height: imageWidth,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: styleConstants.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteTextContainer: {
        flex: 1,
        marginRight: 8,
    },
    noteText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
});

export default PhotoList = (props) => {
    /*
        PROPTYPES
            values
            handleDelete
    */

    const photos = props.values && props.values.length > 0 ?
        props.values.map((value, index) => {
            return (
                <PhotoWithError
                    key={'photo-' + value.uid}
                    uri={value.cropped}
                    isThumbnail
                    photoContainerStyles={styles.photoContainer}
                    photoStyles={styles.photo}
                    errorText='Photo has been removed from device'
                    handleViewPhoto={() => props.handleViewPhotos(index)}
                    handleDeletePhoto={() => props.handleDelete(index)} />
            );
        })
        :
        <View style={styles.noteTextContainer}>
            <Text
                style={[styles.noteText, styleConstants.primaryFont]}>
                None
            </Text>
        </View>;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.photosWrapper}
                contentContainerStyle={styles.photosContainer}>
                {photos}
            </ScrollView>
        </View>
    )
}