import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    infoContainer: {
        paddingRight: 96,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    infoTextTitle: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
    },
    descriptionWrapper: {

    },
    descriptionContainer: {

    },
    infoTextDescriptionContainer: {

    },
    infoTextDescription: {
        marginTop: 8,
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
});

export default class InfoBlock extends React.Component {
    constructor(props) {
        super(props);

        this.toggleReadMoreMode = this.toggleReadMoreMode.bind(this);

        this.state = {
            readMoreMode: false,
        }
    }

    static get propTypes() {
        return {
            title: PropTypes.string,
            subtitle: PropTypes.string,
            titleColor: PropTypes.string,
            subtitleColor: PropTypes.string,
            fullWidth: PropTypes.bool,
            maxNumberOfSubtitleLines: PropTypes.number,
        }
    }

    toggleReadMoreMode() {
        this.setState({
            readMoreMode: !this.state.readMoreMode,
        });
    }

    render() {
        const fullWidthStyles = this.props.fullWidth &&
            {
                paddingRight: 16,
            };

        const fullWidthTitleStyles = this.props.fullWidth &&
            {
                marginRight: 16,
            };

        const subtitle = this.props.subtitle ?
            this.props.maxNumberOfSubtitleLines ?
                <ScrollView
                    style={styles.descriptionWrapper}
                    contentContainerStyle={styles.descriptionContainer}>
                    <Touchable
                        onPress={this.toggleReadMoreMode}
                        androidRipple
                        style={styles.infoTextDescriptionContainer}>
                        <Text
                            numberOfLines={this.state.readMoreMode ? null : this.props.maxNumberOfSubtitleLines}
                            style={[styles.infoTextDescription, { color: this.props.subtitleColor }, styleConstants.primaryFont]}>
                            {this.props.subtitle}
                        </Text>
                    </Touchable>
                </ScrollView>
                :
                <Text style={[styles.infoTextDescription, { color: this.props.subtitleColor }, styleConstants.primaryFont]}>
                    {this.props.subtitle}
                </Text>
            : null;

        return (
            <View style={[styles.infoContainer, fullWidthStyles]}>
                <Text style={[styles.infoTextTitle, { color: this.props.titleColor }, styleConstants.primaryFont, fullWidthTitleStyles]}>
                    {this.props.title}
                </Text>
                {subtitle}
            </View>
        );
    }
}