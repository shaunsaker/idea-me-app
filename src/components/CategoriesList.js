import React from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import styleConstants from '../styles/styleConstants';

import DeleteButton from '../components/DeleteButton';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    categoriesWrapper: {
        flex: 1,
        paddingVertical: 16,
    },
    categoriesContainer: {
        paddingBottom: 16,
    },
    categoryItem: {
        width: windowWidth - 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
        backgroundColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    categoryText: {
        fontSize: 18,
        color: styleConstants.primary,
    },
});

export default class CategoriesList extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            categories: React.PropTypes.array
        };
    }

    renderItem({ item }) {
        return (
            <View
                style={styles.categoryItem}>
                <View style={styles.categoryTextContainer}>
                    <Text style={[styles.categoryText, styleConstants.robotoCondensed]}>{item}</Text>
                </View>
                <View style={styles.deleteButtonContainer}>
                    <DeleteButton
                        handlePress={() => this.props.handleDelete(item)} />
                </View>
            </View>
        );
    }

    render() {
        return (
            <FlatList
                keyExtractor={item => 'category' + item}
                data={this.props.categories}
                renderItem={this.renderItem}
                style={styles.categoriesWrapper}
                contentContainerStyle={styles.categoriesContainer} />
        );
    }
}