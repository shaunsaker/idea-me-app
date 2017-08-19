import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
} from "react-native";
import { Actions } from 'react-native-router-flux';

import config from '../config';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import AnimateHeight from '../animators/AnimateHeight';
import Touchable from './Touchable';
import Button from './Button';
import CategoriesButton from './CategoriesButton';

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
    },
    dropdownItemsWrapper: {
        ...styleConstants.regularShadow,
        position: 'absolute',
        top: 76,
        left: 0,
        right: 0,
        width: styleConstants.windowWidth - 32,
        backgroundColor: styleConstants.white,
        zIndex: 1,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: styleConstants.realWhite,
        borderBottomWidth: 1,
        borderColor: styleConstants.lightGrey,
    },
    dropdownHeaderIcon: {
        marginRight: 12,
        color: styleConstants.primary,
        fontSize: styleConstants.iconFont,
    },
    dropdownHeaderText: {
        color: styleConstants.primary,
        fontSize: styleConstants.regularFont,
        textAlign: 'center',
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        width: styleConstants.windowWidth - 32,
    },
    dropdownItemText: {
        color: styleConstants.primary,
        fontSize: styleConstants.regularFont,
        textAlign: 'center',
    },
    dropdownFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: styleConstants.realWhite,
        elevation: 10, // without this, footer flows into underlaying content
    },
    dropdownFooterIcon: {
        marginRight: 12,
        color: styleConstants.primary,
        fontSize: styleConstants.iconFont,
    },
    dropdownFooterText: {
        color: styleConstants.primary,
        fontSize: styleConstants.regularFont,
        textAlign: 'center',
    },
});

export default class DropdownButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.scrollToBeginning = this.scrollToBeginning.bind(this);
        this.renderItem = this.renderItem.bind(this);

        this.maxHeight = 216;
        this.itemHeight = 41.5;

        this.state = {
            isExpanded: false,
        }
    }

    static get propTypes() {
        return {
            displayText: PropTypes.string, // display text but don't pass value back, eg. Select a Category
            currentValue: PropTypes.string,
            values: PropTypes.array.isRequired,
            handleSelect: PropTypes.func.isRequired,
            headerIconName: PropTypes.string,
            headerValue: PropTypes.string,
            pushContent: PropTypes.bool, // animate push content below
            buttonBackgroundColor: PropTypes.string,
        };
    }

    handleSelect(value) {
        this.props.values.length && this.scrollToBeginning(); // only if we have values
        this.toggleExpanded();
        this.props.handleSelect(value);
    }

    toggleExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    scrollToBeginning() {
        this.refs.itemList.scrollToOffset({ x: 0, y: 0, animated: false });
    }

    renderItem = ({ item }) => {
        return (
            <Touchable
                style={styles.dropdownItem}
                onPress={() => { this.handleSelect(item.title) }}
                key={item.title}>
                <Text
                    style={[styles.dropdownItemText, styleConstants.primaryFont]}>
                    {item.title}
                </Text>
            </Touchable>
        );
    }

    render() {

        // We need to check how many items we have so that we can render a perfect height
        let itemCount = (this.props.headerValue ? 1 : 0) + this.props.values.length + 1; // + 1 for Edit Categories
        const dropdownInnerHeight = itemCount * this.itemHeight;

        const pushContentStyles = this.props.pushContent ?
            {
                position: 'relative',
                top: 8,
                marginTop: 0,
            }
            :
            {
                maxHeight: this.maxHeight
            };

        const header = this.props.headerValue && this.props.currentValue !== this.props.headerValue ?
            <Touchable
                style={styles.dropdownHeader}
                onPress={() => { this.handleSelect(this.props.headerValue) }}>
                <Text
                    style={[styles.dropdownHeaderText, styleConstants.primaryFont]}>
                    {this.props.headerValue}
                </Text>
            </Touchable>
            :
            null;

        const editCategories =
            <Touchable
                style={styles.dropdownFooter}
                onPress={() => { this.handleSelect('Edit Categories') }}>
                <Icon name='edit' style={styles.dropdownFooterIcon} />
                <Text
                    style={[styles.dropdownFooterText, styleConstants.primaryFont]}>
                    {this.props.values && this.props.values.length ? 'Edit Categories' : 'Add a Category'}
                </Text>
            </Touchable>;

        const itemList = this.props.values.length ?
            <AnimateHeight
                initialValue={0}
                finalValue={dropdownInnerHeight}
                shouldAnimateIn={this.state.isExpanded}
                shouldAnimateOut={!this.state.isExpanded}
                style={[styles.dropdownItemsWrapper, pushContentStyles]}>
                <FlatList
                    keyExtractor={item => 'category-' + item.uid}
                    ref='itemList'
                    data={this.props.values}
                    renderItem={this.renderItem}
                    ListHeaderComponent={header ? () => header : null}
                    ListFooterComponent={() => editCategories}
                    style={styles.dropdownItemsContainer} />
            </AnimateHeight>
            :
            <AnimateHeight
                initialValue={0}
                finalValue={dropdownInnerHeight}
                shouldAnimateIn={this.state.isExpanded}
                shouldAnimateOut={!this.state.isExpanded}
                style={[styles.dropdownItemsWrapper, pushContentStyles]}>
                {editCategories}
            </AnimateHeight>

        const button = this.props.categoriesButton ?
            <CategoriesButton
                backgroundColor={this.props.buttonBackgroundColor}
                handlePress={this.toggleExpanded}
                currentCategory={this.props.currentCategory}
                currentCount={this.props.currentCount}
                totalCount={this.props.totalCount} />
            :
            <Button
                backgroundColor={this.props.buttonBackgroundColor}
                handlePress={this.toggleExpanded}
                text={this.props.currentValue ? this.props.currentValue : this.props.displayText} />;

        return (
            <View style={styles.dropdownContainer}>

                {button}

                {itemList}

            </View>
        );
    }
}