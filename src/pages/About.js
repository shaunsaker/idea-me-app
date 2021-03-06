import React from "react";
import { View, Linking } from "react-native";

import config from "../config";
import Icon from "../assets/icons/index";
import styleConstants from "../assets/styleConstants";

import Page from "../components/Page";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";

export default class About extends React.Component {
    constructor(props) {
        super(props);

        this.handleContact = this.handleContact.bind(this);
    }

    handleContact() {
        Linking.openURL(
            "mailto:" + config.app.developer.email + "?subject=IdeaMe App"
        );
    }

    render() {
        return (
            <Page backgroundColor={styleConstants.white}>
                <Header text="About App" headerShadow backButton />

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ProfileCard
                        userName={config.app.name}
                        showIcon
                        iconName="light_bulb"
                        userEmail={config.app.developer.email}
                        userLocation={"Version: " + config.app.version}
                        handleEmailPress={this.handleContact}
                    />
                </View>
            </Page>
        );
    }
}
