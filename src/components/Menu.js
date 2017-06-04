import React from "react";
import {
	View,
    FlatList,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    menuContainer: {

    },
    menuIconContainer: {

    },
    menuIcon: {
        left: 10,
        fontSize: 28,
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
        justifyContent: 'flex-end',
    },
    menuItemText: {
        fontSize: 18,
        color: styleConstants.primary,
        textAlign: 'right',
        padding: 8,
    },
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
                onPress={() => { this.toggleMenu(); this.props.handleSelect(item) }} >
                <Text
                    style={[styles.menuItemText, styleConstants.robotoCondensed]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

	render() {
        const menu = this.state.showMenu ?
            <FlatList
                keyExtractor={item => 'menu' + item}
                data={this.props.values}
                renderItem={this.renderItem}
                style={styles.menuItemsWrapper}
                contentContainerStyle={styles.menuItemsContainer} />
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