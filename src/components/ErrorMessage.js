import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/components/ErrorMessage';
import styleConstants from '../styles/styleConstants';

export default class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showErrorMessage: true
        }
    }

    static get propTypes() {
        return {
            text: React.PropTypes.string.isRequired
        };
    }

    componentDidMount() {
        if (this.state.showErrorMessage) {
            setTimeout(() => {
                this.setState({
                    showErrorMessage: false
                });
            }, 2000);
        }
    }

    render() {
        return (
            <View style={styles.errorMessageWrapper}>
                <View key='errorMessage' style={styles.errorMessageContainer}>
                    <Icon name='exclamation-triangle' style={styles.icon} />
                    <Text style={[ styles.errorMessageText, styleConstants.sourceSansPro ]}>
                        {this.props.text}
                    </Text>
                </View>
            </View>
        );
    }
}