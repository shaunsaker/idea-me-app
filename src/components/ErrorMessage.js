import React from "react";
import {
    View,
    Text,
    Animated
} from "react-native";
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles/components/ErrorMessage';
import styleConstants from '../styles/styleConstants';

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