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

export class AddIdea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newIdeaTitle: null,
      newIdeaDescription: null,
      newIdeaCategory: null,
      newIdeaPriority: null,
    }

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
      uid: React.PropTypes.string,
    }
  }

  updateNewIdeaTitle(value) {
    this.setState({
      newIdeaTitle: value
    });
  }

  updateNewIdeaDescription(value) {
    this.setState({
      newIdeaDescription: value
    });
  }

  selectCategory(value) {

    if (value === 'Edit Categories') {
      Actions.categories();
    }
    else {
      this.setState({
        newIdeaCategory: value
      });
    }
  }

  selectPriority(value) {
    this.setState({
      newIdeaPriority: value
    });
  }

  addNewIdea() {
    const newIdea = utilities.createNewIdea(this.state.newIdeaTitle, this.state.newIdeaDescription, this.state.newIdeaCategory, this.state.newIdeaPriority);
    const ideas = utilities.addNewIdea(newIdea, this.props.ideas); // will return null if idea with this title already exists

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
    const enableContinueButton = this.state.newIdeaTitle;

    return (
      <Page
        backgroundColor={styleConstants.primary}>

        <Header
          text='Add an Idea'
          closeButton
          headerShadow />

        <InputContainer>
          <Input
            placeholder="WHAT'S THE BIG IDEA?"
            value={this.state.newIdeaTitle}
            handleChange={this.updateNewIdeaTitle} />
          <Input
            placeholder="ENTER YOUR DESCRIPTION HERE"
            value={this.state.newIdeaDescription}
            handleChange={this.updateNewIdeaDescription}
            multiline={true} />
            
          <DropdownButton
            displayText='Select a Category'
            currentValue={this.state.newIdeaCategory}
            values={this.props.categories}
            handleSelect={this.selectCategory}
            headerValue='Edit Categories'
            pushContent={true} />
          <DropdownButton
            displayText='Select a Priority'
            currentValue={this.state.newIdeaPriority}
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
    uid: state.main.user.uid
  });
}

export default connect(mapStateToProps)(AddIdea);