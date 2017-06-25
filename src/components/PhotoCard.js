import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import utilities from '../utilities';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import InfoBlock from './InfoBlock';
import PhotoList from './PhotoList';
import IconButton from './IconButton';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
        width: window.width - 32,
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    contentContainer: {
        flex: 1,
        marginBottom: 16,
    },
    infoContainer: {

    },
    photosContainer: {
        flex: 1,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 8,
    },
});

export default PhotoCard = (props) => {

    /*
        PROPTYPES
            idea
            photos
            handleDelete
    */
  
    return (
        <View
            style={styles.cardContainer} >

            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <InfoBlock
                        title={props.idea.title}
                        subtitle={props.idea.description}
                        titleColor={styleConstants.primary}
                        subtitleColor={styleConstants.grey}
                        fullWidth />
                </View>

                <View style={styles.photosContainer}>
                    <PhotoList
                        title={'PHOTOS (' + props.photos.length + '):'}
                        values={props.photos} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <IconButton
                    handlePress={props.handleAddPhoto}
                    iconName='camera'
                    iconColor={styleConstants.secondary} />
            </View>
        </View>
    )
}