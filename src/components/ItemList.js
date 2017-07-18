import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import ItemListHeader from './ItemListHeader'
import DeleteButton from './DeleteButton';

const styles = StyleSheet.create({
    listWrapper: {
        flex: 1,
    },
    listContainer: {

    },
    listItem: {
        width: styleConstants.windowWidth,
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
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
    listItemIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemIcon: {
        fontSize: styleConstants.iconFont,
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
            items: PropTypes.array,
            handleItemPress: PropTypes.func,
            deleteIcon: PropTypes.bool,
            iconName: PropTypes.string,
            handleIconPress: PropTypes.func,

            headerTitle: PropTypes.string,
            headerValue: PropTypes.string,
            headerDisabled: PropTypes.bool,
            headerIconName: PropTypes.string,
        };
    }

    renderItem({ item }) {
        const icon = this.props.deleteIcon ?
            <DeleteButton
                handlePress={() => this.props.handleIconPress(item)} />
            :
            this.props.handleIconPress ?
                <Touchable
                    onPress={() => this.props.handleIconPress(item)}
                    style={styles.listItemIconContainer} >
                    <Icon name={this.props.iconName} style={styles.listItemIcon} />
                </Touchable>
                :
                <View
                    style={styles.listItemIconContainer}>
                    <Icon name={this.props.iconName} style={styles.listItemIcon} />
                </View>;

        const listItem = this.props.handleItemPress ?
            <Touchable
                onPress={() => this.props.handleItemPress(item)}
                style={styles.listItem}
                androidRipple
                androidRippleColor={styleConstants.primary} >
                <View style={styles.listItemTextContainer}>
                    <Text style={[styles.listItemText, styleConstants.primaryFont]}>{item.title}</Text>
                </View>
                {icon}
            </Touchable>
            :
            <View
                style={styles.listItem}>
                <View style={styles.listItemTextContainer}>
                    <Text style={[styles.listItemText, styleConstants.primaryFont]}>{item.title}</Text>
                </View>
                {icon}
            </View>

        return listItem;
    }

    render() {
        const header = this.props.headerTitle ?
            <ItemListHeader 
               title={this.props.headerTitle}
               value={this.props.headerValue}
               disabled={this.props.headerDisabled}
               iconName={this.props.headerIconName}
               handlePress={this.props.handleItemPress} />
            :
            null;

        return (
            <FlatList
                keyExtractor={item => 'list-' + item.title}
                data={this.props.items}
                renderItem={this.renderItem}
                style={styles.listWrapper}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={() => header} />
        );
    }
}