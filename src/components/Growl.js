import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

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

class GrowlComponent extends React.Component {
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

export class Growl extends React.Component {
    constructor(props) {
        super(props);

        this.resetError = this.resetError.bind(this);
    }

    static get propTypes() {
        return {
            userErrorMessage: React.PropTypes.string,
            userAuthErrorMessage: React.PropTypes.string,
            apiErrorMessage: React.PropTypes.string,
            geolocationErrorMessage: React.PropTypes.string,
            storageErrorMessage: React.PropTypes.string,
            errorType: React.PropTypes.string,  
        };
    }

    resetError() {
        
        // Reset the error depending on the type of error
        const action = this.props.success ?
            'RESET_' + this.props.errorType + '_SUCCESS'
            :
            'RESET_' + this.props.errorType + '_ERROR';

        this.props.dispatch({
            type: action
        });
    }

    render() {
        const errorMessage = 
            this.props.userErrorMessage ? 
                this.props.userErrorMessage
                :
                this.props.userAuthErrorMessage ?
                    this.props.userAuthErrorMessage 
                    :
                    this.props.apiErrorMessage ?
                        this.props.apiErrorMessage 
                        :
                        this.props.geolocationErrorMessage ?
                            this.props.geolocationErrorMessage 
                            :
                            this.props.storageErrorMessage ?
                                this.props.storageErrorMessage 
                                :
                                null;              

        const growl = errorMessage ?
            <GrowlComponent 
                text={errorMessage} 
                // TODO: pass in success if applicable
                handleReset={this.resetError} />
            :
            null;

        return (
            <View>
                {growl}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userErrorMessage: state.main.app.userErrorMessage,
        userAuthErrorMessage: state.main.userAuth.userAuthErrorMessage,
        apiErrorMessage: state.main.api.apiErrorMessage,
        geolocationErrorMessage: state.main.geolocation.geolocationErrorMessage ,
        storageErrorMessage: state.main.storage.storageErrorMessage,
        errorType: state.main.app.errorType
    }
}

export default connect(mapStateToProps)(Growl);