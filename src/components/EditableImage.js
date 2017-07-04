import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginTop: 32,
        position: 'relative',
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editImageContainer: {
		position: 'absolute',
		top: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: styleConstants.transPrimary,
        borderWidth: 2,
        borderColor: styleConstants.white,
    },
    editImageIcon: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
    },
});

export default class EditableImage extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            uri: PropTypes.string,
            handlePress: PropTypes.func,
        };
    }

    render() {
        const image = this.props.uri ?
            <Image
                source={{uri: this.props.uri}} 
                style={styles.image} />
            :
            null;

        return (
            <View style={styles.imageContainer}>

                {image}

                <Touchable
                    onPress={this.props.handlePress}
                    style={styles.editImageContainer} >
                    <Icon
                        name='camera'
                        style={styles.editImageIcon} />
                </Touchable>
                
            </View>
        );
    }
}