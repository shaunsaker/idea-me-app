import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: styleConstants.transPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    modal: {
        width: window.width - 32,
        backgroundColor: styleConstants.white,
        borderRadius: 16
    },
    textContainer: {
        padding: 16,
    },
    text: {
        fontSize: 18,
        color: styleConstants.primary,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    icon: {

    }
});

export default class ActionModal extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string,
            handleLeftIconPress: React.PropTypes.func,
            handleRightIconPress: React.PropTypes.func,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styleConstants.robotoCondensed]}>{this.props.text}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={this.props.handleLeftIconPress} >
                            <MaterialIcon
                                name='check'
                                color={styleConstants.danger}
                                size={28}
                                style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={this.props.handleRightIconPress} >
                            <MaterialIcon
                                name='close'
                                color={styleConstants.primary}
                                size={28}
                                style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}