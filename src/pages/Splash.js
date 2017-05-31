import React from 'react';
import {
    StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import GlowLoader from '../components/GlowLoader';
import Growl from '../components/Growl';

export class Splash extends React.Component {
    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
            uid: React.PropTypes.string,
            apiSuccess: React.PropTypes.bool,
            redirectToWelcomePage: React.PropTypes.bool
        };
    }

    componentDidMount() {
        // if (this.props.redirectToWelcomePage) {
        //     Actions.welcome();
        // }
        // else if (this.props.authenticated && this.props.apiSuccess) {
        //     Actions.ideas({ type: ActionConst.RESET });
        // }

        // // When a user is signed in and reloads app
        // else if (this.props.authenticated && !this.props.apiSuccess) {
        //     this.props.dispatch({
        //         type: 'loadUserData',
        //         uid: this.props.uid
        //     });
        // }
        // else if (!this.props.authenticated) {
        //     this.props.dispatch({
        //         type: 'getUserAuth'
        //     });
        // }
    }

    componentDidUpdate() {

        // // When a user signs in
        // if (this.props.authenticated && !this.props.apiSuccess) {
        //     setTimeout(() => {
        //         this.props.dispatch({
        //             type: 'loadUserData',
        //             uid: this.props.uid
        //         });
        //     }, 1500);
        // }
        // else if (this.props.authenticated && this.props.apiSuccess) {
        //     Actions.ideas();
        // }
        // else if (this.props.redirectToWelcomePage) {
        //     Actions.welcome();
        // }
    }

    render() {
        return (
            <Page 
                backgroundColor={styleConstants.primary}
                justifyContent='center'
                removeBottomPadding >
                <StatusBar backgroundColor={styleConstants.transPrimary} />
                <GlowLoader
                    size={64} />
                <Growl />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.auth.authenticated,
        uid: state.main.user.uid,
        apiSuccess: state.main.api.apiSuccess,
        redirectToWelcomePage: state.main.auth.redirectToWelcomePage
    };
}

export default connect(mapStateToProps)(Splash);