import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from "react-native-router-flux";

import lightBulb from '../styles/img/lightbulb.png';

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
            null
            :
            <TouchableOpacity
                onPress={this.props.handlePress} >
                <Icon
                    name='chevron-left'
                    style={styles.leftIcon} />
            </TouchableOpacity>;

        const addIdeaButton = this.props.ideas ?
            <AddButton size={36} ideas={true} />
                :
            null;

        const addCategoryButton = this.props.categories ?
            <AddButton size={36} categories={true} />
                :
            null;

        const viewIdeasButton = this.props.viewIdeas ?
            <ViewButton size={36} ideas={true} />
                :
            null;

        const viewCategoriesButton = this.props.viewCategories ?
            <ViewButton size={36} categories={true} />
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
                        <Image src={lightBulb} width={50} height={50} style={styles.image} />
                        <Text style={[styles.title, styleConstants.dekko]}>IDEA ME!</Text>
                    </TouchableOpacity>
                    <View style={styles.rightIcon}>
                        {addIdeaButton}
                        {addCategoryButton}
                        {viewIdeasButton}
                        {viewCategoriesButton}
                    </View>
                </View>
                );
    }
}