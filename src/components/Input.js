import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Dimensions,
    Animated,
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
    },
    togglePasswordContainer: {

    },
    togglePasswordText: {
        fontSize: 16,
        color: styleConstants.white
    },
    input: {
        fontSize: 18,
        color: styleConstants.white,
        paddingLeft: 0,
        paddingRight: 32,
        borderBottomWidth: 1,
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
		this.labelUpTopValue = 0;
		this.labelDownTopValue = 32;
		this.labelUpFontSize = 16;
		this.labelDownFontSize = 18;
		this.labelUpColor = styleConstants.secondary;
		this.labelDownColor = styleConstants.lightGrey;
        this.labelUpBorderColor = styleConstants.white;
        this.labelDownBorderColor = styleConstants.lightGrey

        this.state = {
            hidePassword: true,
            inputHeight: this.minimumInputHeight,
			labelTop: new Animated.Value(this.labelDownTopValue),
			labelFontSize: new Animated.Value(this.labelDownFontSize),
			labelColor: this.labelDownColor,
            borderColor: this.labelDownBorderColor,
        }

		this.focusInput = this.focusInput.bind(this);
		this.blurInput = this.blurInput.bind(this);
		this.floatLabel = this.floatLabel.bind(this);
		this.sinkLabel = this.sinkLabel.bind(this);
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

	componentDidMount() {
		if (this.props.value && this.props.value.length > 0) {
			this.setState({
				labelTop: new Animated.Value(this.labelUpTopValue),
				labelFontSize: new Animated.Value(this.labelUpFontSize),
				labelColor: this.labelUpColor,
                borderColor: this.labelUpBorderColor
			});
		}
	}

    focusInput() {
		this.floatLabel();

		this.props.handleFocus(this.props.focusRef);
    }

    blurInput() {
		this.sinkLabel();
    }

    floatLabel() {
		if (!this.props.value || this.props.value.length === 0) {
			Animated.parallel([
				Animated.timing(this.state.labelTop, {
					toValue: this.labelUpTopValue,
					duration: 250
				}),
				Animated.timing(this.state.labelFontSize, {
					toValue: this.labelUpFontSize,
					duration: 250
				})
			]).start();

			this.setState({ 
                labelColor: this.labelUpColor,
                borderColor: this.labelUpBorderColor, 
            });
		}
    }

    sinkLabel() {
		if (!this.props.value || this.props.value.length === 0) {
			Animated.parallel([
				Animated.timing(this.state.labelTop, {
					toValue: this.labelDownTopValue,
					duration: 250
				}),
				Animated.timing(this.state.labelFontSize, {
					toValue: this.labelDownFontSize,
					duration: 250
				})
			]).start();

			this.setState({ 
                labelColor: this.labelDownColor,
                borderColor: this.labelDownBorderColor,  
            });
		}
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
        const togglePasswordButton = (this.props.type === 'password' && this.state.labelColor === this.labelUpColor /* this is just a flag to indicate that the label is at top position */) ?
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
                    handlePress={() => this.props.handleChange('')} />
            </View>
            :
            null;

        const inputLabelStyles = 
        {
            fontSize: this.state.labelFontSize,
            top: this.state.labelTop,
            color: this.state.labelColor,
        }

        const inputStyles = 
        {
            height: this.state.inputHeight,
            borderBottomColor: this.state.borderColor,
        }

        return (
            <TouchableWithoutFeedback
                onPress={() => this.refs.input.focus()}>
                <View style={styles.inputWrapper}>

                    <View style={styles.inputLabelContainer}>
                        <Animated.Text 
                            style={[styles.inputLabelText, inputLabelStyles, styleConstants.robotoCondensed]} >
                            {this.props.placeholder}
                        </Animated.Text>
                        
                        {togglePasswordButton}
                    </View>

                    <TextInput
                        ref='input'
                        value={this.props.value ? this.props.value : ''}
                        underlineColorAndroid='transparent'
                        style={[styles.input, inputStyles,  styleConstants.robotoCondensed]}
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