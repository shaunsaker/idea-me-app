import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    StyleSheet,
    Easing,
    Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from './Button';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
    },
    dropdownItemsWrapper: {
        position: 'absolute',
        top: 64,
        left: 16,
        width: window.width -64,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        backgroundColor: styleConstants.white,
        maxHeight: 200,
        zIndex: 1,
        marginBottom: -16 // remove ghost margin
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
    },
    dropdownHeaderText: {
        color: styleConstants.white,
        fontSize: 18,
        textAlign: 'center',
    },
    dropdownItem: {        
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        width: window.width -64,
    },
    dropdownItemText: {
        color: styleConstants.primary,
        fontSize: 18,
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
        fontSize: 18,
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

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            displayText: React.PropTypes.string, // display text but don't pass value back, eg. Select a Category
            currentValue: React.PropTypes.string,
            values: React.PropTypes.array.isRequired,
            handleSelect: React.PropTypes.func.isRequired,
            headerValue: React.PropTypes.string,
            footerValue: React.PropTypes.string,
            pushContent: React.PropTypes.bool, // animate push content below
        };
    }

    toggleExpanded() {

        // We need to check how many items we have so that we can render a perfect height (up to 200)
        const itemCount = (this.props.headerValue ? 1 : 0) + (this.props.footerValue ? 1 : 0) + this.props.values.length;
        let dropdownHeight = itemCount * 36;
        dropdownHeight = dropdownHeight < 200 ? dropdownHeight : 200; // if we ever need to indicate that the view is scrollable, this is a good flag to use

        // Check if the dropdown is open/closed
        if (!this.state.isExpanded) {
            this.setState({
                isExpanded: true
            });

            Animated.timing(
                this.state.height,
                {
                    toValue: itemCount * 36, // 36 is the height of each item
                    duration: 500,
                    easing: Easing.gentle
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
                    duration: 500,
                    easing: Easing.gentle
                }
            ).start();
        }
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(item) }} >
                <Text
                    style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const pushContentStyles = this.props.pushContent ?
            {
                position: 'relative',
                top: 8,
                marginTop: 0
            }
            :
            { marginTop: 16 };

        const header = 
            <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(this.props.headerValue) }} >
                <Icon name='pencil' size={18} color={styleConstants.white} style={styles.dropdownHeaderIcon} />
                <Text
                    style={[styles.dropdownHeaderText, styleConstants.robotoCondensed]}>
                    {this.props.headerValue}
                </Text>
            </TouchableOpacity>;

        const footer = 
            <TouchableOpacity
                style={styles.dropdownFooter}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(this.props.footerValue) }} >
                <Text
                    style={[styles.dropdownFooterText, styleConstants.robotoCondensed]}>
                    {this.props.footerValue}
                </Text>
            </TouchableOpacity>;
            
        const itemList =
            <Animated.View
                style={[styles.dropdownItemsWrapper, pushContentStyles, { height: this.state.height }]}>
                <View style={styles.dropdownItemsContainer}>
                    <FlatList
                        keyExtractor={item => 'dropdown' + item}
                        data={this.props.values}
                        renderItem={this.renderItem} 
                        ListHeaderComponent={this.props.headerValue ? () => header : null}
                        ListFooterComponent={this.props.footerValue ? () => footer : null}/>
                </View>
            </Animated.View>;

        return (
            <View style={styles.dropdownContainer}>
                <Button
                    styleMode='transparent'
                    handlePress={this.toggleExpanded}
                    text={this.props.currentValue ? this.props.currentValue : this.props.displayText} />
                {itemList}
            </View>
        );
    }
}