import React from "react";
import {
    TextInput,
    StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    input: {
        width: 280,
        fontSize: 18,
        color: styleConstants.primary,
        paddingBottom: 16,
        height: 41.5 + 16
    }
});

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
                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'} 
                autoFocus={this.props.autoFocus} />
        );
    }
}