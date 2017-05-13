import React from "react";
import {
    Text, 
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

import GlowLoader from './GlowLoader';

const styles = StyleSheet.create({
    button: {        
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        marginVertical: 16,
        borderColor: styleConstants.white,
        backgroundColor: styleConstants.primary,
        width: 280,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        height: 68,
    },
    buttonText: {
        fontSize: 24,
        color: styleConstants.white,
        paddingHorizontal: 4,
    },
});

export default class FooterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string.isRequired,
            handlePress: React.PropTypes.func.isRequired,
            loading: React.PropTypes.bool
        };
    }

    render() {
        const content = this.props.loading ?
            <GlowLoader />
            :
            <Text style={[ styles.buttonText, styleConstants.ranga ]}>{this.props.text}</Text>;

        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.handlePress} >
                {content}
            </TouchableOpacity>
        );
    }
}