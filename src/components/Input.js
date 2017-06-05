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

import DeleteButton from './DeleteButton';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputWrapper: {
        width: windowWidth - 32,
        marginVertical: 16,
        alignSelf: 'center',
    },
    inputLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabelText: {
        fontSize: 18,
        color: styleConstants.secondary
    },
    togglePasswordContainer: {

    },
    togglePasswordText: {
        fontSize: 18,
        color: styleConstants.white
    },
    input: {
        fontSize: 18,
        color: styleConstants.white,
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
});

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.minimumInputHeight = 45.5;

        this.state = {
            hidePassword: true,
            inputHeight: this.minimumInputHeight,
        }

        this.togglePassword = this.togglePassword.bind(this);
        this.adjustInputHeight = this.adjustInputHeight.bind(this);
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
            multiline: React.PropTypes.bool,
        };
    }

    togglePassword() {
        this.setState({
            hidePassword: !this.state.hidePassword
        });
    }

    adjustInputHeight(event) {
        const newInputHeight = event.nativeEvent.contentSize.height;

        if (newInputHeight > this.minimumInputHeight) {
            this.setState({
                inputHeight: newInputHeight
            });
        }

        // If an input was cleared
        else if (this.minimumInputHeight > newInputHeight) {
            this.setState({
                inputHeight: this.minimumInputHeight
            });
        }
    }

    render() {
        const togglePasswordButton = this.props.type === 'password' ?
            <TouchableOpacity
                onPress={this.togglePassword}
                style={styles.togglePasswordContainer}>
                <Text style={[styles.togglePasswordText, styleConstants.robotoCondensed]}>
                    {this.state.hidePassword ? 'Show' : 'Hide'}
                </Text>
            </TouchableOpacity>
            :
            null;

        const clearTextButton = this.props.value ?
            <View style={styles.clearTextButtonContainer}>
                <DeleteButton 
                    handlePress={() => this.props.handleChange('')}/>
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
                    style={[{height: this.state.inputHeight}, styles.input, styleConstants.robotoCondensed]}
                    onChangeText={(text) => this.props.handleChange(text)}
                    onFocus={this.props.handleFocus}
                    secureTextEntry={this.props.type === 'password' && this.state.hidePassword}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    autoFocus={this.props.autoFocus} 
                    multiline={this.props.multiline}
                    onChange={this.props.multiline ? (event) => this.adjustInputHeight(event) : null /*NOTE: this does not work with onContentSizeChange */} />
                {clearTextButton}
            </View>
        );
    }
}