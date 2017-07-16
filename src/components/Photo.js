import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import DeleteButton from './DeleteButton';
import Button from './Button';

const styles = StyleSheet.create({
    photoLoadingContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: styleConstants.lightGrey,
    },
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

export default class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.toggleLoading = this.toggleLoading.bind(this);
        this.toggleLoadError = this.toggleLoadError.bind(this);

        this.state = {
            loading: true,
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

    toggleLoading() {
        this.setState({
            loading: !this.state.loading,
        }); 
    }

    toggleLoadError() {
        this.setState({
            loadError: !this.state.loadError,
        });
    }

    render() {
        const photoLoadingComponent = this.state.loading &&
            <View style={styles.photoLoadingContainer}>
                <ActivityIndicator
                    size='small'
                    color={styleConstants.primary} />
            </View>;

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
                    handlePress={this.props.handleDeletePhoto} />
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
                            onLoadEnd={this.toggleLoading}
                            onError={this.toggleLoadError}
                            style={this.props.photoStyles} />
                        {deleteButton}
                        {photoLoadingComponent}
                    </Touchable> 
                    :
                    <View style={this.props.photoContainerStyles}>
                        <Image
                            source={{uri: this.props.uri}}
                            onLoadEnd={this.toggleLoading}
                            onError={this.toggleLoadError}
                            style={this.props.photoStyles} />
                        {photoLoadingComponent}
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