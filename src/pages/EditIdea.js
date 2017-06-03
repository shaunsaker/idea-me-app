import React from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';

import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import DropdownButton from '../components/DropdownButton';
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
            categories: React.PropTypes.array,
            priorities: React.PropTypes.array,
            initialIdeaTitle: React.PropTypes.string,
            initialIdeaDescription: React.PropTypes.string,
            initialIdeaCategory: React.PropTypes.string,
            initialIdeaPriority: React.PropTypes.string,
            editIdeaTitle: React.PropTypes.string,
            editIdeaDescription: React.PropTypes.string,
            editIdeaCategory: React.PropTypes.string,
            editIdeaPriority: React.PropTypes.string,
        };
    }

    componentDidMount() {

        // Initial Setup
        this.setState({
            currentCategory: this.props.initialIdeaCategory
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

    selectCategory(value) {

        if (value === 'Edit Categories') {
            Actions.categories();
        }
        else {
            this.props.dispatch({
                type: 'UPDATE_EDIT_IDEA_CATEGORY',
                value,
            });
        }
    }

    selectPriority(value) {
        this.props.dispatch({
            type: 'UPDATE_EDIT_IDEA_PRIORITY',
            value: value,
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
                ideas[i].category = this.props.editIdeaCategory;
                ideas[i].priority = this.props.editIdeaPriority;
                break;
            }
        }

        this.props.dispatch({
            type: 'UPDATE_USER_IDEAS',
            ideas
        });

        // this.props.dispatch({
        //     type: 'saveUserIdeas',
        //     ideas,
        //     uid: this.props.uid
        // });

        Actions.pop();
    }

    render() {
        const enableContinueButton = true; //TODO

        return (
            <Page
                backgroundColor={styleConstants.primary}>

                <Header
                    text='Edit Idea'
                    headerShadow={false}
                    rightIconName='close'
                    rightIconSize={28}
                    handleRightIconPress={() => Actions.pop()} />

                <InputContainer>
                    <Input
                        placeholder="WHAT'S THE BIG IDEA?"
                        value={this.props.editIdeaTitle ? this.props.editIdeaTitle : this.props.initialIdeaTitle}
                        handleChange={this.updateEditIdeaTitle}
                        autoFocus={true} />
                    <TextArea
                        value={this.props.editIdeaDescription !== null ? this.props.editIdeaDescription : this.props.initialIdeaDescription}
                        placeholder={this.props.editIdeaDescription ? '' : 'Enter your description here...'}
                        handleChange={this.updateEditIdeaDescription} />

                    <DropdownButton
                        displayText='Select a Category'
                        currentValue={this.props.editIdeaCategory ? this.props.editIdeaCategory : this.props.initialIdeaCategory}
                        values={this.props.categories}
                        handleSelect={this.selectCategory}
                        headerValue='Edit Categories'
                        pushContent={true} />
                    <DropdownButton
                        displayText='Select a Priority'
                        currentValue={this.props.editIdeaPriority ? this.props.editIdeaPriority : this.props.initialIdeaPriority}
                        values={this.props.priorities}
                        handleSelect={this.selectPriority}
                        pushContent={true} />
                </InputContainer>

                <Button
                    iconName='check'
                    text='Continue'
                    styleMode='primaryReversed'
                    handlePress={this.updateIdea}
                    disabled={!enableContinueButton} />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        categories: state.main.userData.categories,
        priorities: state.main.appData.priorities,
        initialIdeaTitle: state.routes.scene.title,
        initialIdeaDescription: state.routes.scene.description,
        initialIdeaCategory: state.routes.scene.category,
        initialIdeaPriority: state.routes.scene.priority,
        editIdeaTitle: state.main.appData.editIdea.title,
        editIdeaDescription: state.main.appData.editIdea.description,
        editIdeaCategory: state.main.appData.editIdea.category,
        editIdeaPriority: state.main.appData.editIdea.priority,
        ideas: state.main.userData.ideas,
        uid: state.main.user.uid,
    });
}

export default connect(mapStateToProps)(EditIdea);