import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    StyleSheet,
    Easing,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from './Button';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.white,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        width: 200,
        paddingVertical: 4,
        marginTop: 16,
    },
    dropdownButtonText: {
        color: styleConstants.primary,
        fontSize: 24,
        textAlign: 'center',
        width: 200,
    },
    dropdownItemsWrapper: {
        position: 'absolute',
        top: 52,
        width: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
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
        zIndex: 1
    },
    dropdownHeader: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        backgroundColor: styleConstants.lightGrey,
        paddingVertical: 6,
    },
    dropdownHeaderText: {
        color: styleConstants.white,
        fontSize: 18,
        textAlign: 'center',
    },
    dropdownHeaderIcon: {
        marginRight: 12,
    },
    dropdownItem: {        
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6,
        width: 200
    },
    dropdownItemText: {
        color: styleConstants.primary,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default class Dropdown extends React.Component {
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
            displayText: React.PropTypes.string,
            value: React.PropTypes.string,
            handleSelect: React.PropTypes.func.isRequired,
            values: React.PropTypes.array.isRequired,
            editItem: React.PropTypes.bool,
            pushContent: React.PropTypes.bool
        };
    }

    toggleExpanded() {
        const itemCount = (this.props.editItem ? 1 : 0) + (this.props.showAllOption ? 1 : 0) + this.props.values.length;

        // Check if the dropdown is open/closed
        if (!this.state.isExpanded) {
            this.setState({
                isExpanded: true
            });

            Animated.timing(
                this.state.height,
                {
                    toValue: itemCount * 36,
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

    renderItem({ item, index }) {
        return (
            <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(index) }} >
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
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(200) }} >
                <Icon name='pencil' size={18} color={styleConstants.white} style={styles.dropdownHeaderIcon} />
                <Text
                    style={[styles.dropdownHeaderText, styleConstants.robotoCondensed]}>
                    Edit Categories
                </Text>
            </TouchableOpacity>;

        const footer = 
            <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => { this.toggleExpanded(); this.props.handleSelect(100) }} >
                <Text
                    style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                    All
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
                        ListHeaderComponent={this.props.editItem ? () => header : null}
                        ListFooterComponent={this.props.showAllOption ? () => footer : null}/>
                </View>
            </Animated.View>;

        return (
            <View style={styles.dropdownContainer}>
                <Button
                    styleMode='transparentReversed'
                    handlePress={this.toggleExpanded}
                    text={this.props.value ? this.props.value : this.props.displayText} />
                {/*<TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={this.toggleExpanded} >
                    <Text
                        style={[styles.dropdownButtonText, styleConstants.ranga]} >
                        {this.props.value ? this.props.value : this.props.displayText}
                    </Text>
                </TouchableOpacity>*/}
                {itemList}
            </View>
        );
    }
}