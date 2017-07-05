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
    photoErrorContainer: {
        backgroundColor: styleConstants.white,
        borderWidth: 1,
        borderColor: styleConstants.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    photoErrorIcon: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.danger,
        marginBottom: 4,
    } ,
    photoErrorText: {
        fontSize: styleConstants.verySmallFont,
        color: styleConstants.primary,
        textAlign: 'center',
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

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.toggleLoadError = this.toggleLoadError.bind(this);

        this.state = {
            loadError: false,
        }
    }

    static get PropTypes() {
        return {
            uri: PropTypes.string.isRequired,
        }
    }

    toggleLoadError() {
        this.setState({
            loadError: !this.state.loadError,
        }); 
    }

    render() {
        const image = !this.state.loadError ?
            <Image
                source={{uri: this.props.uri}}
                onError={this.toggleLoadError}
                style={styles.photo} />
            :
            <View
                style={[styles.photo, styles.photoErrorContainer]}>
                <Icon
                    name='error'
                    style={styles.photoErrorIcon} />
                <Text style={[styles.photoErrorText, styleConstants.primaryFont]}>
                    Photo has been removed from device
                </Text>
            </View>;
        return image;
    }
}

export default PhotoList = (props) => {
    /*
        PROPTYPES
            values
            handleDelete
    */

    const photos = props.values && props.values.length > 0 ? 
        props.values.map((value, index) => {
            return (
                <Touchable
                    key={'photo-' + value.cropped}
                    onPress={() => props.handleViewPhotos(index)}
                    style={styles.photoContainer}>
                    <Photo
                        uri={value.cropped} />
                    <View style={styles.deleteButtonContainer}>
                        <DeleteButton 
                            handlePress={() => props.handleDelete(index)}/>
                    </View>
                </Touchable>
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