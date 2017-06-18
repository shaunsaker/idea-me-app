import React from 'react';
import {
	View,
	Text,
	TextInput,
	StatusBar,
	StyleSheet,
	Dimensions,
	Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import DeleteButton from './DeleteButton';

const windowWidth = Dimensions.get('window').width;

const iosStyles = Platform.OS === 'ios' &&
	{
		paddingTop: 20,
		height: 76,
	};

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
	leftIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	leftIcon: {
		fontSize: styleConstants.iconFont,
		color: styleConstants.white,
	},
	textContainer: {
		flex: 3, // make the text container 3 times as big as the icon containers
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: styleConstants.regularFont,
		color: styleConstants.lightGrey,
	},
	rightIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	rightIcon: {
		fontSize: styleConstants.iconFont,
		color: styleConstants.white,
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		fontSize: styleConstants.regularFont,
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
			this.props.leftIconName ?
				<Touchable
					style={(this.props.showInput || this.props.textLeft) ? { justifyContent: 'center' } : styles.leftIconContainer}
					onPress={() => this.props.handleLeftIconPress} >
					<Icon
						name={this.props.leftIconName}
						style={styles.leftIcon} />
				</Touchable>
				:
				this.props.backButton ?
					<Touchable
						style={this.props.showInput ? { justifyContent: 'center' } : styles.leftIconContainer}
						onPress={() => Actions.pop()} >
						<Icon
							name='chevron_left'
							style={styles.leftIcon} />
					</Touchable>
					:
					this.props.textLeft ?
						null
						:
						<View style={styles.leftIconContainer} />;

		const textLeftStyles = this.props.textLeft ?
			{ 
				alignItems: 'flex-start',
				paddingLeft: 8,
			}
			:
			null;

		const textRightStyles = this.props.textRight ?
			{ alignItems: 'flex-end' }
			:
			null;

		const text = this.props.textComponent ?
			this.props.textComponent()
			:
			this.props.handleTextPress ?
				<Touchable
					style={[styles.textContainer, textLeftStyles, textRightStyles]}
					onPress={this.props.handleTextPress} >
					<Text style={[styles.text, styleConstants.primaryFont, this.props.textStyle]}>{this.props.text}</Text>
				</Touchable>
				:
				(this.props.showInput || !this.props.text) ?
					null
					:
					<View style={[styles.textContainer, textLeftStyles, textRightStyles]}>
						<Text style={[styles.text, styleConstants.primaryFont, this.props.textStyle]}>{this.props.text}</Text>
					</View>;

		const rightIcon = this.props.rightComponent ?
			<View style={this.props.showInput ? { justifyContent: 'center' } : styles.rightIconContainer}>
				{this.props.rightComponent()}
			</View>
			:
			this.props.rightIconName ?
				<Touchable
					style={styles.rightIconContainer}
					onPress={this.props.handleRightIconPress} >
					<Icon
						name={this.props.rightIconName}
						style={styles.rightIcon} />
				</Touchable>
				:
				this.props.closeButton ?
					<Touchable
						style={styles.rightIconContainer}
						onPress={() => Actions.pop()} >
						<Icon
							name='close'
							style={styles.rightIcon} />
					</Touchable>
					:
					(this.props.textRight || this.props.showInput) ?
						null
						:
						<View style={styles.rightIconContainer} />;

		const clearTextButton = this.props.inputValue ?
			<View style={styles.clearTextButtonContainer}>
				<DeleteButton
					handlePress={() => this.props.handleChangeText('')} />
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
					style={[styles.input, styleConstants.primaryFont]} />
				{clearTextButton}
			</View>
			:
			null;

		return (
			<View>
				<StatusBar
					backgroundColor={styleConstants.transPrimary}
					barStyle='light-content' />
				<View style={[styles.container, headerShadowStyles, iosStyles]}>
					{leftIcon}
					{text}
					{input}
					{rightIcon}
				</View>
			</View>
		);
	}
};