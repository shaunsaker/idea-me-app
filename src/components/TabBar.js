import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
	container: {
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: styleConstants.primary,
	},
	tabContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	iconContainer: {
		paddingHorizontal: 16,
	},
	icon: {
		fontSize: styleConstants.iconFont,
	},
	text: {
		fontSize: styleConstants.smallFont,
		marginTop: 2,
	},
});

export default TabBar = (props) => {
	const tabs = 
		props.tabs.map((value) => {
			const colorStyles = {
				color: value.active ? styleConstants.secondary : props.color ? props.color : styleConstants.white
			};

			return (
				<Touchable
					onPress={value.action}
					style={styles.tabContainer}
					key={'tab-' + value.title}>
					<View style={styles.iconContainer}>
						<Icon
							name={value.icon}
							style={[styles.icon, colorStyles]} />
					</View>
					<Text style={[styles.text, styleConstants.primaryFont, colorStyles]}>
						{value.title}
					</Text>
				</Touchable>
			);
		});

	const backgroundColorStyles = props.backgroundColor ?
		{
			backgroundColor: props.backgroundColor,
		}
		:
		null;

	return (
		<View style={[styles.container, backgroundColorStyles]}>
			{tabs}
		</View>
	);
};