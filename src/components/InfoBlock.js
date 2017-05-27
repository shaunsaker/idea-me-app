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
    },
    infoTextTitle: {
        fontSize: 32,
        color: styleConstants.white,
        marginBottom: 8
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
        };
    }
        
    render() {
        const flexStyles = this.props.subtitle ?
            { flex: 0.8}
            :
            { flex: 0.4};

        return (
            <View style={[styles.infoContainer, flexStyles]}>
                <Text style={[styles.infoTextTitle, styleConstants.robotoCondensed]}>
                    {this.props.title}
                </Text>
                <Text style={[styles.infoTextDescription, styleConstants.robotoCondensed]}>
                    {this.props.subtitle}
                </Text>
            </View>
        );
    }
}