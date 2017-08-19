import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import AnimateOpacity from '../animators/AnimateOpacity';
import Touchable from './Touchable';
import DeleteButton from './DeleteButton';

const iosStyles = Platform.OS === 'ios' &&
    {
        paddingTop: 20,
        height: 76,
    };

const styles = StyleSheet.create({
    container: {
        width: styleConstants.windowWidth,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: 16,
        backgroundColor: styleConstants.primary,
    },
    leftIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    leftIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
    textContainer: {
        flex: 3, // make the text container 3 times as big as the icon containers
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
    rightIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
});

export default class Header extends React.Component {
    static get propTypes() {
        return {
            backgroundColor: PropTypes.string,
            textColor: PropTypes.string,
            headerShadow: PropTypes.bool,

            backButton: PropTypes.bool,
            closeButton: PropTypes.bool,
            leftComponent: PropTypes.func,
            handleLeftIconPress: PropTypes.func,

            textComponent: PropTypes.func,
            text: PropTypes.string,
            textLeft: PropTypes.bool,
            textRight: PropTypes.bool,
            handleTextPress: PropTypes.func,

            addButton: PropTypes.bool,
            continueButton: PropTypes.bool,
            rightComponent: PropTypes.func,
            handleRightIconPress: PropTypes.func,
        }
    }

    render() {
        const backgroundColorStyles = this.props.backgroundColor &&
            {
                backgroundColor: this.props.backgroundColor,
            };

        const textColorStyles = this.props.textColor &&
            {
                color: this.props.textColor,
            };

        const headerShadowStyles = this.props.headerShadow && styleConstants.regularShadow;

        const leftIcon = this.props.leftComponent ?
            <View style={styles.leftIconContainer}>
                {this.props.leftComponent()}
            </View>
            :
            this.props.leftIconName ?
                <Touchable
                    style={(this.props.textLeft) ? { justifyContent: 'center' } : styles.leftIconContainer}
                    onPress={() => this.props.handleLeftIconPress} >
                    <Icon
                        name={this.props.leftIconName}
                        style={[styles.leftIcon, textColorStyles]} />
                </Touchable>
                :
                this.props.backButton ?
                    <Touchable
                        style={styles.leftIconContainer}
                        onPress={() => Actions.pop()} >
                        <Icon
                            name='chevron_left'
                            style={[styles.leftIcon, textColorStyles]} />
                    </Touchable>
                    :
                    this.props.closeButton ?
                        <Touchable
                            style={styles.leftIconContainer}
                            onPress={this.props.handleLeftIconPress} >
                            <Icon
                                name='close'
                                style={[styles.leftIcon, textColorStyles]} />
                        </Touchable>
                        :
                        this.props.textLeft ?
                            null
                            :
                            <View style={styles.leftIconContainer} />;

        const textLeftStyles = this.props.textLeft ?
            {
                alignItems: 'flex-start',
                paddingLeft: 8,
            }
            :
            null;

        const textRightStyles = this.props.textRight ?
            { alignItems: 'flex-end' }
            :
            null;

        const text = this.props.textComponent ?
            this.props.textComponent()
            :
            this.props.handleTextPress ?
                <Touchable
                    style={[styles.textContainer, textLeftStyles, textRightStyles]}
                    onPress={this.props.handleTextPress} >
                    <Text style={[styles.text, styleConstants.primaryFont, textColorStyles]}>{this.props.text}</Text>
                </Touchable>
                :
                (!this.props.text) ?
                    null
                    :
                    <View style={[styles.textContainer, textLeftStyles, textRightStyles]}>
                        <Text style={[styles.text, styleConstants.primaryFont, textColorStyles]}>{this.props.text}</Text>
                    </View>;

        const rightIcon = this.props.rightComponent ?
            <View style={styles.rightIconContainer}>
                {this.props.rightComponent()}
            </View>
            :
            this.props.rightIconName ?
                <Touchable
                    style={styles.rightIconContainer}
                    onPress={this.props.handleRightIconPress} >
                    <Icon
                        name={this.props.rightIconName}
                        style={[styles.rightIcon, textColorStyles]} />
                </Touchable>
                :
                this.props.addButton ?
                    <Touchable
                        style={styles.rightIconContainer}
                        onPress={this.props.handleRightIconPress} >
                        <Icon
                            name='add'
                            style={[styles.rightIcon, textColorStyles]} />
                    </Touchable>
                    :
                    this.props.continueButton ?
                        <AnimateOpacity
                            initialValue={0}
                            finalValue={1}
                            shouldAnimateIn
                            style={styles.rightIconContainer}>
                            <Touchable
                                onPress={this.props.handleRightIconPress} >
                                <Icon
                                    name='check'
                                    style={[styles.rightIcon, textColorStyles]} />
                            </Touchable>
                        </AnimateOpacity>
                        :
                        (this.props.textRight) ?
                            null
                            :
                            <View style={styles.rightIconContainer} />;

        return (
            <View>
                <StatusBar
                    backgroundColor={styleConstants.transPrimary}
                    barStyle='light-content' />
                <View style={[styles.container, backgroundColorStyles, headerShadowStyles, iosStyles]}>
                    {leftIcon}
                    {text}
                    {rightIcon}
                </View>
            </View>
        );
    }
};