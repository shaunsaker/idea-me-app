import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

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
        fontSize: 36,
        color: styleConstants.white,
    },
});

export default class EditableImage extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            uri: React.PropTypes.string,
            handlePress: React.PropTypes.func,
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

                <TouchableOpacity
                    onPress={this.props.handlePress}
                    style={styles.editImageContainer}>
                    <Icon
                        name='photo-camera'
                        style={styles.editImageIcon} />
                </TouchableOpacity>
                
            </View>
        );
    }
}