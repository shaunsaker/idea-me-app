import React from "react";
import {
    View,
    Text,
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styles from '../styles/pages/Welcome';
import styleConstants from '../styles/styleConstants';

export class Welcome extends React.Component {
    constructor(props) {
        super(props);


    }

    static get propTypes() {
        return {
            errorMessage: React.PropTypes.string,
            authenticated: React.PropTypes.bool,
            loading: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {
        if (this.props.errorMessage) {
            if (this.state.loading) {
                this.setState({
                    loading: false
                });
            }
        }
        else if (this.props.authenticated) {
            this.props.dispatch({
                type: 'SET_LOADING_FALSE'
            });

            Actions.ideas();
        }
    }

    render() {
        const loader = this.props.loading ?
            <Loader positionStyle={{ bottom: 56 }} />
            :
            null;

        const errorMessage = this.props.errorMessage ?
            <Growl text={this.props.errorMessage} />
            :
            null;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={styleConstants.primary} />

                {loader}
                {errorMessage}
            </View>
        );
    }
}

function MapStateToProps(state) {
    return ({
        errorMessage: state.main.userAuth.userAuthErrorMessage,
        authenticated: state.main.userAuth.authenticated,
        loading: state.main.app.loading,
    });
}

export default connect(MapStateToProps)(Welcome);