import React from "react";
import {
    View,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import utilities from '../utilities';

import styles from '../styles/pages/EditIdea';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import CategoriesDropdown from '../components/CategoriesDropdown';
import Button from '../components/Button';

export class EditIdea extends React.Component {
    constructor(props) {
        super(props);

        this.updateEditIdeaTitle = this.updateEditIdeaTitle.bind(this);
        this.updateEditIdeaDescription = this.updateEditIdeaDescription.bind(this);
        this.navigateCategories = this.navigateCategories.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectPriority = this.selectPriority.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
    }

    static get propTypes() {
        return {
            categories: React.PropTypes.array.isRequired,
            priorities: React.PropTypes.array.isRequired,
            initialIdeaTitle: React.PropTypes.string.isRequired,
            initialIdeaDescription: React.PropTypes.string,
            initialIdeaCategory: React.PropTypes.number.isRequired,
            initialIdeaPriority: React.PropTypes.number.isRequired,
            editIdeaTitle: React.PropTypes.number,
            editIdeaTitle: React.PropTypes.string,
            editIdeaDescription: React.PropTypes.string,
            editIdeaCategory: React.PropTypes.number,
            editIdeaPriority: React.PropTypes.number,
        };
    }

    updateEditIdeaTitle(text) {
        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_TITLE',
            value: text,
        });
    }

    updateEditIdeaDescription(text) {
        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_DESCRIPTION',
            value: text,
        });
    }

    navigateCategories() {
        Actions.categories();
    }

    selectCategory(eventId) {

        // 100 is reserved for blank categories, 200 is reserved as the categories button
        if (eventId !== 200) {
            if (eventId !== 100) {
                this.props.dispatch({
                    type: 'UPDATE_EDIT_IDEA_CATEGORY',
                    value: eventId
                });
            }
        }
        else {
            this.navigateCategories();
        }
    }

    selectPriority(eventId) {

        // 100 is reserved for blank priority
        if (eventId !== 100) {
            this.props.dispatch({
                type: 'UPDATE_EDIT_IDEA_PRIORITY',
                value: eventId,
            });
        }
    }

    componentDidMount() {

        // Initial Setup
        this.setState({
            currentCategory: this.props.categories[this.props.initialIdeaCategory]
        });

        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_TITLE',
            value: this.props.initialIdeaTitle,
        });

        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_DESCRIPTION',
            value: this.props.initialIdeaDescription,
        });

        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_CATEGORY',
            value: this.props.initialIdeaCategory
        });

        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_PRIORITY',
            value: this.props.initialIdeaPriority
        });

        this.props.dispatch({
            type: 'SET_EDIT_IDEA_ID',
            id: this.props.initialIdeaTitle
        });
    }

    updateIdea() {
        let ideas = this.props.ideas;

        for (let i = 0; i < ideas.length; i++) {
            if (ideas[i].title === this.props.initialIdeaTitle) {
                ideas[i].title = utilities.firstCharToUppercase(this.props.editIdeaTitle.trim());
                if (ideas[i].description) {
                    ideas[i].description = utilities.firstCharToUppercase(this.props.editIdeaDescription.trim());
                }
                ideas[i].categoryId = this.props.editIdeaCategory;
                ideas[i].priorityId = this.props.editIdeaPriority;
                break;
            }
        }

        this.props.dispatch({
            type: 'UPDATE_USER_IDEAS',
            ideas
        });

        this.props.dispatch({
            type: 'saveUserIdeas',
            ideas,
            uid: this.props.uid
        });

        Actions.pop();
    }

    render() {
        const deleteIcon = this.props.editIdeaDescription && this.props.editIdeaDescription.length ?
            <View style={styles.deleteContainer}>
                <TouchableOpacity
                    style={styles.delete}
                    onPress={() => this.updateEditIdeaDescription('')}>
                    <MaterialIcon
                        name='close'
                        color={styleConstants.grey}
                        size={18} />
                </TouchableOpacity>
            </View>
            :
            null;

        return (
            <View
                style={styles.container}>
                <Header
                    backgroundColor={styleConstants.primary}
                    text='Edit Idea'
                    textSize={28}
                    textColor={styleConstants.white}
                    textStyle={styleConstants.ranga}
                    rightIconName='close'
                    rightIconColor={styleConstants.white}
                    rightIconSize={28}
                    handleRightIconPress={() => Actions.pop()} />
                <View style={styles.inputArea}>
                    <Input
                        value={this.props.editIdeaTitle ? this.props.editIdeaTitle : this.props.initialIdeaTitle}
                        handleChange={this.updateEditIdeaTitle} />
                    <View style={styles.textAreaContainer}>
                        <TextArea
                            value={this.props.editIdeaDescription !== null ? this.props.editIdeaDescription : this.props.initialIdeaDescription}
                            placeholder={this.props.editIdeaDescription ? '' : 'Enter your description here...'}
                            handleChange={this.updateEditIdeaDescription} />
                        {deleteIcon}
                    </View>
                    <CategoriesDropdown
                        displayText='Select a Category'
                        value={this.props.editIdeaCategory !== null ? this.props.categories[this.props.editIdeaCategory] : this.props.categories[this.props.initialIdeaCategory]}
                        handleSelect={this.selectCategory}
                        values={this.props.categories}
                        editItem={true}
                        pushContent={true} />
                    <CategoriesDropdown
                        displayText='Select a Priority'
                        value={this.props.editIdeaPriority !== null ? this.props.priorities[this.props.editIdeaPriority] : this.props.priorities[this.props.initialIdeaPriority]}
                        handleSelect={this.selectPriority}
                        values={this.props.priorities}
                        pushContent={true} />
                </View>
                <Button
                    iconName='check'
                    handlePress={this.updateIdea} />
            </View >
        );
    }
}

function mapStateToProps(state) {
    return ({
        categories: state.main.userData.categories,
        priorities: state.main.appData.priorities,
        initialIdeaTitle: state.routes.scene.title,
        initialIdeaDescription: state.routes.scene.description,
        initialIdeaCategory: Number(state.routes.scene.categoryId),
        initialIdeaPriority: Number(state.routes.scene.priorityId),
        editIdeaTitle: state.main.userData.editIdea.title,
        editIdeaDescription: state.main.userData.editIdea.description,
        editIdeaCategory: state.main.userData.editIdea.categoryId,
        editIdeaPriority: state.main.userData.editIdea.priorityId,
        ideas: state.main.userData.ideas,
        uid: state.main.userAuth.uid,
    });
}

export default connect(mapStateToProps)(EditIdea);