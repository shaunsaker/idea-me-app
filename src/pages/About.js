import React from "react";
import PropTypes from 'prop-types';
import {
    View,
} from "react-native";
import { connect } from "react-redux";

import config from '../config';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';

export class About extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {

        };
    }

    render() {
        return (
            <Page
                backgroundColor={styleConstants.white} >

                <Header
                    text='About App'
                    headerShadow
                    backButton />

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ProfileCard
                        userName={config.app.name}
                        showIcon
                        iconName='light_bulb'
                        userEmail={config.app.developer.email}
                        userLocation={'Version: ' + config.app.version} />
                </View>

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({

    });
}

export default connect(mapStateToProps)(About);