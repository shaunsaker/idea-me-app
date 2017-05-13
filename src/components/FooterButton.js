import React from "react";
import {
    Text, 
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    button: {   
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,     
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
        backgroundColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        height: 56,
    },
    icon: {

    },
});

export default class FooterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            iconName: React.PropTypes.string.isRequired,
            handlePress: React.PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.handlePress} >
                <MaterialIcon
                    name={this.props.iconName}
                    size={28}
                    color={styleConstants.primary}
                    style={styles.icon} />
            </TouchableOpacity>
        );
    }
}