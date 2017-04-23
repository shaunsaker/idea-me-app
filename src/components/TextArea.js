import React from "react";
import {
    TextInput
} from "react-native";

import styles from '../styles/components/TextArea';
import styleConstants from '../styles/styleConstants';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {

        return {
            placeholder: React.PropTypes.string,
            handleChange: React.PropTypes.func,
            value: React.PropTypes.string,
        };
    }

    render() {
        return (
            <TextInput
                value={this.props.value ? this.props.value : ''}
                placeholder={this.props.placeholder ? this.props.placeholder : ''} 
                style={[styles.textarea, styleConstants.sourceSansPro]}
                onChangeText={(text) => this.props.handleChange(text)} 
                multiline={true} />
        );
    }
}