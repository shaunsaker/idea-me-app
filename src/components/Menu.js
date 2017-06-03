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
        position: 'relative'
    },
    menuIconContainer: {
        padding: 16,
    },
    menuIcon: {
        left: 8
    },
    menuItemsWrapper: {
        position: 'absolute',
        top: 52,
        right: 16,
        width: 88,
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
                style={styles.menuItemsWrapper} />
            :
            null;
        
		return (
			<View style={styles.menuContainer}>

                <TouchableOpacity 
                    onPress={this.toggleMenu}
                    style={styles.menuIconContainer}>
                    <Icon
                        name='more-vert'
                        size={28}
                        color={styleConstants.primary}
                        style={styles.menuIcon} />
                </TouchableOpacity>

                {menu}

			</View>
		);
	}
}