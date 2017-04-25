import React from "react";
import {
  View
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import styles from '../styles/pages/AddIdea';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Dropdown from '../components/Dropdown';
import FooterButton from '../components/FooterButton';
import ErrorMessage from '../components/ErrorMessage';

export class AddIdea extends React.Component {
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
    this.updateNewIdeaTitle = this.updateNewIdeaTitle.bind(this);
    this.updateNewIdeaDescription = this.updateNewIdeaDescription.bind(this);
    this.navigateCategories = this.navigateCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPriority = this.selectPriority.bind(this);
    this.addNewIdea = this.addNewIdea.bind(this);
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array.isRequired,
      priorities: React.PropTypes.array.isRequired,
      newIdeaTitle: React.PropTypes.string,
      newIdeaDescription: React.PropTypes.string,
      newIdeaCategory: React.PropTypes.string,
      newIdeaPriority: React.PropTypes.string,
      errorMessage: React.PropTypes.string
    };
  }

  navigateBack() {
    Actions.pop();
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

  navigateCategories() {
    Actions.categories();
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
      this.navigateCategories();
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

      // TODO: First we will save this data here, display loading then do the below when apiSaveSuccess received

      this.props.dispatch({
        type: 'ADD_NEW_IDEA'
      });

      Actions.ideas();
    }
    else {
      this.props.dispatch({
        type: 'USER_ERROR',
        message: 'You forgot to enter your idea'
      });
      setTimeout(() => {
        this.props.dispatch({
          type: 'RESET_USER_ERROR'
        });
      }, 2500);
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'RESET_USER_ERROR'
    });
  }

  render() {
    const errorMessage = this.props.errorMessage ?
      <ErrorMessage text={this.props.errorMessage} />
      :
      null;

    return (
      <View style={{ height: '100%' }}>
        <View
          style={styles.container}>
          <Header
            handlePress={this.navigateBack} />
          <View style={styles.inputArea}>
            <Input
              placeholder="What's the big idea?"
              value={this.props.newIdeaTitle}
              handleChange={this.updateNewIdeaTitle} />
            <TextArea 
              placeholder="Enter your description here..."
              value={this.props.newIdeaDescription}
              handleChange={this.updateNewIdeaDescription} />
            <Dropdown
              displayText='Select a Category'
              value={this.props.newIdeaCategory ? this.props.newIdeaCategory : null}
              handleSelect={this.selectCategory}
              values={this.props.categories} 
              editItem={true} 
              pushContent={true} />
            <Dropdown
              displayText='Select a Priority'
              value={this.props.newIdeaPriority ? this.props.newIdeaPriority : null}
              handleSelect={this.selectPriority}
              values={this.props.priorities} 
              pushContent={true} />
          </View>
          <FooterButton
            text='ADD IDEA'
            handlePress={this.addNewIdea} />
        </View >
        {errorMessage}
      </View>
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.categories,
    priorities: state.main.priorities,
    newIdeaTitle: state.main.newIdea.title,
    newIdeaDescription: state.main.newIdea.description,
    newIdeaCategory: state.main.categories[state.main.newIdea.categoryId],
    newIdeaPriority: state.main.priorities[state.main.newIdea.priorityId],
    errorMessage: state.main.user.errorMessage
  });
}

export default connect(MapStateToProps)(AddIdea);