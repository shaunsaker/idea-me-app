import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    countContainer: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: 18,
        color: styleConstants.white
    },
});

export default class Count extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            count: React.PropTypes.number.isRequired,
            total: React.PropTypes.number.isRequired,
            unit: React.PropTypes.string.isRequired,
        };
    }

    render() {
        return (
            <View style={styles.countContainer}>
                <Text style={[styles.countText, styleConstants.robotoCondensed]}>
                    {this.props.count}
                    <Text style={styles.separator}> of </Text>
                    {this.props.total}
                    <Text style={styles.unit}>{' ' + this.props.unit}</Text>
                </Text>
            </View>
        );
    }
}