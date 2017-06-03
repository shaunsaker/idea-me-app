import React from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import DropdownButton from '../components/DropdownButton';
import Button from '../components/Button';
import Growl from '../components/Growl';

export class EditIdea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editIdeaTitle: null,
            editIdeaDescription: null,
            editIdeaCategory: null,
            editIdeaPriority: null,
        }

        this.updateEditIdeaTitle = this.updateEditIdeaTitle.bind(this);
        this.updateEditIdeaDescription = this.updateEditIdeaDescription.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectPriority = this.selectPriority.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
    }

    static get propTypes() {
        return {
            initialIdeaTitle: React.PropTypes.string,
            initialIdeaDescription: React.PropTypes.string,
            initialIdeaCategory: React.PropTypes.string,
            initialIdeaPriority: React.PropTypes.string,
            categories: React.PropTypes.array,
            priorities: React.PropTypes.array,
            uid: React.PropTypes.string,
        };
    }

    componentDidMount() {
        this.updateEditIdeaTitle(this.props.initialIdeaTitle);
        this.props.initialIdeaDescription && this.updateEditIdeaDescription(this.props.initialIdeaDescription);
        this.props.initialIdeaCategory && this.selectCategory(this.props.initialIdeaCategory);
        this.props.initialIdeaPriority && this.selectPriority(this.props.initialIdeaPriority);
    }

    updateEditIdeaTitle(value) {
        this.setState({
            editIdeaTitle: value
        });
    }

    updateEditIdeaDescription(value) {
        this.setState({
            editIdeaDescription: value
        });
    }

    selectCategory(value) {

        if (value === 'Edit Categories') {
            Actions.categories();
        }
        else {
            this.setState({
                editIdeaCategory: value
            });
        }
    }

    selectPriority(value) {
        this.setState({
            editIdeaPriority: value
        });
    }

    updateIdea() {
        const editedIdea = utilities.createNewIdea(this.state.editIdeaTitle, this.state.editIdeaDescription, this.state.editIdeaCategory, this.state.editIdeaPriority);
        const ideas = utilities.editIdea(editedIdea, this.props.ideas, this.props.initialIdeaTitle); // will return null if idea with this title already exists

        if (ideas) {
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
        else {
            this.props.dispatch({
                type: 'USER_ERROR',
                message: 'An idea with this title already exists'
            });
        }

    }

    render() {
        const enableContinueButton = this.state.editIdeaTitle;

        return (
            <Page
                backgroundColor={styleConstants.primary}>

                <Header
                    text='Edit Idea'
                    closeButton
                    headerShadow />

                <InputContainer>
                    <Input
                        placeholder="WHAT'S THE BIG IDEA?"
                        value={this.state.editIdeaTitle}
                        handleChange={this.updateEditIdeaTitle} />
                    <Input
                        placeholder='ENTER YOUR DESCRIPTION HERE'
                        value={this.state.editIdeaDescription}
                        handleChange={this.updateEditIdeaDescription} 
                        multiline={true} />

                    <DropdownButton
                        displayText='Select a Category'
                        currentValue={this.state.editIdeaCategory}
                        values={this.props.categories}
                        handleSelect={this.selectCategory}
                        headerValue='Edit Categories'
                        pushContent={true} />
                    <DropdownButton
                        displayText='Select a Priority'
                        currentValue={this.state.editIdeaPriority}
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

                <Growl />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        initialIdeaTitle: state.routes.scene.title,
        initialIdeaDescription: state.routes.scene.description,
        initialIdeaCategory: state.routes.scene.category,
        initialIdeaPriority: state.routes.scene.priority,
        categories: state.main.userData.categories,
        priorities: state.main.appData.priorities,
        ideas: state.main.userData.ideas,
        uid: state.main.user.uid,
    });
}

export default connect(mapStateToProps)(EditIdea);