import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
        fontSize: 18,
        color: styleConstants.white,
    },
    retryButton: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    retryButtonText: {
        fontSize: 18,
        color: styleConstants.secondary,
    },
    iconContainer: {
        marginRight: 8,
        marginTop: 2
    },
    icon: {

    },
    closeIconContainer: {
        alignSelf: 'stretch',
    },
    closeIcon: {

    }
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
                duration: 250,
            }
        ).start();
    }

    hideGrowl() {
        Animated.timing(
            this.state.bottom,
            {
                toValue: (this.height) * -1,
                duration: 250,
            }
        ).start(() => {
            this.props.handleReset();
        });
    }

    render() {
        const iconName = this.props.success ? 'check' : 'error-outline';   

        const retryButton = this.props.handleRetryAction ?
            <TouchableOpacity
                onPress={this.props.handleRetryAction}
                style={styles.retryButton}>
                <Text
                    style={[styles.retryButtonText, styleConstants.robotoCondensed]}>
                    RETRY
                </Text>  
            </TouchableOpacity>
            :
            null;

        return (
            <Animated.View style={[styles.messageWrapper, { bottom: this.state.bottom }]}>
                <View style={styles.messageContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon
                            name={iconName}
                            color={this.props.success ? styleConstants.success : styleConstants.danger}
                            size={24}
                            style={styles.icon} />
                    </View>
                    <View style={styles.messageTextContainer}>
                        <Text
                            style={[styles.messageText, styleConstants.robotoCondensed]}
                            multiline>
                            {this.props.text}
                        </Text>
                        {retryButton}
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.hideGrowl}
                    style={styles.closeIconContainer} >
                    <MaterialIcon
                        name={'close'}
                        color={styleConstants.lightGrey}
                        size={24}
                        style={styles.closeIcon} />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}