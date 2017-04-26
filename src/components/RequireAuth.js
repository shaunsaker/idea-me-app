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
    
    /*
this.props.authenticated && this.props.apiLoadSuccess ? 
        <WrappedComponent {...this.props} />
        :
    */

    render() {
      const wrapper = 
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