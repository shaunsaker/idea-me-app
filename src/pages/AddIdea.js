import React from "react";
import {
  View
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';

import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import InputContainer from '../components/InputContainer';
import Header from '../components/Header';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import DropdownButton from '../components/DropdownButton';
import Button from '../components/Button';
import Growl from '../components/Growl';

export class AddIdea extends React.Component {
  constructor(props) {
    super(props);

    this.updateNewIdeaTitle = this.updateNewIdeaTitle.bind(this);
    this.updateNewIdeaDescription = this.updateNewIdeaDescription.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPriority = this.selectPriority.bind(this);
    this.addNewIdea = this.addNewIdea.bind(this);
  }

  static get propTypes() {
    return {
      ideas: React.PropTypes.array,
      categories: React.PropTypes.array.isRequired,
      priorities: React.PropTypes.array.isRequired,
      newIdea: React.PropTypes.object,
      newIdeaTitle: React.PropTypes.string,
      newIdeaDescription: React.PropTypes.string,
      newIdeaCategory: React.PropTypes.string,
      newIdeaPriority: React.PropTypes.string,
      uid: React.PropTypes.string,
    }
  }

  updateNewIdeaTitle(text) {
    this.props.dispatch({
      type: 'UPDATE_NEW_IDEA_TITLE',
      value: text
    });
  }

  updateNewIdeaDescription(text) {
    this.props.dispatch({
      type: 'UPDATE_NEW_IDEA_DESCRIPTION',
      value: text
    });
  }

  selectCategory(value) {

    if (value === 'Edit Categories') {
      Actions.categories();
    }
    else {
      this.props.dispatch({
        type: 'UPDATE_NEW_IDEA_CATEGORY',
        value,
      });
    }
  }

  selectPriority(value) {
    this.props.dispatch({
      type: 'UPDATE_NEW_IDEA_PRIORITY',
      value: value,
    });
  }

  addNewIdea() {
    let ideas = this.props.ideas;
    let newIdeaTitle = this.props.newIdeaTitle;
    let newIdeaDescription = this.props.newIdeaDescription;

    newIdeaTitle = utilities.firstCharToUppercase(newIdeaTitle.trim());

    if (newIdeaDescription) {
      newIdeaDescription = utilities.firstCharToUppercase(newIdeaDescription.trim());
    }

    if (ideas) {
      ideas.unshift({
        title: newIdeaTitle,
        description: newIdeaDescription,
        category: this.props.newIdeaCategory,
        priority: this.props.newIdeaPriority
      });
    }
    else {
      ideas = [{
        title: newIdeaTitle,
        description: newIdeaDescription,
        category: this.props.newIdeaCategory,
        priority: this.props.newIdeaPriority
      }];
    }

    this.props.dispatch({
      type: 'UPDATE_USER_IDEAS',
      ideas
    });

    // this.props.dispatch({
    //   type: 'saveUserIdeas',
    //   ideas,
    //   uid: this.props.uid
    // });

    Actions.pop();
  }

  render() {
    const enableContinueButton = true; //TODO

    return (
      <Page
        backgroundColor={styleConstants.primary}>

        <Header
          text='Add an Idea'
          headerShadow={false}
          rightIconName='close'
          rightIconSize={28}
          handleRightIconPress={() => Actions.pop()} />

        <InputContainer>
          <Input
            placeholder="WHAT'S THE BIG IDEA?"
            value={this.props.newIdeaTitle}
            handleChange={this.updateNewIdeaTitle} />
          <Input
            placeholder="ENTER YOUR DESCRIPTION HERE?"
            value={this.props.newIdeaDescription}
            handleChange={this.updateNewIdeaDescription} />
          <DropdownButton
            displayText='Select a Category'
            currentValue={this.props.newIdeaCategory ? this.props.newIdeaCategory : null}
            values={this.props.categories}
            handleSelect={this.selectCategory}
            headerValue='Edit Categories'
            pushContent={true} />
          <DropdownButton
            displayText='Select a Priority'
            currentValue={this.props.newIdeaPriority ? this.props.newIdeaPriority : null}
            values={this.props.priorities}
            handleSelect={this.selectPriority}
            pushContent={true} />
        </InputContainer>

        <Button
          iconName='check'
          text='Continue'
          styleMode='primaryReversed'
          handlePress={this.addNewIdea}
          disabled={!enableContinueButton} />

        <Growl />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    ideas: state.main.userData.ideas,
    categories: state.main.userData.categories,
    priorities: state.main.appData.priorities,
    newIdea: state.main.appData.newIdea,
    newIdeaTitle: state.main.appData.newIdea.title,
    newIdeaDescription: state.main.appData.newIdea.description,
    newIdeaCategory: state.main.appData.newIdea.category,
    newIdeaPriority: state.main.appData.newIdea.priority,
    uid: state.main.user.uid
  });
}

export default connect(mapStateToProps)(AddIdea);