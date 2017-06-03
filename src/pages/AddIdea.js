import React from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';

import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import InputContainer from '../components/InputContainer';
import Header from '../components/Header';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import CategoriesDropdown from '../components/CategoriesDropdown';
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
      categories: React.PropTypes.array.isRequired,
      priorities: React.PropTypes.array.isRequired,
      newIdea: React.PropTypes.object,
      newIdeaTitle: React.PropTypes.string,
      newIdeaDescription: React.PropTypes.string,
      newIdeaCategory: React.PropTypes.string,
      newIdeaPriority: React.PropTypes.string,
      ideas: React.PropTypes.array,
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

  selectCategory(eventId) {

    // 100 is reserved for blank categories, 200 is reserved as the categories button
    if (eventId !== 200) {
      if (eventId !== 100) {
        this.props.dispatch({
          type: 'UPDATE_NEW_IDEA_CATEGORY',
          value: eventId,
        });
      }
    }
    else {
      Actions.categories();
    }
  }

  selectPriority(eventId) {

    // 100 is reserved for blank priority
    if (eventId !== 100) {
      this.props.dispatch({
        type: 'UPDATE_NEW_IDEA_PRIORITY',
        value: eventId,
      });
    }
  }

  addNewIdea() {
    if (this.props.newIdeaTitle) {
      let ideas = this.props.ideas;
      let newIdeaTitle = this.props.newIdeaTitle;
      let newIdeaDescription = this.props.newIdeaDescription;

      if (ideas) {
        newIdeaTitle = utilities.firstCharToUppercase(newIdeaTitle.trim());
        if (newIdeaDescription) {
          newIdeaDescription = utilities.firstCharToUppercase(newIdeaDescription.trim());
        }
        ideas.unshift({
          title: newIdeaTitle,
          description: newIdeaDescription,
          categoryId: this.props.newIdeaCategory,
          priorityId: this.props.newIdeaPriority
        });
      }
      else {
        ideas = [{
          title: newIdeaTitle,
          description: newIdeaDescription,
          categoryId: this.props.newIdeaCategory,
          priorityId: this.props.newIdeaPriority
        }];
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
            handleChange={this.updateNewIdeaTitle}
            autoFocus={true} />
          <TextArea
            placeholder="ENTER YOUR DESCRIPTION HERE"
            value={this.props.newIdeaDescription}
            handleChange={this.updateNewIdeaDescription} />
          <CategoriesDropdown
            displayText='Select a Category'
            currentValue={this.props.newIdeaCategory ? this.props.newIdeaCategory : null}
            values={this.props.categories}
            handleSelect={this.selectCategory}
            headerValue='Edit Categories'
            pushContent={true} />
          <CategoriesDropdown
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
    categories: state.main.userData.categories,
    priorities: state.main.appData.priorities,
    newIdea: state.main.appData.newIdea,
    newIdeaTitle: state.main.appData.newIdea.title,
    newIdeaDescription: state.main.appData.newIdea.description,
    newIdeaCategory: state.main.userData.categories[state.main.appData.newIdea.categoryId],
    newIdeaPriority: state.main.appData.priorities[state.main.appData.newIdea.priorityId],
    ideas: state.main.userData.ideas,
    uid: state.main.user.uid
  });
}

export default connect(mapStateToProps)(AddIdea);