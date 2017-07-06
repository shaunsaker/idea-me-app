import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    FlatList,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import PhotoWithError from './PhotoWithError';
import Touchable from './Touchable';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.transBlack,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    photosWrapper: {

    },
    photosContainer: {

    },
    photoContainer: {

    },
    photo: {
        width: window.width,
        height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 16,
    },
    closeButton: {  
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
});

export default class PhotoViewer extends React.Component {
    constructor(props) {
        super(props);

        this.renderPhoto = this.renderPhoto.bind(this);
        this.getItemLayout = this.getItemLayout.bind(this);
    }

    static get propTypes() {
        return {
            photos:  PropTypes.array.isRequired,
            scrollToIndex: PropTypes.number,
            handleClose: PropTypes.func,
            handleDeletePhoto: PropTypes.func,
        };
    }

    componentDidMount() {

        // Hack to fix scrollToIndex
        setTimeout(() => {
            this.refs.photosList.scrollToIndex({ index: this.props.scrollToIndex || 0, animated: false });
        }, 0);
    }
    
    getItemLayout = (data, index) => (
        {
            length: window.width,
            offset: window.width * index,
            index,
        }
    )

    renderPhoto = ({ item, index }) => {
        return (
            <PhotoWithError
                key={'photo-' + item.uid}
                uri={item.fullSize}
                photoContainerStyles={styles.photoContainer}
                photoStyles={styles.photo}
                errorText='Photo has either been removed from this device or moved to a different folder.'
                handleDeletePhoto={() => { 
                    this.props.handleDeletePhoto(index);                
                }} />
        );
    }

    render() {
        return (
            <View>
                <Modal 
                    animationType={'fade'}
                    transparent={true}
                    visible={true}
                    onRequestClose={this.props.handleClose}>
                    <View style={styles.container}>
                        <FlatList 
                            ref='photosList'
                            keyExtractor={item => 'photo-' + item.uid }
                            data={this.props.photos}
                            renderItem={this.renderPhoto}
                            getItemLayout={this.getItemLayout}
                            style={styles.photosWrapper}
                            contentContainerStyle={styles.photosContainer}
                            horizontal
                            pagingEnabled>
                        </FlatList>

                        <Touchable 
                            onPress={this.props.handleClose}
                            style={styles.closeButtonContainer}>
                            <Icon
                                name='close'
                                style={styles.closeButton} />
                        </Touchable>
                    </View>
                </Modal>
            </View>
        )
    }
}