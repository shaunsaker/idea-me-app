import React from "react";
import {
    TextInput
} from "react-native";

import styles from '../styles/components/Input';
import styleConstants from '../styles/styleConstants';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            placeholder: React.PropTypes.string,
            handleChange: React.PropTypes.func,
            value: React.PropTypes.string,
            type: React.PropTypes.string,
            keyboardType: React.PropTypes.string
        };
    }

    render() {
        return (
            <TextInput
                value={this.props.value ? this.props.value : ''}
                placeholder={this.props.placeholder ? this.props.placeholder : ''} 
                placeholderTextColor={styleConstants.grey}
                underlineColorAndroid={styleConstants.grey}
                style={[styles.input, styleConstants.robotoCondensed]}
                onChangeText={(text) => this.props.handleChange(text)} 
                secureTextEntry={this.props.type === 'password' ? true : false} 
                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'} />
        );
    }
}