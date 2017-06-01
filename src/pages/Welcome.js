import React from "react";
import {
    View
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import Logo from '../components/Logo';
import InfoBlock from '../components/InfoBlock';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

import styleConstants from '../styles/styleConstants';

export class Welcome extends React.Component {
    constructor(props) {
        super(props);
        
        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: React.PropTypes.bool,
        };
    }

    componentDidUpdate() {
        if (this.props.authenticated) {
            Actions.ideas();
        }
    }

    signInUserWithFacebook() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        this.props.dispatch({
            type: 'signInUserWithFacebook'
        });
    }

    render() {
        return (
            <Page 
                backgroundColor={styleConstants.primary}
                fauxFooter={true}>
                
                <Header 
                    headerShadow={false}
                    text='Log In'
                    handleTextPress={() => Actions.signInWithEmail()}
                    textRight={true}/>

                <Logo />

                <InfoBlock
                    title="Have great ideas and no where to store them?"
                    subtitle="You've come to the right place." 
                    titleColor={styleConstants.white} 
                    subtitleColor={styleConstants.white} />

                <View>
                    <Button
                        materialCommunityIcon
                        iconName='facebook'
                        handlePress={this.signInUserWithFacebook}                             
                        text='Continue with Facebook'
                        styleMode='transparentReversed' />
                    <Button
                        handlePress={() => Actions.signInOptions()}                           
                        text='More Options'
                        styleMode='transparent' />
                </View>

                <Growl />

                <Loader />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authenticated: state.main.auth.authenticated,
    });
}

export default connect(mapStateToProps)(Welcome);