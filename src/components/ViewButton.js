import React from "react";
import {
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/components/AddButton';
import styleConstants from '../styles/styleConstants';

export default class ViewButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            size: React.PropTypes.number.isRequired,
            loading: React.PropTypes.bool,
            handlePress: React.PropTypes.func.isRequired,
        };
    }

    render() {
        const content = this.props.loading ?
            <ActivityIndicator />
            :
            <Icon
                name='eye'
                size={48}
                color={styleConstants.white}
                style={styles.icon} />
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.handlePress} >
                {content}
            </TouchableOpacity>
        );
    }
}