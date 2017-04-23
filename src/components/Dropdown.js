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
            isExpanded: !isExpanded
        });
    }

    render() {
        const itemList =
            <View style={styles.dropdownItemsContainer}>
                {
                    this.props.editItem ?
                        <TouchableOpacity
                            onPress={() => { this.props.handleSelect(200) }} >
                            <Icon name='pencil' style={styles.editIcon} />
                            <Text
                                style={[styles.dropdownItem, styles.dropdownItemAdd, styleConstants.sourceSansPro]}>
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
                            onPress={() => { this.props.handleSelect(100) }} >
                            <Text
                                style={[styles.dropdownItem, styleConstants.sourceSansPro]}>
                                All
                            </Text>
                        </TouchableOpacity>
                }

                <Flatlist
                    data={this.props.values}
                    renderItem={(value, index) =>
                        <TouchableOpacity
                            onPress={(index) => { this.props.handleSelect(index) }} >
                            <Text
                                style={[styles.dropdownItem, styleConstants.sourceSansPro]}>
                                {value}
                            </Text>
                        </TouchableOpacity>
                    } />
            </View>;

        return (
            <View>
                <TouchableOpacity
                    style={styles.dropDownButton}
                    onPress={this.toggleExpanded} >
                    <Text
                        style={styleConstants.sourceSansProp} >
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