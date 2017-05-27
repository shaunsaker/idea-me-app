import React from 'react';
import {
	View,
	StyleSheet,
	Animated,
	Easing,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import styleConstants from '../styles/styleConstants';

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
	}
});

class LoaderComponent extends React.Component {
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
		positionStyle: React.PropTypes.object,
      };
    }

	static defaultProps = {
		color: styleConstants.secondary,
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
		return (
			<Animated.View style={[styles.container, this.props.positionStyle, {opacity: this.opacity}]}>
				<Animated.View style={[styles.loader, {left: this.position}, {backgroundColor: this.props.color}]} />
			</Animated.View>
		);
	}
}

export class Loader extends React.Component{
    static get propTypes() {
      return {
		loading: React.PropTypes.bool
      };
    }

	render() {
		const loader = this.props.loading ?
			<LoaderComponent />
			:
			null;

		return (
			<View>	
				{loader}
			</View>
		);
	}
};

function mapStateToProps(state) {
	return {
		loading: state.main.app.loading
	}
}

export default connect(mapStateToProps)(Loader);