import React from 'react';
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

import Touchable from './Touchable';
import DeleteButton from './DeleteButton';

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
    },
    deleteButtonContainer: {
        position: 'absolute',
        top: 4,
        right: 4,
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

    const photos = props.values && props.values.length > 0 && 
        props.values.map((value, index) => {
            return (
                <Touchable
                    key={'photo-' + value.cropped}
                    handlePress={null}
                    style={styles.photoContainer}>
                    <Image
                        source={{uri: value.cropped}}
                        style={styles.photo} />
                    <View style={styles.deleteButtonContainer}>
                        <DeleteButton 
                            handlePress={() => props.handleDelete(index)}/>
                    </View>
                </Touchable>
            );
        })

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