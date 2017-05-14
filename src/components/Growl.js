import React from "react";
import {
    View,
    Text,
    Animated,
	StyleSheet,
    Dimensions,
} from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    errorMessageWrapper: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageContainer: {
        position: 'absolute',
        width: window.width,
        minHeight: 84,
        backgroundColor: styleConstants.secondary, 
        justifyContent: 'center',
        alignItems: 'center',
		padding: 8,
		paddingBottom: 16,
        elevation: 100
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        color: styleConstants.primary,
    },
    icon: {
        marginTop: 2,
        marginRight: 8,
    }
});

export class Growl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bottom: new Animated.Value(-84)
        }
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string.isRequired,
			success: React.PropTypes.bool,
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.bottom,
            {
                toValue: 0
            }
        ).start();

        setTimeout(() => {
            Animated.timing(
                this.state.bottom,
                {
                    toValue: -200
                }
            ).start();

            setTimeout(() => {
                this.props.dispatch({
                type: 'RESET_USER_ERROR'
                });
            }, 1000);
        }, 2000);
    }

    render() {
		const iconName = this.props.success ? 'check' : 'error-outline';

        return (
            <View style={styles.errorMessageWrapper}>
                <Animated.View style={[styles.errorMessageContainer, {bottom: this.state.bottom}]}>
                    <MaterialIcon
                        name={iconName}
                        color={this.props.success ? styleConstants.success : styleConstants.danger}
                        size={24}
                        style={styles.icon} />
                    <Text style={[styles.messageText, styleConstants.montserratLight]}>
                        {this.props.text}
                    </Text>
                </Animated.View>
            </View>
        );
    }
}

export default connect()(Growl);