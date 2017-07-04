import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.transPrimary,
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
        };
    }

    componentDidMount() {

        // Hack to fix scrollToIndex
        setTimeout(() => {
            this.refs.photosList.scrollToIndex({ index: this.props.scrollToIndex || 0, animated: false });
        }, 0);
    }

    renderPhoto = ({ item, index }) => {
        return (
            <View style={styles.photoContainer}>
                <Image
                    source={{uri: item.fullSize}}
                    style={styles.photo} />
            </View>
        );
    };
    
    getItemLayout = (data, index) => (
        {
            length: window.width,
            offset: window.width * index,
            index,
        }
    );

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