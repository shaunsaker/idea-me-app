import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from '../styles/icons/index';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
	container: {
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: styleConstants.lightGrey,
        backgroundColor: styleConstants.primary,
	},
	tabContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	icon: {
        fontSize: 18,
	},
	text: {
		fontSize: 16,
		marginTop: 2,
	}
});

export default class TabBar extends React.Component {
	render() {
		return (
			<View style={styles.container}>
                <TouchableOpacity 
                    onPress={() => Actions.ideas()}
                    style={styles.tabContainer}>
                    <Icon
                        name='home'
                        style={[styles.icon, {color: this.props.currentPage === 'ideas' ? styleConstants.secondary : styleConstants.white}]} />
					<Text style={[styles.text, {color: this.props.currentPage === 'ideas' ? styleConstants.secondary : styleConstants.white}, styleConstants.robotoCondensed]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => Actions.addIdea()}
                    style={styles.tabContainer}>
                    <Icon
                        name='add'
                        style={[styles.icon, {color: this.props.currentPage === 'addIdea' ? styleConstants.secondary : styleConstants.white}]} />
					<Text style={[styles.text, {color: this.props.currentPage === 'addIdea' ? styleConstants.secondary : styleConstants.white}, styleConstants.robotoCondensed]}>Add Idea</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => Actions.profile()} 
                    style={styles.tabContainer}>
                    <Icon
                        name='face'
                        style={[styles.icon, {color: this.props.currentPage === 'profile' ? styleConstants.secondary : styleConstants.white}]} />
					<Text style={[styles.text, {color: this.props.currentPage === 'profile' ? styleConstants.secondary : styleConstants.white}, styleConstants.robotoCondensed]}>Profile</Text>
                </TouchableOpacity>
			</View>
		);
	}
};