import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../../styles/styleConstants';

const styles = StyleSheet.create({
    errorMessageContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: styleConstants.grey,
        borderTopWidth: 1,
        borderTopColor: styleConstants.lightGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 100,
        height: 80,
        paddingHorizontal: 8,
    },
    messageTextContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    messageText: {
        fontSize: 18,
        color: styleConstants.white,
        textAlign: 'center',
    },
    iconContainer: {
        paddingTop: 8,
        alignSelf: 'stretch',
    },
    icon: {

    },
    closeIconContainer: {
        paddingTop: 8,
        alignSelf: 'stretch',
    },
    closeIcon: {

    }
});

export default class GrowlComponent extends React.Component {
    constructor(props) {
        super(props);

        this.height = 80;

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

        return (
            <Animated.View style={[styles.errorMessageContainer, { bottom: this.state.bottom }]}>
                <View style={styles.iconContainer}>
                    <MaterialIcon
                        name={iconName}
                        color={this.props.success ? styleConstants.success : styleConstants.danger}
                        size={24}
                        style={styles.icon} />
                </View>
                <View style={styles.messageTextContainer}>
                    <Text
                        style={[styles.messageText, styleConstants.montserratLight]}
                        multiline={true}>
                        {this.props.text}
                    </Text>
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