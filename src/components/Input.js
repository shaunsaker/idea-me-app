import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputWrapper: {
        width: windowWidth - 32,
        marginBottom: 32
    },
    inputLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabelText: {
        fontSize: 18,
        color: styleConstants.lightGrey
    },
    togglePasswordContainer: {

    },
    input: {
        fontSize: 18,
        color: styleConstants.white,
        height: 50,
        paddingLeft: 0,
        paddingRight: 32,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.lightGrey,
    },
    clearTextButtonContainer: {
        position: 'absolute',
        bottom: 12,
        right: 0,
        height: 30,
        justifyContent: 'center',
    },
    clearTextButton: {
        backgroundColor: styleConstants.lightGrey,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearTextButtonIcon: {

    },
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
            handleFocus: React.PropTypes.func,
            value: React.PropTypes.string,
            type: React.PropTypes.string,
            keyboardType: React.PropTypes.string,
            autoFocus: React.PropTypes.bool,
        };
    }

    togglePassword() {
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

        const clearTextButton = this.props.value ?
            <View style={styles.clearTextButtonContainer}>
                <TouchableOpacity
                    onPress={() => this.props.handleChange('')}
                    style={styles.clearTextButton}>
                    <MaterialIcon
                        name='close'
                        color={styleConstants.primary}
                        size={18}
                        style={styles.clearTextIcon} />
                </TouchableOpacity>
            </View>
            :
            null;

        return (
            <View style={styles.inputWrapper}>
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
                    onFocus={this.props.handleFocus}
                    secureTextEntry={this.props.type === 'password' && this.state.hidePassword}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    autoFocus={this.props.autoFocus} />
                {clearTextButton}
            </View>
        );
    }
}