import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import DeleteButton from './DeleteButton';
import Button from './Button';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    photoErrorIcon: {
        color: styleConstants.danger,
    },
    photoErrorIconSmall: {
        fontSize: styleConstants.smallFont,
        marginBottom: 4,
    },
    photoErrorIconLarge: {
        fontSize: styleConstants.largeFont,
        marginBottom: 16,
    },
    photoErrorText: {
        textAlign: 'center',
    },
    photoErrorTextSmall: {
        color: styleConstants.primary,
        fontSize: styleConstants.verySmallFont,
        paddingHorizontal: 4,
    },
    photoErrorTextLarge: {
        color: styleConstants.white,
        fontSize: styleConstants.regularFont,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    deleteButtonContainerSmall: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    deleteButtonContainerLarge: {

    },
});

export default class PhotoWithError extends React.Component {
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
            isThumbnail: PropTypes.bool, // will render smaller text, icon and deleteButton
            photoContainerStyles: PropTypes.object, // used for photo and error
            photoStyles: PropTypes.object,  // used for photo and error
            errorText: PropTypes.string,
            handleViewPhoto: PropTypes.func, // thumbnail
            handleDeletePhoto: PropTypes.func, // if fullSize image, will provide this if image not found
        }
    }

    toggleLoadError() {
        this.setState({
            loadError: !this.state.loadError,
        });
    }

    render() {
        const photoErrorIconStyles = this.props.isThumbnail ?
            [styles.photoErrorIcon, styles.photoErrorIconSmall]
            :
            [styles.photoErrorIcon, styles.photoErrorIconLarge];

        const photoErrorTextStyles = this.props.isThumbnail ?
            [styles.photoErrorText, styles.photoErrorTextSmall]
            :
            [styles.photoErrorText, styles.photoErrorTextLarge];

        const deleteButton = this.props.isThumbnail ?
            <View style={styles.deleteButtonContainerSmall}>
                <DeleteButton
                    handlePress={null} />
            </View>
            :
            <View style={styles.deleteButtonContainerLarge}>
                <Button
                    text='Delete Photo Reference'
                    iconName='camera'
                    backgroundColor='transparent'
                    androidRipple
                    androidRippleColor={styleConstants.primary}
                    handlePress={this.props.handleDeletePhoto} />
            </View>     

        const photo =
            !this.state.loadError ?
                this.props.isThumbnail ?
                    <Touchable
                        onPress={this.props.handleViewPhoto}
                        style={this.props.photoContainerStyles}>
                        <Image
                            source={{uri: this.props.uri}}
                            onError={this.toggleLoadError}
                            style={this.props.photoStyles} />
                        {deleteButton}
                    </Touchable> 
                    :
                    <View style={this.props.photoContainerStyles}>
                        <Image
                            source={{uri: this.props.uri}}
                            onError={this.toggleLoadError}
                            style={this.props.photoStyles} />
                    </View>
                :
                this.props.isThumbnail ?
                    <Touchable 
                        onPress={this.props.handleViewPhoto}
                        style={this.props.photoContainerStyles}>
                        <View
                            style={this.props.photoStyles}>
                            <Icon
                                name='error'
                                style={photoErrorIconStyles} />
                            <Text style={[photoErrorTextStyles, styleConstants.primaryFont]}>
                                {this.props.errorText}
                            </Text>
                        </View>
                        {deleteButton}
                    </Touchable>
                    :
                    <View style={this.props.photoContainerStyles}>
                        <View
                            style={this.props.photoStyles}>
                            <Icon
                                name='error'
                                style={photoErrorIconStyles} />
                            <Text style={[photoErrorTextStyles, styleConstants.primaryFont]}>
                                {this.props.errorText}
                            </Text>
                            {deleteButton}
                        </View>
                    </View>;

        return photo;
    }
}