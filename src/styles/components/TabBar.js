import { 
	StyleSheet,
	Dimensions,
 } from 'react-native';

import styleConstants from '../styleConstants'

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
	container: {
		backgroundColor: styleConstants.white,
		elevation: 5,
		shadowColor: "#000000",
		shadowOpacity: 0.6,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
	},
	iconContainer: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
	}
})