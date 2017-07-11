import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    FlatList,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import PhotoWithError from './PhotoWithError';

const window = Dimensions.get('window');
const imageWidth = (window.width - 122) / 3; // 122 = padding and margin

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
        borderWidth: 1,
        borderColor: styleConstants.lightGrey,
        borderRadius: 8,
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

export default class PhotoList extends React.Component {
    constructor(props) {
        super(props);

        this.renderPhoto = this.renderPhoto.bind(this);
    }

    static get propTypes() {
        return {
            photos: PropTypes.array,
        }
    }

    renderPhoto = ({item, index}) => {
        return (
            <PhotoWithError
                key={'photo-' + item.uid}
                uri={item.cropped}
                isThumbnail
                photoContainerStyles={styles.photoContainer}
                photoStyles={styles.photo}
                errorText='Photo has been removed from device'
                handleViewPhoto={() => this.props.handleViewPhotos(index)}
                handleDeletePhoto={() => this.props.handleDelete(index)} />
        );
    }

    render() {
        const photos = this.props.photos && this.props.photos.length > 0 ?
            <FlatList 
                keyExtractor={item => 'photo-' + item.uid }
                data={this.props.photos}
                renderItem={this.renderPhoto}
                style={styles.photosWrapper}
                contentContainerStyle={styles.photosContainer}>
            </FlatList>
            :
            <View style={styles.photosWrapper}>
                <View style={styles.noteTextContainer}>
                    <Text
                        style={[styles.noteText, styleConstants.primaryFont]}>
                        None
                    </Text>
                </View>
            </View>;

        return (
            <View style={styles.container}>
                {photos}
            </View>
        );
    }
}