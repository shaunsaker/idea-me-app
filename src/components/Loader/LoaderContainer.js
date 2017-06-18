import React from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import LoaderComponent from './LoaderComponent';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 5,
	}
});

export class Loader extends React.Component{
    static get propTypes() {
      return {
		hasNetwork: React.PropTypes.bool,
		loading: React.PropTypes.bool,
		customLoader: React.PropTypes.bool,
      };
    }

	render() {
		const loader = ((this.props.hasNetwork && this.props.loading) || this.props.customLoader) ?
			<LoaderComponent />
			:
			null;

		let loaderContainerStyles;

		if (this.props.position === 'top') {
			loaderContainerStyles = {top: 0}
		}
		else if (this.props.position === 'clearHeader') {
			loaderContainerStyles = {top: 56}
		}
		else if (this.props.position === 'bottom') {
			loaderContainerStyles = {bottom: 0}
		}
		else {
			loaderContainerStyles = {bottom: 56}
		}

		return (
			<View style={[styles.container, loaderContainerStyles]}>	
				{loader}
			</View>
		);
	}
};

function mapStateToProps(state) {
	return {
		hasNetwork: state.main.app.hasNetwork,
		loading: state.main.app.loading,
	}
}

export default connect(mapStateToProps)(Loader);