import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Spinner from './Spinner';

import styles from '../styles/components/RequireAuth';
import styleConstants from '../styles/styleConstants';

export default function (WrappedComponent) {
  class Auth extends React.Component {
    static get propTypes() {
      return {
        authenticated: React.PropTypes.bool
      };
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.dispatch({
          type: 'getUserAuth'
        });
      }

      if (this.props.authenticated && !this.props.cloudDataSuccess) {
        this.props.dispatch({
          type: 'loadUserData'
        });
      }
    }

    componentDidUpdate() {
      if (this.props.authenticated && !this.props.cloudDataSuccess) {
        this.props.dispatch({
          type: 'loadUserData'
        });
      }
      else if (this.props.redirectUserToSignIn) {
        browserHistory.push('/sign-in');
      }
    } 

    render() {
      const wrapper = this.props.authenticated && this.props.cloudDataSuccess ? 
        <WrappedComponent {...this.props} />
        :
        <div style={styles.container}>
          <Spinner />
        </div>

      return wrapper;
    }
  }

  function mapStateToProps(state) {
    return { 
      authenticated: state.main.user.authenticated,
      cloudDataSuccess: state.main.user.cloudDataSuccess,
      redirectUserToSignIn: state.main.user.signInRedirect
    };
  }

  return connect(mapStateToProps)(Auth);
}