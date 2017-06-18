import React from "react";
import {
    View,
    ScrollView,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";

import config from '../config';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import Button from './Button';
import CategoriesButton from './CategoriesButton';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
    },
    dropdownItemsWrapper: {
        position: 'absolute',
        top: 76,
        left: 0,
        right: 0,
        width: window.width - 32,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        backgroundColor: styleConstants.white,
        zIndex: 1,
    },
    dropdownHeader: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: styleConstants.primary,
        borderWidth: 1,
        borderColor: styleConstants.white,
    },
    dropdownHeaderIcon: {
        marginRight: 12,
        color: styleConstants.white,
        fontSize: styleConstants.iconFont,
    },
    dropdownHeaderText: {
        color: styleConstants.white,
        fontSize: styleConstants.regularFont,
        textAlign: 'center',
    },
    dropdownItem: {        
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        width: window.width - 32,        
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
        backgroundColor: styleConstants.primary,
        borderWidth: 1,
        borderColor: styleConstants.white,
    },
    dropdownFooterText: {
        color: styleConstants.white,
        fontSize: styleConstants.regularFont,
        textAlign: 'center',
    },
});

export default class DropdownButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            height: new Animated.Value(0)
        }

        this.maxHeight = 216;
        this.itemHeight = 44;

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            displayText: React.PropTypes.string, // display text but don't pass value back, eg. Select a Category
            currentValue: React.PropTypes.string,
            values: React.PropTypes.array.isRequired,
            handleSelect: React.PropTypes.func.isRequired,
            headerIconName: React.PropTypes.string,
            headerValue: React.PropTypes.string,
            pushContent: React.PropTypes.bool, // animate push content below
            buttonBackgroundColor: React.PropTypes.string,
        };
    }

    toggleExpanded() {

        // We need to check how many items we have so that we can render a perfect height
        const itemCount = (this.props.headerValue ? 1 : 0) + (this.props.footerValue ? 1 : 0) + this.props.values.length;
        const dropdownInnerHeight = itemCount * this.itemHeight;
        const dropdownOuterHeight = dropdownInnerHeight < this.maxHeight ? dropdownInnerHeight : this.maxHeight;

        // Check if the dropdown is open/closed
        if (!this.state.isExpanded) {
            this.setState({
                isExpanded: true
            });

            Animated.timing(
                this.state.height,
                {
                    toValue: dropdownInnerHeight, 
                    duration: config.animation.duration.short,
                    easing: config.animation.easing,
                }
            ).start();
        }
        else {
            this.setState({
                isExpanded: false
            });

            Animated.timing(
                this.state.height,
                {
                    toValue: 0,
                    duration: config.animation.duration.short,
                    easing: config.animation.easing,
                }
            ).start();
        }
    }

    renderItem(item) {
        return (
            <Touchable
                style={styles.dropdownItem}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(item.title) }}
                key={item.title}>
                <Text
                    style={[styles.dropdownItemText, styleConstants.primaryFont]}>
                    {item.title}
                </Text>
            </Touchable>
        );
    }

    render() {
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

        const headerIcon = this.props.headerIconName ?
            <Icon name={this.props.headerIconName} style={styles.dropdownHeaderIcon} />
            :
            null;

        const header = this.props.headerValue && this.props.currentValue !== this.props.headerValue ?
            <Touchable
                style={styles.dropdownHeader}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(this.props.headerValue) }}>
                {headerIcon}
                <Text
                    style={[styles.dropdownHeaderText, styleConstants.primaryFont]}>
                    {this.props.headerValue}
                </Text>
            </Touchable>
            :
            null;
            
        const itemList =
            <Animated.View
                style={[styles.dropdownItemsWrapper, pushContentStyles, { height: this.state.height }]}>
                <ScrollView style={styles.dropdownItemsContainer}>
                    {header}
                    {this.props.values.map((item) => this.renderItem(item))}
                </ScrollView>
            </Animated.View>;

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