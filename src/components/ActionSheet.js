import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Dimensions,
} from "react-native";

import config from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	actionSheetContainer: {
		position: 'absolute',
		left: 16,
		backgroundColor: styleConstants.white,
		elevation: 10,
		shadowColor: "#000000",
		shadowOpacity: 0.6,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
		width: window.width - 32
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16
	},
	closeButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		backgroundColor: styleConstants.lightGrey
	},
	buttonText: {
		fontSize: styleConstants.regularFont,
		color: styleConstants.primary
	},
	icon: {
		fontSize: styleConstants.iconFont,
		color: styleConstants.primary
	}
});

export default class ActionSheet extends React.Component {
	constructor(props) {
		super(props);
		
		this.animatePosition = this.animatePosition.bind(this);
		
		this.position = new Animated.Value(window.height / -2);
	}

    static get propTypes() {
        return {
			handleCopy: React.PropTypes.func,
			handleClose: React.PropTypes.func,
        };
    }

	componentDidMount() {
		this.animatePosition();
	}

	animatePosition() {
		Animated.timing(
			this.position,
			{
				toValue: 16,
				duration: config.animation.duration.long,
				easing: config.animation.easing,
			}
		).start();
	}

	render() {
		return (
			<Animated.View style={[styles.actionSheetContainer, { bottom: this.position }]}>
				<Touchable
					style={styles.button}
					onPress={this.props.handleCopy}
					androidRipple
					androidRippleColor={styleConstants.primary}>
					<Text style={[styles.buttonText, styleConstants.secondaryFont]}>Copy Link</Text>
				</Touchable>
				<Touchable
					style={styles.button}
					onPress={this.props.handleShare}
					androidRipple
					androidRippleColor={styleConstants.primary}>
					<Text style={[styles.buttonText, styleConstants.secondaryFont]}>Share Link</Text>
				</Touchable>
				<Touchable
					style={styles.button}
					onPress={this.props.handleLink}
					androidRipple
					androidRippleColor={styleConstants.primary}>
					<Text style={[styles.buttonText, styleConstants.secondaryFont]}>Open in Browser</Text>
				</Touchable>
				<Touchable 
					style={styles.closeButton}
					onPress={this.props.handleClose}
					androidRipple
					androidRippleColor={styleConstants.primary} >
					<Icon
						name='close'
						style={styles.icon} />
				</Touchable>
			</Animated.View>
		);
	}
}