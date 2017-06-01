import React from 'react';
import {
	View,
} from 'react-native';
import { connect } from 'react-redux';

import LoaderComponent from './LoaderComponent';

export class Loader extends React.Component{
    static get propTypes() {
      return {
		loading: React.PropTypes.bool
      };
    }

	render() {
		const loader = this.props.loading ?
			<LoaderComponent 
				positionStyle={this.props.positionStyle} />
			:
			null;

		return (
			<View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 5}}>	
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