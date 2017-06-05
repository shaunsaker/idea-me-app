import React from "react";
import {
	View,
    FlatList,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Icon from '../styles/icons/index';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    menuContainer: {

    },
    menuIconContainer: {

    },
    menuIcon: {
        left: 8,
        fontSize: 24,
    },
    menuItemsWrapper: {
        position: 'absolute',
        top: 36,
        right: 0,
        width: 150,
        backgroundColor: styleConstants.white,
        elevation: 5,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    menuItemIcon: {
        fontSize: 18,
        color: styleConstants.primary,
    },
    menuItemText: {
        fontSize: 18,
        color: styleConstants.primary,
    },
    separator: {
        width: 150 - 16,
        alignSelf: 'center',
        height: 1,
        backgroundColor: styleConstants.lightGrey,
    }
});

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.renderItem = this.renderItem.bind(this);

        this.state = {
            showMenu: false
        }
    }

	static get propTypes() {
		return {
            values: React.PropTypes.array.isRequired,
            handleSelect: React.PropTypes.func.isRequired,
		}
	}

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.menuItemContainer}
                onPress={() => { this.toggleMenu(); this.props.handleSelect(item.value) }} >
                <Icon name={item.iconName} style={styles.menuItemIcon} />
                <Text
                    style={[styles.menuItemText, styleConstants.robotoCondensed]}>
                    {item.value}
                </Text>
            </TouchableOpacity>
        )
    }

	render() {
        const menu = this.state.showMenu ?
            <FlatList
                keyExtractor={item => 'menu' + item.value}
                data={this.props.values}
                renderItem={this.renderItem}
                style={styles.menuItemsWrapper}
                contentContainerStyle={styles.menuItemsContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />} />
            :
            null;
        
		return (
			<View style={styles.menuContainer}>

                <TouchableOpacity 
                    onPress={this.toggleMenu}
                    style={styles.menuIconContainer}>
                    <Icon
                        name='more-vert'
                        style={[styles.menuIcon, {color: this.props.color ? this.props.color : styleConstants.primary}]} />
                </TouchableOpacity>

                {menu}

			</View>
		);
	}
}