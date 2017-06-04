import React from "react";
import {
    View,
    TouchableOpacity,
    FlatList,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from '../styles/icons/index';

import DeleteButton from '../components/DeleteButton';

import styleConstants from '../styles/styleConstants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    listWrapper: {
        flex: 1,
    },
    listContainer: {

    },
    listItem: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: styleConstants.white,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.lightGrey,
    },
    listItemTextContainer: {

    },
    listItemText: {
        fontSize: 18,
        color: styleConstants.primary,
    },
    listItemIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemIcon: {
        fontSize: 24,
        color: styleConstants.primary,
    },
});

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            items: React.PropTypes.array,
            handleItemPress: React.PropTypes.func,
            deleteIcon: React.PropTypes.bool,
            iconName: React.PropTypes.string,
            handleIconPress: React.PropTypes.func,
        };
    }

    renderItem({ item }) {
        const icon = this.props.deleteIcon ?
            <DeleteButton
                handlePress={() => this.props.handleIconPress(item)} />
            :
            this.props.handleIconPress ?
                <TouchableOpacity
                    onPress={() => this.props.handleIconPress(item)}
                    style={styles.listItemIconContainer} >
                    <Icon name={this.props.iconName} style={styles.listItemIcon} />
                </TouchableOpacity>
                :
                <View
                    style={styles.listItemIconContainer}>
                    <Icon name={this.props.iconName} style={styles.listItemIcon} />
                </View>;

        const listItem = this.props.handleItemPress ?
            <TouchableOpacity
                onPress={() => this.props.handleItemPress(item)}
                style={styles.listItem}>
                <View style={styles.listItemTextContainer}>
                    <Text style={[styles.listItemText, styleConstants.robotoCondensed]}>{item}</Text>
                </View>
                {icon}
            </TouchableOpacity>
            :
            <View
                style={styles.listItem}>
                <View style={styles.listItemTextContainer}>
                    <Text style={[styles.listItemText, styleConstants.robotoCondensed]}>{item}</Text>
                </View>
                {icon}
            </View>

        return listItem;
    }

    render() {
        return (
            <FlatList
                keyExtractor={item => 'list' + item}
                data={this.props.items}
                renderItem={this.renderItem}
                style={styles.listWrapper}
                contentContainerStyle={styles.listContainer} />
        );
    }
}