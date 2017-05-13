import React from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    errorMessageWrapper: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageContainer: {
        position: 'absolute',
        width: windowWidth,
        minHeight: 84,
        backgroundColor: styleConstants.secondary, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessageText: {
        fontSize: 18,
        textAlign: 'center',
        color: styleConstants.primary
    },
    icon: {
        marginTop: 2,
        marginRight: 8
    }
});

export class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bottom: new Animated.Value(-200)
        }
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string.isRequired
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
        return (
            <View style={styles.errorMessageWrapper}>
                <Animated.View style={[styles.errorMessageContainer, {bottom: this.state.bottom}]}>
                    <MaterialIcon
                        name='error-outline'
                        color={styleConstants.red}
                        size={24}
                        style={styles.icon} />
                    <Text style={[styles.errorMessageText, styleConstants.robotoCondensed]}>
                        {this.props.text}
                    </Text>
                </Animated.View>
            </View>
        );
    }
}

export default connect()(ErrorMessage);