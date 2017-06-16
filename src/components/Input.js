import React from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Dimensions,
    Animated,
    Platform,
} from "react-native";

import config from '../config';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
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
        fontSize: styleConstants.smallFont,
    },
    input: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        paddingLeft: 0,
        paddingRight: 32,
    },

    clearTextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 45.5,
        paddingLeft: 8,
        justifyContent: 'center',
    },

    togglePasswordContainer: {

    },
    togglePasswordText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white
    },
});

class TogglePasswordButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rightPosition: new Animated.Value(-40) // start hidden
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.rightPosition,
            {
                toValue: 0,
                duration: config.animation.duration.short,
                easing: config.animation.easing,
            }
        ).start();
    }

    render() {
        const animatedStyles = {
            right: this.state.rightPosition,
        }

        return (
            <Animated.View style={animatedStyles}>
                <Touchable
                    onPress={this.props.handlePress}
                    style={styles.togglePasswordContainer} >
                    <Text style={[styles.togglePasswordText, styleConstants.primaryFont]}>
                        {this.props.hidePassword ? 'Show' : 'Hide'}
                    </Text>
                </Touchable>
            </Animated.View>
        )
    }
}

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.minimumInputHeight = 45.5;
        this.inputLabelColourFocussed = styleConstants.secondary;
        this.inputLabelColourBlurred = styleConstants.lightGrey;
        this.inputBorderColourFocussed = styleConstants.white;
        this.inputBorderColourBlurred = styleConstants.lightGrey;

        this.state = {
            showTogglePasswordButton: false,
            hidePassword: true,
            inputHeight: this.minimumInputHeight,
            labelColour: this.inputLabelColourBlurred,
            borderColour: this.inputBorderColourBlurred,
        }

        this.focusInput = this.focusInput.bind(this);
        this.blurInput = this.blurInput.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.clearInputText = this.clearInputText.bind(this);
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

    focusInput() {
        this.setState({
            labelColour: this.inputLabelColourFocussed,
            borderColour: this.inputBorderColourFocussed,
            showTogglePasswordButton: true,
        });

        this.props.handleFocus;
    }

    blurInput() {
        this.setState({
            labelColour: this.inputLabelColourBlurred,
            borderColour: this.inputBorderColourBlurred,
            showTogglePasswordButton: false,
        });
    }

    clearInputText() {
        this.refs.input.focus();
        this.props.handleChange('');
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
        const togglePasswordButton = this.props.type === 'password' && this.state.showTogglePasswordButton &&
            <TogglePasswordButton
                hidePassword={this.state.hidePassword}
                handlePress={this.togglePassword} />;

        const clearTextButton = this.props.value ?
            <View style={styles.clearTextButtonContainer}>
                <DeleteButton 
                    handlePress={this.clearInputText}/>
            </View>
            :
            null;

        const inputLabelStyles = {
            color: this.state.labelColour,
        } 

        // Fix for ios
		const inputContainerStyles = Platform.OS === 'ios' && 
            {
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColour,
            };

        // Fix for Android 
        const androidInputStyles = Platform.OS === 'android' &&
            {
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColour,
            };    

        const inputStyles = {
            height: this.state.inputHeight,
        }

        return (
            <TouchableWithoutFeedback
                onPress={() => this.refs.input.focus()} >
                <View style={[styles.inputWrapper, inputContainerStyles]}>
                    <View style={styles.inputLabelContainer}>
                        <Text style={[styles.inputLabelText, inputLabelStyles, styleConstants.primaryFont]}>
                            {this.props.placeholder}
                        </Text>
                        {togglePasswordButton}
                    </View>
                    <TextInput
                        ref='input'
                        value={this.props.value ? this.props.value : ''}
                        underlineColorAndroid='transparent'
                        style={[styles.input, androidInputStyles, inputStyles, styleConstants.primaryFont]}
                        onChangeText={(text) => this.props.handleChange(text)}
                        onFocus={this.focusInput}
                        onBlur={this.blurInput}
                        secureTextEntry={this.props.type === 'password' && this.state.hidePassword}
                        keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                        autoFocus={this.props.autoFocus} 
                        multiline={this.props.multiline}
                        onChange={this.props.multiline ? (event) => this.adjustInputHeight(event) : null /*NOTE: this does not work with onContentSizeChange */} />
                    {clearTextButton}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}