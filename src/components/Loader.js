import React from 'react';
import {
	View,
	StyleSheet,
	Animated,
	Easing,
	Dimensions,
} from 'react-native';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 5,
	},
	loader: {
		position: 'absolute',
		left: -100,
		bottom: 1,
		width: 100,
		height: 5,
	}
});

export default class Loader extends React.Component{
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
		color: React.PropTypes.string,
      };
    }

	static defaultProps = {
		color: styleConstants.secondary
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
				easing: Easing.gentle
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
				easing: Easing.gentle
			}
		).start(() => {
			this.animateRight()
		});
	}

	render() {
		const positionStyle = this.props.positionTop ?
			{ top: 56 }
			:
			{ bottom : 0}; 

		return (
			<Animated.View style={[styles.container, positionStyle, {opacity: this.opacity}]}>
				<Animated.View style={[styles.loader, {left: this.position}, {backgroundColor: this.props.color}]} />
			</Animated.View>
		);
	}
};