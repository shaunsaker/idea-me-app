import React from 'react';
import {
    Animated,
	StyleSheet,
} from 'react-native';

import config from '../../config';
import styleConstants from '../../styles/styleConstants';

import AnimateFadeIn from '../../animators/AnimateFadeIn';

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

		this.position = new Animated.Value(-100);	

		this.animateRight = this.animateRight.bind(this);	
	}

	componentDidMount() {
		this.animateRight();
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
			left: this.position,
		}

		return (
            <AnimateFadeIn>
			    <Animated.View style={[styles.container, animatedStyles]} />
            </AnimateFadeIn>
		);
	}
}