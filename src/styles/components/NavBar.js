import { StyleSheet } from 'react-native';

import styleConstants from '../styleConstants';

export default styles = StyleSheet.create({
	container: {
		position: 'absolute', 
		top: 0,
		height: 56,
		elevation: 5,
		backgroundColor: styleConstants.primary,
		zIndex: 0,
	},
	containerIOS: {
		shadowColor: "#000000",
		shadowOpacity: 0.6,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
		backgroundColor: styleConstants.primary,
	},
	text: {
		color: styleConstants.white,
		fontSize: 28,
		marginTop: -4
	},
	iconContainer: {

	},
	icon: {
		marginTop: -4,
	}
})