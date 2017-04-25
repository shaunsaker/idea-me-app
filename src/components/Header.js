import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import { Actions } from "react-native-router-flux";

import styles from '../styles/components/Header';
import styleConstants from '../styles/styleConstants';

import AddButton from '../components/AddButton';    
import ViewButton from '../components/ViewButton';

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
            <View />
            :
            <TouchableOpacity
                onPress={this.props.handlePress} >
                <MaterialIcon
                    color={styleConstants.secondary}
                    size={36}
                    name='chevron-left'
                    style={styles.leftIcon} />
            </TouchableOpacity>;

        const addIdeaButton = this.props.ideas ?
            <AddButton size={36} ideas={true} />
                :
            <View />

        const addCategoryButton = this.props.categories ?
            <AddButton size={36} categories={true} />
                :
            null;

        const homePageStyles = this.props.home ?
            {justifyContent: 'center' }
            :
            {};

        return (
            <View style={[styles.headerContainer, homePageStyles]}>
                    {backButton}
                    <TouchableOpacity
                        style={styles.logoContainer}
                        onPress={this.navigateIdeas}>
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