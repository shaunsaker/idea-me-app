import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import LoaderComponent from './LoaderComponent';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 5,
    }
});

export class Loader extends React.Component {
    static get propTypes() {
        return {
            hasNetwork: PropTypes.bool,
            loading: PropTypes.bool,
        };
    }

    render() {
        const loader = this.props.hasNetwork && this.props.loading &&
            <LoaderComponent />;

        return (
            <View style={styles.container}>
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