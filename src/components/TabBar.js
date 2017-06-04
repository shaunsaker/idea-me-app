import React from 'react';
import {
	View,
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
		borderTopColor: styleConstants.grey,
        backgroundColor: styleConstants.primary,
	},
	iconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	icon: {
        fontSize: 24,
	}
});

export default class TabBar extends React.Component {
	render() {
		return (
			<View style={styles.container}>
                <TouchableOpacity 
                    onPress={() => Actions.ideas()}
                    style={styles.iconContainer}>
                    <Icon
                        name='home'
                        style={[styles.icon, {color: this.props.currentPage === 'ideas' ? styleConstants.secondary : styleConstants.white}]} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => Actions.addIdea()}
                    style={styles.iconContainer}>
                    <Icon
                        name='add'
                        style={[styles.icon, {color: this.props.currentPage === 'addIdea' ? styleConstants.secondary : styleConstants.white}]} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => Actions.profile()} 
                    style={styles.iconContainer}>
                    <Icon
                        name='face'
                        style={[styles.icon, {color: this.props.currentPage === 'profile' ? styleConstants.secondary : styleConstants.white}]} />
                </TouchableOpacity>
			</View>
		);
	}
};