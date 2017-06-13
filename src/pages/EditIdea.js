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
import Loader from '../components/Loader';

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
            ideas: React.PropTypes.object,
            categories: React.PropTypes.object,
            priorities: React.PropTypes.object,
            uid: React.PropTypes.string,
            cloudDataSuccess: React.PropTypes.bool,
        };
    }

    componentDidMount() {
        this.updateEditIdeaTitle(this.props.initialIdeaTitle);
        this.props.initialIdeaDescription && this.updateEditIdeaDescription(this.props.initialIdeaDescription);
        this.props.initialIdeaCategory && this.selectCategory(this.props.initialIdeaCategory);
        this.props.initialIdeaPriority && this.selectPriority(this.props.initialIdeaPriority);
    }

    componentDidUpdate() {
        if (this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: 'RESET_CLOUD_DATA_SUCCESS',
            });

            Actions.pop();
        }
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
        const editedIdea = {
            title: utilities.firstCharToUppercase(this.state.editIdeaTitle),
            description: this.state.editIdeaDescription && utilities.firstCharToUppercase(this.state.editIdeaDescription),
            category: this.state.editIdeaCategory,
            priority: this.state.editIdeaPriority,
            uid: this.props.initialIdeaUID,
        };

        let isIdeaTitlePresent;
        const remainingIdeas = utilities.removeObjectFromObjectArray(this.props.initialIdeaUID, this.props.ideas);

        // check if the new idea title is already present (but exclude our current idea)
        isIdeaTitlePresent = utilities.isKeyValuePairPresentInObjectArray({ title: editedIdea.title }, remainingIdeas);

        if (!isIdeaTitlePresent) {
            this.props.dispatch({
                type: 'TOGGLE_LOADING'
            });

            const newIdeas = utilities.updateObjectInObjectArray(this.props.initialIdeaUID, editedIdea, this.props.ideas);
            console.log(newIdeas);

            this.props.dispatch({
              type: 'saveUserData',
              node: 'ideas',
              uid: this.props.uid,
              userData: newIdeas,
            });
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
        const categories = utilities.convertObjectArrayToArrayOfObjects(this.props.categories);
        const priorities = utilities.convertObjectArrayToArrayOfObjects(this.props.priorities)

        return (
            <Page>

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
                        multiline />

                    <DropdownButton
                        displayText='Select a Category'
                        currentValue={this.state.editIdeaCategory}
                        values={categories}
                        handleSelect={this.selectCategory}
                        headerIconName='mode-edit'
                        headerValue='Edit Categories'
                        pushContent />
                    <DropdownButton
                        displayText='Select a Priority'
                        currentValue={this.state.editIdeaPriority}
                        values={priorities}
                        handleSelect={this.selectPriority}
                        pushContent />
                </InputContainer>

                <Button
                    iconName='check'
                    text='Continue'
                    styleMode='primaryReversed'
                    handlePress={this.updateIdea}
                    disabled={!enableContinueButton} />

                <Growl />

                <Loader
                    position='bottom' />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        initialIdeaUID: state.routes.scene.uid,
        initialIdeaTitle: state.routes.scene.title,
        initialIdeaDescription: state.routes.scene.description,
        initialIdeaCategory: state.routes.scene.category,
        initialIdeaPriority: state.routes.scene.priority,
        ideas: state.main.userData.ideas,
        categories: state.main.userData.categories,
        priorities: state.main.appData.priorities,
        uid: state.main.auth.uid,
        cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    });
}

export default connect(mapStateToProps)(EditIdea);