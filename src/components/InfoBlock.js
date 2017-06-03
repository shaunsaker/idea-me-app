import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    infoContainer: {
        paddingRight: 96,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    infoTextTitle: {
        fontSize: 32,
        color: styleConstants.white,
        marginBottom: 8,
    },
    infoTextDescription: {
        fontSize: 18,
        color: styleConstants.white,
    },
});

export default class InputContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string.isRequired,
            subtitle: React.PropTypes.string,
            titleColor: React.PropTypes.string,
            subtitleColor: React.PropTypes.string,
        };
    }
        
    render() {
        return (
            <View style={styles.infoContainer}>
                <Text style={[styles.infoTextTitle, {color: this.props.titleColor}, styleConstants.robotoCondensed]}>
                    {this.props.title}
                </Text>
                <Text style={[styles.infoTextDescription, {color: this.props.subtitleColor}, styleConstants.robotoCondensed]}>
                    {this.props.subtitle}
                </Text>
            </View>
        );
    }
}