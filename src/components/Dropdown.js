import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    ScrollView,
    StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.primary,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: styleConstants.white,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        width: 280,
        paddingVertical: 8,
        marginTop: 16
    },
    dropdownItemsWrapper: {
        position: 'absolute',
        top: 56,
        width: 280,
        zIndex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        backgroundColor: styleConstants.white,
        maxHeight: 200,
    },
    dropdownItemsContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16
    },
    dropdownItem: {        
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: styleConstants.white,
        paddingVertical: 6,
        width: 240
    },
    dropdownItemAdd: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: styleConstants.primary,
        backgroundColor: styleConstants.white,
        paddingVertical: 6,
    },
    dropdownButtonText: {
        color: styleConstants.white,
        fontSize: 24,
        textAlign: 'center',
        width: 240
    },
    dropdownItemText: {
        color: styleConstants.primary,
        fontSize: 16,
        textAlign: 'center'
    },
    editIcon: {
        marginRight: 12
    }
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
        const itemCount = (this.props.editItem ? 1 : 0) + (this.props.displayText ? 0 : 1) + this.props.values.length;

        // Check if the dropdown is open/closed
        if (!this.state.isExpanded) {
            this.setState({
                isExpanded: true
            });

            Animated.timing(
                this.state.height,
                {
                    toValue: itemCount * 36
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
                    toValue: 0
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

        const itemList =
            <Animated.View
                style={[styles.dropdownItemsWrapper, pushContentStyles, { height: this.state.height }]}>
                <View style={styles.dropdownItemsContainer}>
                    {
                        this.props.editItem ?
                            <TouchableOpacity
                                style={styles.dropdownItemAdd}
                                onPress={() => { this.toggleExpanded(); this.props.handleSelect(200) }} >
                                <Icon name='pencil' size={18} style={styles.editIcon} />
                                <Text
                                    style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                                    Edit Categories
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <ScrollView>
                        <View style={styles.dropdownItemsContainer}>
                            {
                                this.props.displayText ?
                                    null :
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => { this.toggleExpanded(); this.props.handleSelect(100) }} >
                                        <Text
                                            style={[styles.dropdownItemText, styleConstants.robotoCondensed]}>
                                            All
                                        </Text>
                                    </TouchableOpacity>
                            }

                            <FlatList
                                keyExtractor={item => 'dropdown' + item}
                                data={this.props.values}
                                renderItem={this.renderItem} />
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>;

        return (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={this.toggleExpanded} >
                    <Text
                        style={[styles.dropdownButtonText, styleConstants.ranga]} >
                        {this.props.value ? this.props.value : this.props.displayText}
                    </Text>
                </TouchableOpacity>
                {itemList}
            </View>
        );
    }
}