import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions
} from "react-native";

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 32
    },
    inputLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabelText: {
        fontSize: 18,
        color: styleConstants.white
    },
    togglePasswordContainer: {

    },
    input: {
        width: windowWidth - 32,
        fontSize: 18,
        color: styleConstants.white,
        height: 50,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.grey
    }
});

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidePassword: true
        }

        this.togglePassword = this.togglePassword.bind(this);
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

    togglePassword() {
        console.log('Pressed')
        this.setState({
            hidePassword: !this.state.hidePassword
        });
    }

    render() {
        const togglePasswordButton = this.props.type === 'password' ?
            <TouchableOpacity 
                onPress={this.togglePassword}
                style={styles.togglePasswordContainer}>
                <Text style={[styles.inputLabelText, styleConstants.robotoCondensed]}>
                    {this.state.hidePassword ? 'Show' : 'Hide'}
                </Text>
            </TouchableOpacity>
            :
            null;            

        return (
            <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                    <Text style={[styles.inputLabelText, styleConstants.robotoCondensed]}>
                        {this.props.placeholder}
                    </Text>
                    {togglePasswordButton}
                </View>
                <TextInput
                    value={this.props.value ? this.props.value : ''}
                    underlineColorAndroid='transparent'
                    style={[styles.input, styleConstants.robotoCondensed]}
                    onChangeText={(text) => this.props.handleChange(text)}
                    secureTextEntry={this.props.type === 'password' && this.state.hidePassword}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    autoFocus={this.props.autoFocus} />
            </View>
        );
    }
}