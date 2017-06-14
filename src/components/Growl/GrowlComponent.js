import React from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from '../../styles/icons/index';

import config from '../../config';
import styleConstants from '../../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    messageWrapper: {
        position: 'absolute',
        width: windowWidth, 
        backgroundColor: styleConstants.grey,
        borderTopWidth: 1,
        borderTopColor: styleConstants.lightGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 100,
        minHeight: 80,
        padding: 8,
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 8,
    },
    messageText: {
        flex: 1,
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
    retryButton: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    retryButtonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.secondary,
    },
    iconContainer: {
        marginRight: 8,
        marginTop: 2
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.lightGrey,
    },
    closeIconContainer: {
        alignSelf: 'stretch',
    },
});

export default class GrowlComponent extends React.Component {
    constructor(props) {
        super(props);

        this.height = 81;

        this.state = {
            bottom: new Animated.Value((this.height) * -1),
        }

        this.hideGrowl = this.hideGrowl.bind(this);
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string.isRequired,
            success: React.PropTypes.bool,
            handleReset: React.PropTypes.func,
        };
    }

    componentDidMount() {   
        Animated.timing(
            this.state.bottom,
            {
                toValue: 0,
                duration: config.animation.duration.short,
                easing: config.animation.easing,
            }
        ).start();
    }

    hideGrowl() {
        Animated.timing(
            this.state.bottom,
            {
                toValue: (this.height) * -1,
                duration: config.animation.duration.short,
                easing: config.animation.easing,
            }
        ).start(() => {
            this.props.handleReset();
        });
    }

    render() {
        const iconName = this.props.success ? 'check' : 'error-outline';   

        const retryButton = this.props.handleRetryAction ?
            <Touchable
                onPress={this.props.handleRetryAction}
                style={styles.retryButton}
                androidRippleColor={styleConstants.white}>
                <Text
                    style={[styles.retryButtonText, styleConstants.primaryFont]}>
                    RETRY
                </Text>  
            </Touchable>
            :
            null;

        return (
            <Animated.View style={[styles.messageWrapper, { bottom: this.state.bottom }]}>
                <View style={styles.messageContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={iconName}
                            style={[styles.icon, {color: this.props.success ? styleConstants.success : styleConstants.danger}]} />
                    </View>
                    <View style={styles.messageTextContainer}>
                        <Text
                            style={[styles.messageText, styleConstants.primaryFont]}
                            multiline>
                            {this.props.text}
                        </Text>
                        {retryButton}
                    </View>
                </View>
                <Touchable
                    onPress={this.hideGrowl}
                    style={styles.closeIconContainer} 
                    androidRippleColor={styleConstants.primary}>
                    <Icon
                        name='close'
                        style={styles.icon} />
                </Touchable>
            </Animated.View>
        );
    }
}