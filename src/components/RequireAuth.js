import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

export default function (WrappedComponent) {
  class RequireAuth extends React.Component {
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
      else if (this.props.apiLoadSuccess) {
        Actions.app();
      }
      else if (this.props.redirectUserToSignIn) {
        Actions.signIn();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
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

  return connect(mapStateToProps)(RequireAuth);
}