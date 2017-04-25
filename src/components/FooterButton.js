import React from "react";
import {
    Text, 
    TouchableOpacity,
} from "react-native";

import styles from '../styles/components/FooterButton';
import styleConstants from '../styles/styleConstants';

import Spinner from './Spinner';

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
            <Spinner />
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