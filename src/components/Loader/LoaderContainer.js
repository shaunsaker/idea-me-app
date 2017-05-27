import React from 'react';
import {
	View,
} from 'react-native';
import { connect } from 'react-redux';

import LoaderComponent from './LoaderComponent';

export class LoaderContainer extends React.Component{
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

export default connect(mapStateToProps)(LoaderContainer);