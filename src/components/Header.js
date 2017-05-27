/*

A super simple Header component that includes left and right icons with centred text.
Each of these can be customised via color, size and style.
The icon names refer to Material Icon names.
The status bar is also styled on both Android and iOS. Use statusBarStyle to set the content of the status bar to light or dark, ie. statusBarStyle='dark-content'

Have a look at the propTypes to see what other props it takes.

*/

import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	StyleSheet,
	Dimensions,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

// Create a status bar height on iOS only
const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

const headerShadowStyles = Platform.OS === 'ios' ? 
	{
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

const styles = StyleSheet.create({
	statusBar: {
		height: statusBarHeight
	},
	container: {
		width: windowWidth,
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		paddingHorizontal: 16,
	},
	textContainer: {
		justifyContent: 'center',
	},
	text: {
		fontSize: 18
	},
	leftIconContainer: {
		justifyContent: 'center',
	},
	leftIcon: {
		marginLeft: -12
	},
	rightIconContainer: {
		justifyContent: 'center',
	},
	rightIcon: {
		marginRight: -12
	}
});

const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={styleConstants.transPrimary} {...props} />
  </View>
);

export default class Header extends React.Component {
	static get propTypes() {
		return {
			statusBarStyle: React.PropTypes.string, 

			headerContainerStyle: React.PropTypes.object,
			backgroundColor: React.PropTypes.string,
			contentColor: React.PropTypes.string,

			leftIconName: React.PropTypes.string,
			leftIconSize: React.PropTypes.number,
			handleLeftIconPress: React.PropTypes.func,

			text: React.PropTypes.string,
			textRight: React.PropTypes.bool,
			handleTextPress: React.PropTypes.func,

			rightIconName: React.PropTypes.string,
			rightIconSize: React.PropTypes.number,
			handleRightIconPress: React.PropTypes.func,
		}
	}

	render() {
		const iOSStatusBar = Platform.OS === 'ios' ?
			<View
				style={{height: 20, backgroundColor: this.props.backgroundColor}} />
			:	
			null;

		const leftIcon = this.props.leftIconName ?
			<TouchableOpacity
				style={styles.leftIconContainer}
				onPress={this.props.handleLeftIconPress} >
				<Icon
					name={this.props.leftIconName}
					color={this.props.contentColor}
					size={this.props.leftIconSize}
					style={[styles.leftIcon, this.props.leftIconStyle]} />
			</TouchableOpacity>
			:
			<View style={{ width: this.props.leftIconSize }} />;

		const text = this.props.handleTextPress ?
			<TouchableOpacity
				style={styles.textContainer}
				onPress={this.props.handleTextPress} >
				<Text style={[{ color: this.props.contentColor }, styles.text,  this.props.textStyle]}>{this.props.text}</Text>
			</TouchableOpacity>
			:
			<View style={styles.textContainer}>
				<Text style={[{ color: this.props.contentColor }, styles.text, this.props.textStyle]}>{this.props.text}</Text>
			</View>;

		const rightIcon = this.props.rightIconName ?
			<TouchableOpacity
				style={styles.rightIconContainer}
				onPress={this.props.handleRightIconPress} >
				<Icon
					name={this.props.rightIconName}
					color={this.props.contentColor}
					size={this.props.rightIconSize}
					style={[styles.rightIcon, this.props.rightIconStyle]} />
			</TouchableOpacity>
			:
			this.props.textRight ? null : <View style={{ width: this.props.leftIconSize }} />;

		return (
			<View style={headerShadowStyles}>
				<CustomStatusBar
					backgroundColor={this.props.backgroundColor} barStyle={this.props.statusBarStyle} />
				<View style={[styles.container, { backgroundColor: this.props.backgroundColor }, this.props.headerContainerStyle]}>
					{leftIcon}
					{text}
					{rightIcon}
				</View>
			</View>
		);
	}
};