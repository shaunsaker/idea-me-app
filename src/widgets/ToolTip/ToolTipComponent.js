import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import Icon from '../../assets/icons/index';

import config from '../../config';
import styleConstants from '../../assets/styleConstants';

import AnimateFadeIn from '../../animators/AnimateFadeIn';

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: styleConstants.windowWidth / 1.5,
        backgroundColor: styleConstants.realWhite,
        elevation: 15,
        borderWidth: 1,
        borderColor: styleConstants.primary,
    },
    wrapperTop: {
        width: styleConstants.windowWidth - 32,
        top: 16,
        left: 16,
    },
    wrapperBottom: {
        width: styleConstants.windowWidth - 32,
        bottom: 16,
        left: 16,
    },
    container: {
        paddingTop: 8,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: styleConstants.realWhite,
    },
    iconContainer: {
        position: 'absolute',
    },
    iconContainerTopRight: {
        top: 4,
        right: 4,
    },
    iconContainerBottomRight: {
        bottom: 4,
        right: 4,
    },
    iconContainerBottomCenter: {
        bottom: 4,
        left: (styleConstants.windowWidth - 32 - 16) / 2,
    },
    icon: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondary,
    },
    textContainer: {

    },
    text: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primary,
    },
    buttonContainer: {

    },
    button: {
        alignSelf: 'flex-end',
        paddingTop: 8,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
});

export default class ToolTipComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            toolTip: PropTypes.object,
            handlePress: PropTypes.func,
        };
    }

    render() {
        const wrapperStyles =
            this.props.toolTip.position.general ?
                this.props.toolTip.position.general === 'top' ?
                    styles.wrapperTop
                    :
                    this.props.toolTip.position.bottom ?
                        [
                            styles.wrapperBottom,
                            {
                                bottom: this.props.toolTip.position.bottom,
                            }
                        ]
                        :
                        styles.wrapperBottom
                :
                {
                    ...this.props.toolTip.position,
                };

        let iconContainerStyles;
        let iconStyles;
        let icon;
        let buttonStyles;

        if (!this.props.toolTip.position.general || (this.props.toolTip.position.general && this.props.toolTip.position.bottom)) {
            if (this.props.toolTip.position.bottom && this.props.toolTip.position.right) {
                iconContainerStyles = styles.iconContainerBottomRight;
                iconStyles = {
                    transform: [
                        {
                            rotate: '225deg',
                        }
                    ]
                }
                buttonStyles = {
                    alignSelf: 'flex-start',
                }
            }
            else if (this.props.toolTip.position.top && this.props.toolTip.position.right) {
                iconContainerStyles = styles.iconContainerTopRight;
                iconStyles = {
                    transform: [
                        {
                            rotate: '135deg',
                        }
                    ]
                }
            }
            else if (this.props.toolTip.position.general && this.props.toolTip.position.bottom) {
                iconContainerStyles = styles.iconContainerBottomCenter;
                iconStyles = {
                    transform: [
                        {
                            rotate: '270deg',
                        }
                    ]
                }
            }

            icon =
                <View style={[styles.iconContainer, iconContainerStyles]}>
                    <Icon name='chevron_left' style={[styles.icon, iconStyles]} />
                </View>
        }

        const button = this.props.toolTip.subtitle &&
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={this.props.handlePress}
                    style={[styles.button, buttonStyles]}>
                    <Text style={[styles.buttonText, styleConstants.primaryFont]}>
                        {this.props.toolTip.subtitle}
                    </Text>
                </TouchableOpacity>
            </View>

        return (
            <View style={[styles.wrapper, wrapperStyles]}>
                <AnimateFadeIn style={styles.container}>

                    {icon}

                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styleConstants.primaryFont]}>
                            {this.props.toolTip.title}
                        </Text>
                    </View>

                    {button}

                </AnimateFadeIn>
            </View>
        );
    }
}