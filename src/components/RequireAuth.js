import React from 'react';
import {
  View,
  ActivityIndicator
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from '../styles/components/RequireAuth';
import styleConstants from '../styles/styleConstants';

export default function (WrappedComponent) {
  class Auth extends React.Component {
    static get propTypes() {
      return {
        authenticated: React.PropTypes.bool,
        uid: React.PropTypes.string,
        apiLoadSuccess: React.PropTypes.bool,
        redirectUserToSignIn: React.PropTypes.bool

      };
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.dispatch({
          type: 'getUserAuth'
        });
      }

      if (this.props.authenticated && !this.props.apiLoadSuccess) {
        this.props.dispatch({
          type: 'loadUserData'
        });
      }
    }

    componentDidUpdate() {
      if (this.props.authenticated && !this.props.apiLoadSuccess) {
        this.props.dispatch({
          type: 'loadUserData',
          uid: this.props.uid
        });
      }
      else if (this.props.redirectUserToSignIn) {
        Actions.signIn();
      }
    } 

    render() {
      const wrapper = this.props.authenticated && this.props.apiLoadSuccess ? 
        <WrappedComponent {...this.props} />
        :
        <View style={styles.container}>
          <ActivityIndicator />
        </View>

      return wrapper;
    }
  }

  function mapStateToProps(state) {
    return { 
      authenticated: state.main.user.authenticated,
      uid: state.main.user.uid,
      apiLoadSuccess: state.main.user.apiLoadSuccess,
      redirectUserToSignIn: state.main.user.signInRedirect
    };
  }

  return connect(mapStateToProps)(Auth);
}