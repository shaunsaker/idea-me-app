import React from 'react';
import {
    View,
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

import styles from '../styles/pages/Splash';
import styleConstants from '../styles/styleConstants';

import GlowLoader from '../components/GlowLoader';

export class Splash extends React.Component {
    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
            uid: React.PropTypes.string,
            apiLoadSuccess: React.PropTypes.bool,
            welcomeRedirect: React.PropTypes.bool
        };
    }

    componentDidMount() {
        if (this.props.welcomeRedirect) {
            Actions.welcome();
        }
        else if (this.props.authenticated && this.props.apiLoadSuccess) {
            Actions.ideas({ type: ActionConst.RESET });
        }

        // When a user is signed in and reloads app
        else if (this.props.authenticated && !this.props.apiLoadSuccess) {
            this.props.dispatch({
                type: 'loadUserData',
                uid: this.props.uid
            });
        }
        else if (!this.props.authenticated) {
            this.props.dispatch({
                type: 'getUserAuth'
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
        else if (this.props.authenticated && this.props.apiLoadSuccess) {
            Actions.ideas();
        }
        else if (this.props.welcomeRedirect) {
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
        welcomeRedirect: state.main.userAuth.welcomeRedirect
    };
}

export default connect(mapStateToProps)(Splash);