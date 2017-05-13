import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    headerContainer: {        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 16,
    },
    leftIcon: { 
        position: 'absolute',
        top: 12,
        left: 8,
    },
    rightIcon: {
        position: 'absolute',
        top: 6,
        right: 8,
    },
    logoContainer: {      
        flex: 1,  
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    title: {
        fontSize: 24,
        color: styleConstants.primary,
        paddingHorizontal: 4
    },
    lightbulb: {
        marginBottom: 4,
    }
});

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.navigateIdeas = this.navigateIdeas.bind(this);
    }

    static get propTypes() {
        return {
            handlePress: React.PropTypes.func
        };
    }

    navigateIdeas() {
        Actions.ideas();
    }

    render() {
        const backButton = this.props.allowBack === false ?
            null
            :
            <TouchableOpacity
                onPress={this.props.handlePress}
                style={styles.leftIcon} >
                <MaterialIcon
                    color={styleConstants.primary}
                    size={36}
                    name='chevron-left' />
            </TouchableOpacity>;

        const addIdeaButton = this.props.addIdea ?
            <TouchableOpacity
                style={styles.rightIcon}
                onPress={() => Actions.addIdea()}>
                <MaterialIcon
                    name='add'
                    color={styleConstants.primary}
                    size={36} />
            </TouchableOpacity>
            :
            null;

        const addCategoryButton = this.props.addCategory ?
            <TouchableOpacity
                style={styles.rightIcon}
                onPress={() => Actions.addCategory()}>
                <MaterialIcon
                    name='add'
                    color={styleConstants.primary}
                    size={36} />
            </TouchableOpacity>
            :
            null;

        return (
            <View style={styles.headerContainer}>
                <StatusBar backgroundColor={styleConstants.primary} />
                {backButton}
                <TouchableOpacity
                    style={styles.logoContainer}
                    onPress={this.props.blockHome ? null : this.navigateIdeas}>
                    <Octicon
                        name='light-bulb'
                        size={24}
                        color={styleConstants.secondary}
                        style={styles.lightbulb} />
                    <Text style={[styles.title, styleConstants.ranga]}>IDEA ME!</Text>
                </TouchableOpacity>
                <View style={styles.rightIcon}>
                    {addIdeaButton}
                    {addCategoryButton}
                </View>
            </View>
        );
    }
}