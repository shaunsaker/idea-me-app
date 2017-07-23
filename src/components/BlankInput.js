import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
} from "react-native";

import config from '../config';
import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import DeleteButton from './DeleteButton';

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        marginLeft: 8,
        alignSelf: 'center',
    },
    inputLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabelText: {
        fontSize: styleConstants.smallFont,
    },
    input: {
        fontSize: styleConstants.regularFont,
        paddingLeft: 0,
        paddingRight: 32,
    },

    clearTextButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 45.5,
        paddingLeft: 8,
        justifyContent: 'center',
    },
});

export default class BlankInput extends React.Component {
    constructor(props) {
        super(props);

        this.focusInput = this.focusInput.bind(this);
        this.blurInput = this.blurInput.bind(this);
        this.clearInputText = this.clearInputText.bind(this);
        this.setInputHeight = this.setInputHeight.bind(this);

        this.minimumInputHeight = 44.5;

        this.state = {
            inputHeight: this.minimumInputHeight,
        }
    }

    static get propTypes() {
        return {
            placeholderText: PropTypes.string,
            placeholderTextColor: PropTypes.string,
            value: PropTypes.string,
            valueColor: PropTypes.string,
            handleChange: PropTypes.func,
            handleFocus: PropTypes.func,
            handleBlur: PropTypes.func,
            autoFocus: PropTypes.bool,
            multiline: PropTypes.bool,
        };
    }

    focusInput() {
        this.props.handleFocus && this.props.handleFocus();
    }

    blurInput() {
        this.props.handleBlur && this.props.handleBlur();
    }

    clearInputText() {
        this.refs.input.focus();
        this.props.handleChange('');
        this.setInputHeight(0);
    }

    setInputHeight(newInputHeight) {
        if (newInputHeight > this.minimumInputHeight) {
            this.setState({
                inputHeight: newInputHeight
            });
        }

        // If an input was cleared
        else if (newInputHeight <= this.minimumInputHeight) {
            this.setState({
                inputHeight: this.minimumInputHeight
            });
        }
    }

    render() {
        const clearTextButton = this.props.value ?
            <View style={styles.clearTextButtonContainer}>
                <DeleteButton
                    handlePress={this.clearInputText} />
            </View>
            :
            null;

        const inputStyles = {
            height: this.state.inputHeight,
            color: this.props.valueColor,
        }

        return (
            <TouchableWithoutFeedback
                onPress={() => this.refs.input.focus()} >
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref='input'
                        placeholder={this.props.placeholderText}
                        placeholderTextColor={this.props.placeholderTextColor}
                        value={this.props.value ? this.props.value : ''}
                        underlineColorAndroid='transparent'
                        style={[styles.input, inputStyles, styleConstants.primaryFont]}
                        onChangeText={(text) => this.props.handleChange(text)}
                        onFocus={this.focusInput}
                        onBlur={this.blurInput}
                        autoFocus={this.props.autoFocus}
                        multiline={this.props.multiline}
                        onChange={this.props.multiline ? (event) => this.setInputHeight(event.nativeEvent.contentSize.height) : null /*NOTE: this does not work with onContentSizeChange */} />

                    {clearTextButton}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}