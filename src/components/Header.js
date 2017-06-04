import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StatusBar,
	StyleSheet,
	Dimensions,
	Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DeleteButton from './DeleteButton';

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		width: windowWidth,
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		paddingHorizontal: 16,
		backgroundColor: styleConstants.primary,
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		color: styleConstants.white,
	},
	leftIconContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	leftIcon: {
		marginLeft: -12
	},
	rightIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	rightIcon: {
		marginRight: -6
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
        fontSize: 18,
        color: styleConstants.white,
        paddingLeft: 16,
        paddingRight: 32,
	},
    clearTextButtonContainer: {
        position: 'absolute',
        bottom: 12,
        right: 0,
        height: 30,
        justifyContent: 'center',
    },
});

export default class Header extends React.Component {
	static get propTypes() {
		return {
			headerContainerStyle: React.PropTypes.object,
			leftComponent: React.PropTypes.func,
			textComponent: React.PropTypes.func,
			text: React.PropTypes.string,
			textLeft: React.PropTypes.bool,
			textRight: React.PropTypes.bool,
			handleTextPress: React.PropTypes.func,
			rightComponent: React.PropTypes.func,
			showInput: React.PropTypes.bool,
			inputValue: React.PropTypes.string,
			inputPlaceholderText: React.PropTypes.string,
			handleChangeText: React.PropTypes.func,
			headerShadow: React.PropTypes.bool,
		}
	}

	render() {
		const headerShadowStyles = this.props.headerShadow ?
			{
				elevation: 5,
				shadowColor: "#000000",
				shadowOpacity: 0.6,
				shadowRadius: 2,
				shadowOffset: {
					height: 1,
					width: 0
				},
			}
			:
			{};

		const leftIcon = this.props.leftComponent ?
			<View style={styles.leftIconContainer}>
				{this.props.leftComponent()}
			</View>
			:
			this.props.backButton ?
				<TouchableOpacity
					style={this.props.showInput ? {justifyContent: 'center'} : styles.leftIconContainer}
					onPress={() => Actions.pop()} >
					<Icon
						name='chevron-left'
						color={styleConstants.white}
						size={36}
						style={styles.leftIcon} />
				</TouchableOpacity>
				:
				this.props.textLeft ?
					null
					:
					<View style={styles.leftIconContainer} />;

		const textRightStyles = this.props.textRight ?
			{ alignItems: 'flex-end'}
			:
			null;

		const text = this.props.textComponent ?
			this.props.textComponent()
			:
			this.props.handleTextPress ?
				<TouchableOpacity
					style={[styles.textContainer, textRightStyles]}
					onPress={this.props.handleTextPress} >
					<Text style={[styles.text, styleConstants.robotoCondensed, this.props.textStyle]}>{this.props.text}</Text>
				</TouchableOpacity>
				:
				this.props.showInput ?
					null
					:
					<View style={[styles.textContainer, textRightStyles]}>
						<Text style={[styles.text, styleConstants.robotoCondensed, this.props.textStyle]}>{this.props.text}</Text>
					</View>;

		const rightIcon = this.props.rightComponent ?
			<View style={styles.rightIconContainer}>
				{this.props.rightComponent()}
			</View>
			:
			this.props.closeButton ?
				<TouchableOpacity
					style={styles.rightIconContainer}
					onPress={() => Actions.pop()} >
					<Icon
						name='close'
						color={styleConstants.white}
						size={28}
						style={styles.rightIcon} />
				</TouchableOpacity>
				:
				(this.props.textRight || this.props.showInput) ? 
					null 
					: 
					<View style={styles.rightIconContainer} />;

		const clearTextButton = this.props.inputValue ?
			<View style={styles.clearTextButtonContainer}>
				<DeleteButton 
					handlePress={() => this.props.handleChangeText('')}/>
			</View>
			:
			null;

		const input = this.props.showInput ?
			<View style={styles.inputContainer}>
				<TextInput
					value={this.props.inputValue}
					placeholder={this.props.inputPlaceholderText}
					placeholderTextColor={styleConstants.lightGrey}
					onChangeText={(text) => this.props.handleChangeText(text)}
					underlineColorAndroid='transparent'
					style={[styles.input, styleConstants.robotoCondensed]}/>
				{clearTextButton}
			</View>
			:
			null;

		return (
			<View>
				<StatusBar backgroundColor={styleConstants.transPrimary} />
				<View style={[styles.container, headerShadowStyles]}>
					{leftIcon}
					{text}
					{rightIcon}
					{input}
				</View>
			</View>
		);
	}
};