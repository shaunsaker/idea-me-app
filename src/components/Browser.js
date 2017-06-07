import React from "react";
import {
	View,
	TouchableOpacity,
	Text,
	WebView,
	StyleSheet,
	Animated,
	Dimensions,
	Clipboard,
	Share,
	Linking
} from "react-native";
import { Actions } from 'react-native-router-flux';
import Icon from '../styles/icons/index';

import config from '../config';
import utilities from '../utilities';

import Header from './Header';
import ActionSheet from './ActionSheet';
import Loader from './Loader';
import Growl from './Growl';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		backgroundColor: styleConstants.white,
		position: 'absolute',
		width: window.width,
		height: window.height,
		elevation: 5,
		shadowColor: "#000000",
		shadowOpacity: 0.6,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
	},
	webView: {

	},
	icon: {
		fontSize: styleConstants.iconFont,
		color: styleConstants.primary,
	}
});

export default class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		this.animatePosition = this.animatePosition.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.toggleActionSheet = this.toggleActionSheet.bind(this);
		this.copyToClipboard = this.copyToClipboard.bind(this);
		this.share = this.share.bind(this);
		this.openInBrowser = this.openInBrowser.bind(this);

		this.state = {
			loading: true,
			showActionSheet: false,
		}

		this.position = new Animated.Value(window.height);
	}

	static get propTypes() {
		return {
			uri: React.PropTypes.string
		};
	}

	static defaultProps = {
		uri: 'https://google.com'
	}

	componentDidMount() {
		this.animatePosition();
	}

	animatePosition() {
		Animated.timing(
			this.position,
			{
				toValue: 0,
				duration: config.animation.duration.long,
				easing: config.animation.easing,
			}
		).start();
	}

	toggleLoading() {
		this.setState({
			loading: !this.state.loading
		});
	}

	toggleActionSheet() {
		this.setState({
			showActionSheet: !this.state.showActionSheet
		});
	}

	copyToClipboard() {
		Clipboard.setString(this.props.uri);
		this.toggleActionSheet();
		this.props.handleCopySuccess();
	}

	share() {
		Share.share({
			message: this.props.uri
		}, {
			dialogTitle: 'Share this Link',
		});
		this.toggleActionSheet();
	}

	openInBrowser() {
		Linking.openURL(this.props.uri).catch(error => console.error('An error occurred', error));
		this.toggleActionSheet();
	}

	render() {
		const prettyUrl = utilities.prettifyUrl(this.props.uri);

		const actionSheet = this.state.showActionSheet ?
			<ActionSheet
				handleCopy={this.copyToClipboard}
				handleShare={this.share}
				handleClose={this.toggleActionSheet} 
				handleLink={this.openInBrowser}/>
			:
			<View />;

		return (
			<Animated.View style={[styles.container, { top: this.position }]}>

				<Header
					headerShadow
					leftIconName='close'
					handleLeftIconPress={this.props.handleClose}
					text={prettyUrl}
					rightIconName='home'
					handleRightIconPress={this.toggleActionSheet} />

				<WebView
					source={{ uri: this.props.uri }}
					style={styles.webView}
					onLoadEnd={() => this.toggleLoading()}
					onError={this.props.handleBrowserError} />

				{actionSheet}

				<Loader
					customLoader
					positionStyle={{top: 56}} />

				<Growl />

			</Animated.View>
		);
	}
}