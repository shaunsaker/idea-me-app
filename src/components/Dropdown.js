import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/components/Dropdown';
import styleConstants from '../styles/styleConstants';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }

        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    static get propTypes() {
        return {
            displayText: React.PropTypes.string,
            value: React.PropTypes.string,
            handleSelect: React.PropTypes.func.isRequired,
            values: React.PropTypes.array.isRequired,
            editItem: React.PropTypes.bool
        };
    }

    toggleExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const itemList =
            <View style={styles.dropdownItemsContainer}>
                {
                    this.props.editItem ?
                        <TouchableOpacity
                            style={styles.dropdownItemAdd}
                            onPress={() => { this.toggleExpanded(); this.props.handleSelect(200) }} >
                            <Icon name='pencil' size={18} style={styles.editIcon} />
                            <Text
                                style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                                Edit Categories
                            </Text>
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    this.props.displayText ?
                        null :
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => { this.toggleExpanded(); this.props.handleSelect(100) }} >
                            <Text
                                style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                                All
                            </Text>
                        </TouchableOpacity>
                }

                <FlatList
                    data={this.props.values}
                    renderItem={(value, index) =>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={(index) => { this.toggleExpanded(); this.props.handleSelect(index) }} >
                            <Text
                                style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                                {value}
                            </Text>
                        </TouchableOpacity>
                    } />
            </View>;

        return (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={this.toggleExpanded} >
                    <Text
                        style={[styles.dropdownButtonText, styleConstants.ranga]} >
                        {this.props.value ? this.props.value : this.props.displayText}
                    </Text>
                </TouchableOpacity>
                {
                    this.state.isExpanded ?
                        itemList
                        :
                        null
                }
            </View>
        );
    }
}