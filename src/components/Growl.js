import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
	StyleSheet,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    errorMessageWrapper: {        
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageContainer: {
        position: 'absolute',
        left: -16,
        right: -16,
        backgroundColor: styleConstants.secondary, 
        flexDirection: 'row',
        alignItems: 'center',
		padding: 8,
        elevation: 100,
        height: 40,
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        color: styleConstants.primary,
    },
    icon: {
        marginTop: 2,
        marginRight: 8,
    },
    closeIconContainer: {
        position: 'absolute',
        right: 0,
    },
    closeIcon: {
        padding: 8
    }
});

export class Growl extends React.Component {
    constructor(props) {
        super(props);

        this.height = 40;

        this.state = {
            bottom: new Animated.Value((this.height + 28) * -1) // TODO: this should be -this.height but a gap (26) is introduced from somewhere
        }

        this.hideGrowl = this.hideGrowl.bind(this);
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string.isRequired,
			success: React.PropTypes.bool,
            type: React.PropTypes.string,
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.bottom,
            {
                toValue: -28, // TODO: this should be -16 but a gap is introduced from somewhere
                duration: 250,
            }
        ).start();
    }

    hideGrowl() {
        Animated.timing(
            this.state.bottom,
            {
                toValue: (this.height + 28) * -1, // TODO: this should be -this.height but a gap (26) is introduced from somewhere
                duration: 250,
            }
        ).start(() => {

            // Reset the error depending on the type of error
            const action = this.props.success ? 
                'RESET_' + this.props.errorType + '_SUCCESS'
                :
                'RESET_' + this.props.errorType + '_ERROR'

            this.props.dispatch({
                type: action
            });
        });
    }

    render() {
		const iconName = this.props.success ? 'check' : 'error-outline';

        return (
            <View style={styles.errorMessageWrapper}>
                <Animated.View style={[styles.errorMessageContainer, {bottom: this.state.bottom}]}>
                    <MaterialIcon
                        name={iconName}
                        color={this.props.success ? styleConstants.success : styleConstants.danger}
                        size={20}
                        style={styles.icon} />
                    <Text style={[styles.messageText, styleConstants.montserratLight]}>
                        {this.props.text}
                    </Text>
                    <TouchableOpacity
                        onPress={this.hideGrowl}
                        style={styles.closeIconContainer} >
                        <MaterialIcon
                            name={'close'}
                            color={styleConstants.primary}
                            size={24}
                            style={styles.closeIcon} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorType: state.main.app.errorType
    }
}

export default connect()(Growl);