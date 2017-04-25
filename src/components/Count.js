import React from "react";
import {
    View,
    Text
} from "react-native";

import styles from '../styles/components/Count';
import styleConstants from '../styles/styleConstants';

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
                <Text style={[styles.countText, ...styleConstants.robotoCondensed]}>
                    {this.props.count}
                    <Text style={styles.separator}> / </Text>
                    {this.props.total}
                    <Text style={styles.unit}>{' ' + this.props.unit}</Text>
                </Text>
            </View>
        );
    }
}