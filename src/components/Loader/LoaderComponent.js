import React from 'react';
import {
	StyleSheet,
	Animated,
} from 'react-native';

import config from '../../config';
import styleConstants from '../../styles/styleConstants';

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 5,
		backgroundColor: styleConstants.secondary,
	},
});

export default class LoaderComponent extends React.Component {
	constructor() {
		super();

		this.opacity = new Animated.Value(0);
		this.position = new Animated.Value(-100);	

		this.animateOpacity = this.animateOpacity.bind(this);
		this.animateRight = this.animateRight.bind(this);	
	}

	componentDidMount() {
		this.animateOpacity();
		this.animateRight();
	}

	animateOpacity() {
		Animated.timing(
			this.opacity,
			{
				toValue: 1,
				duration: 2000,
				easing: config.animation.easing
			}
		).start();
	}

	animateRight() {
		this.position.setValue(-100);

		Animated.timing(
			this.position,
			{
				toValue: styleConstants.windowWidth,
				duration: 2000,
				easing: config.animation.easing
			}
		).start(() => {
			this.animateRight()
		});
	}

	render() {
		const animatedStyles = {
			opacity: this.opacity,
			left: this.position,
		}

		return (
			<Animated.View style={[styles.container, animatedStyles]} />
		);
	}
}