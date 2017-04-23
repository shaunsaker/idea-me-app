import React from "react";
import {
    TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/components/AddButton';
import styleConstants from '../styles/styleConstants';

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);

        this.navigateAddIdea = this.navigateAddIdea.bind(this);
    }

    static get propTypes() {
        return {
            size: React.PropTypes.number.isRequired
        };
    }

    navigate(to) {
        if (to === 'addIdea') {
            Actions.addIdea();
        }
        else if (to === 'addCategory') {
            Actions.addCategory();
        }
    }

    render() {
        const buttonStyles = this.props.ideas || this.props.categories ?
            {}
            :
            {...styles.button}

        const to = this.props.categories ? 'addCategory' : 'addIdea';

        return (
            <TouchableOpacity
                style={buttonStyles}
                onPress={() => this.navigate(to)}>
                <Icon name='plus' style={styles.icon} color={styleConstants.white} />
            </TouchableOpacity>
        );
    }
}