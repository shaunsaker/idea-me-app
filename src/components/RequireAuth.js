import React from 'react';
import {
  View
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Splash from './Splash';

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

      // When a user is signed in and reloads app
      if (this.props.authenticated && !this.props.apiLoadSuccess) {
        this.props.dispatch({
          type: 'loadUserData',
          uid: this.props.uid
        });
      }
    }

    componentDidUpdate() {

      // When a user signs in
      if (this.props.authenticated && !this.props.apiLoadSuccess) {
        setTimeout(() => {
          this.props.dispatch({
            type: 'loadUserData',
            uid: this.props.uid
          });
        }, 1500);
      }
      else if (this.props.redirectUserToSignIn) {
        Actions.signIn();
      }
    }

    render() {
      const wrapper = this.props.authenticated && this.props.apiLoadSuccess ?
        <WrappedComponent {...this.props} />
        :
        <Splash />

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