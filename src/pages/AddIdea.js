import React from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import RadioSelect from '../components/RadioSelect';
import DropdownButton from '../components/DropdownButton';
import TabBar from '../components/TabBar';
import SnackBar from '../components/SnackBar';
import Loader from '../components/Loader';

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
      ideas: React.PropTypes.object,
      categories: React.PropTypes.object,
      priorities: React.PropTypes.object,
      uid: React.PropTypes.string,
      cloudDataSuccess: React.PropTypes.bool,
      currentAction: React.PropTypes.string,
      hasNetwork: React.PropTypes.bool,
    }
  }

  componentDidUpdate() {
    if (this.props.currentAction === 'addIdea' && this.props.cloudDataSuccess) {
      this.props.dispatch({
        type: 'RESET_CLOUD_DATA_SUCCESS'
      });

      Actions.pop();
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
    const newIdea = {
      title: utilities.firstCharToUppercase(this.state.newIdeaTitle),
      description: this.state.newIdeaDescription && utilities.firstCharToUppercase(this.state.newIdeaDescription),
      category: this.state.newIdeaCategory,
      priority: this.state.newIdeaPriority,
      notes: this.props.newNotes,
      uid: utilities.createUID(),
    };

    let isIdeaTitlePresent;

    // if we have ideas
    if (this.props.ideas) {

      // check if the idea title is already present
      isIdeaTitlePresent = utilities.isKeyValuePairPresentInObjectArray({ title: newIdea.title }, this.props.ideas);
    }

    if (!isIdeaTitlePresent) {
      this.props.dispatch({
        type: 'TOGGLE_LOADING'
      });

      const newIdeas = utilities.pushObjectToObjectArray(newIdea, this.props.ideas);

      this.props.dispatch({
        type: 'saveUserData',
        node: 'ideas',
        uid: this.props.uid,
        userData: newIdeas,
        currentAction: 'addIdea',
        hasNetwork: this.props.hasNetwork,
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
    const enableContinueButton = this.state.newIdeaTitle ? true : false;
    const categories = utilities.convertObjectArrayToArray(this.props.categories);
    const priorities = utilities.convertObjectArrayToArray(this.props.priorities);
    const newNotesCount = utilities.getLengthOfObject(this.props.newNotes);

    return (
      <Page
        removeBottomPadding>

        <Header
          headerShadow
          text='Add an Idea'
          closeButton
          continueButton={enableContinueButton}
          handleRightIconPress={this.addNewIdea} />

        <InputContainer
          style={{ alignItems: 'center' }}>

          <Input
            placeholder="WHAT'S THE BIG IDEA?"
            value={this.state.newIdeaTitle}
            handleChange={this.updateNewIdeaTitle}
            maxLength={16}
            autoFocus />

          <Input
            placeholder="ENTER YOUR DESCRIPTION HERE"
            value={this.state.newIdeaDescription}
            handleChange={this.updateNewIdeaDescription}
            multiline />

          <RadioSelect
            displayText='SELECT A PRIORITY'
            currentValue={this.state.newIdeaPriority}
            values={priorities}
            handleSelect={this.selectPriority} />

          <DropdownButton
            displayText='SELECT A CATEGORY'
            currentValue={this.state.newIdeaCategory}
            values={categories}
            handleSelect={this.selectCategory}
            headerIconName='edit'
            headerValue='Edit Categories'
            buttonBackgroundColor={styleConstants.primary}
            pushContent />

        </InputContainer>

        <TabBar
          backgroundColor={styleConstants.white}
          color={styleConstants.primary}
          tabs={
            [
              {
                title: 'Note',
                icon: 'note',
                action: () => Actions.notes({
                  idea: {
                    title: this.state.newIdeaTitle,
                    description: this.state.newIdeaDescription,
                  } ,
                  addIdea: true,
                }),
                count: newNotesCount,
                disabled: !this.state.newIdeaTitle,
              },
              {
                title: 'Voice Note',
                icon: 'voice',
                action: null,
                count: 0,
                disabled: !this.state.newIdeaTitle,
              },
              {
                title: 'Image',
                icon: 'camera',
                action: null,
                count: 0,
                disabled: !this.state.newIdeaTitle,
                idea: {
                  title: this.state.newIdeaTitle,
                  description: this.state.newIdeaDescription,
                } 
              },
            ]
          } />

        <SnackBar />

        <Loader
          position='bottom' />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    ideas: state.main.userData.ideas,
    newNotes: state.main.appData.newNotes,
    categories: state.main.userData.categories,
    priorities: state.main.appData.priorities,
    uid: state.main.auth.uid,
    cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    currentAction: state.main.app.currentAction,
    hasNetwork: state.main.app.hasNetwork,
  });
}

export default connect(mapStateToProps)(AddIdea);