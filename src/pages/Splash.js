import React from 'react';
import {
    View,
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

import styleConstants from '../styles/styleConstants';

import GlowLoader from '../components/GlowLoader';

export class Splash extends React.Component {
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
        else {
            Actions.ideas({ type: ActionConst.RESET });
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
            Actions.ideas();
        }
        else if (this.props.redirectUserToSignIn) {
            Actions.welcome();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={styleConstants.transPrimary} />
                <GlowLoader
                    size={64} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        uid: state.main.userAuth.uid,
        apiLoadSuccess: state.main.api.apiLoadSuccess,
        redirectUserToSignIn: state.main.userAuth.signInRedirect
    };
}

export default connect(mapStateToProps)(Splash);