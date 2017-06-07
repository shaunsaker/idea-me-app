import React from 'react';
import {
	StyleSheet,
	Animated,
	Easing,
	Dimensions,
} from 'react-native';

import config from '../../config';
import styleConstants from '../../styles/styleConstants';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 5,
	},
	loader: {
		position: 'absolute',
		left: -100,
		width: 100,
		height: 5,
		backgroundColor: styleConstants.secondary,
	}
});

export default class LoaderComponent extends React.Component {
	constructor() {
		super();

		this.windowWidth = Dimensions.get('window').width;
		this.opacity = new Animated.Value(0);
		this.position = new Animated.Value(-100);	

		this.animateOpacity = this.animateOpacity.bind(this);
		this.animateRight = this.animateRight.bind(this);	
	}

    static get propTypes() {
      return {
		positionStyle: React.PropTypes.object,
      };
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
				easing: config.animation.easing,
			}
		).start();
	}

	animateRight() {
		this.position.setValue(-100);

		Animated.timing(
			this.position,
			{
				toValue: this.windowWidth,
				duration: 2000,
				easing: config.animation.easing,
			}
		).start(() => {
			this.animateRight()
		});
	}

	render() {
		return (
			<Animated.View style={[styles.container, this.props.positionStyle, {opacity: this.opacity}]}>
				<Animated.View style={[styles.loader, {left: this.position}]} />
			</Animated.View>
		);
	}
}