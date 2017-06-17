import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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
	highlightContainer: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		alignItems: 'flex-end',
	},
	highlight: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: styleConstants.secondary,
	},
});

export default TabBar = (props) => {
	const highlightProfileTab = props.firstTimeUser ?
		<View style={styles.highlightContainer}>
			<View style={styles.highlight} />
		</View>
		:
		null;

	return (
		<View style={styles.container}>
			<Touchable
				onPress={() => Actions.home()}
				style={styles.tabContainer}>
				<View style={styles.iconContainer}>
					<Icon
						name='home'
						style={[styles.icon, { color: props.currentPage === 'home' ? styleConstants.secondary : styleConstants.white }]} />
				</View>
				<Text style={[styles.text, { color: props.currentPage === 'home' ? styleConstants.secondary : styleConstants.white }, styleConstants.primaryFont]}>Home</Text>
			</Touchable>

			<Touchable
				onPress={() => Actions.addIdea()}
				style={styles.tabContainer}>
				<View style={styles.iconContainer}>
					<Icon
						name='add'
						style={[styles.icon, { color: props.currentPage === 'addIdea' ? styleConstants.secondary : styleConstants.white }]} />
				</View>
				<Text style={[styles.text, { color: props.currentPage === 'addIdea' ? styleConstants.secondary : styleConstants.white }, styleConstants.primaryFont]}>Add Idea</Text>
			</Touchable>

			<Touchable
				onPress={() => Actions.categories()}
				style={styles.tabContainer}>
				<View style={styles.iconContainer}>
					<Icon
						name='folder'
						style={[styles.icon, { color: props.currentPage === 'categories' ? styleConstants.secondary : styleConstants.white }]} />
				</View>
				<Text style={[styles.text, { color: props.currentPage === 'categories' ? styleConstants.secondary : styleConstants.white }, styleConstants.primaryFont]}>Categories</Text>
			</Touchable>

			<Touchable
				onPress={() => Actions.profile()}
				style={styles.tabContainer}>
				<View style={styles.iconContainer}>
					<Icon
						name='person'
						style={[styles.icon, { color: props.currentPage === 'profile' ? styleConstants.secondary : styleConstants.white }]} />

					{highlightProfileTab}
				</View>
				<Text style={[styles.text, { color: props.currentPage === 'profile' ? styleConstants.secondary : styleConstants.white }, styleConstants.primaryFont]}>Profile</Text>
			</Touchable>
		</View>
	);
};