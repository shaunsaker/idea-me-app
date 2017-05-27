import React from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
	container: {
		height: 50,
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
                        size={28}
                        color={this.props.currentPage === 'ideas' ? styleConstants.secondary : styleConstants.white}
                        style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => Actions.addIdea()}
                    style={styles.iconContainer}>
                    <Icon
                        name='add'
                        size={28}
                        color={this.props.currentPage === 'addIdea' ? styleConstants.secondary : styleConstants.white}
                        style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => null} // TODO: Add profile page
                    style={styles.iconContainer}>
                    <Icon
                        name='face'
                        size={28}
                        color={this.props.currentPage === 'profile' ? styleConstants.secondary : styleConstants.white}
                        style={styles.icon} />
                </TouchableOpacity>
			</View>
		);
	}
};