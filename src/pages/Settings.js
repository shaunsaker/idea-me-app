import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";

import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import ToggleButton from '../components/ToggleButton';

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        width: styleConstants.windowWidth - 32,
        paddingVertical: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSetting = this.toggleSetting.bind(this);
    }

    static get propTypes() {
        return {
            uid: PropTypes.string,
            hasNetwork: PropTypes.bool,
            settings: PropTypes.object,
        };
    }

    toggleSetting(settingUID) {
        let newSettings = utilities.cloneObject(this.props.settings);
        newSettings[settingUID].enabled = !newSettings[settingUID].enabled;

        this.props.dispatch({
            type: 'UPDATE_USER_DATA',
            node: 'settings',
            userData: newSettings,
        });

        this.props.dispatch({
            type: 'saveUserData',
            node: 'settings',
            uid: this.props.uid,
            userData: newSettings,
            hasNetwork: this.props.hasNetwork,
        });
    }

    render() {
        const settingsArray = utilities.convertDictionaryToArray(this.props.settings);

        // TODO: If settings > 3, use FlatList
        const settings = settingsArray.map((value) => {
            return (
                <ToggleButton
                    key={value.uid}
                    iconName={value.iconName}
                    title={value.title}
                    active={value.enabled}
                    uid={value.uid}
                    handleToggle={this.toggleSetting} />
            );
        });

        return (
            <Page
                fauxFooter >

                <Header
                    text='Settings'
                    backButton />

                <View style={styles.settingsContainer}>
                    {settings}
                </View>

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.userAuth.uid,
        hasNetwork: state.main.appState.hasNetwork,
        settings: state.main.userData.settings,
    });
}

export default connect(mapStateToProps)(Settings);