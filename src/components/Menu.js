import React from "react";
import {
	View,
    FlatList,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    menuItemsWrapper: {
        position: 'absolute',
        top: 66,
        right: 16,
        width: 164,
        backgroundColor: styleConstants.white,
		borderWidth: 1,
		borderColor: styleConstants.lightGrey,
        elevation: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
    },
	menuItemsContainer: {

	},
    menuItemContainer: {
        justifyContent: 'center',
        padding: 8,
    },
    menuItemText: {
        fontSize: 18,
        color: styleConstants.primary,
        textAlign: 'right',
    },
    separator: {
        width: 164 - 16,
        alignSelf: 'center',
        height: 1,
        backgroundColor: styleConstants.lightGrey,
    }
});

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

	static get propTypes() {
		return {
            values: React.PropTypes.array.isRequired,
            handleSelect: React.PropTypes.func.isRequired,
		}
	}

    renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.menuItemContainer}
                onPress={() => { this.toggleMenu(); this.props.handleSelect(item) }} >
                <Text
                    style={[styles.menuItemText, styleConstants.robotoCondensed]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

	render() {      
		return (
            <FlatList
                keyExtractor={item => 'menu' + item}
                data={this.props.values}
                renderItem={this.renderItem}
                style={styles.menuItemsWrapper}
                contentContainerStyle={styles.menuItemsContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />} />
		);
	}
}