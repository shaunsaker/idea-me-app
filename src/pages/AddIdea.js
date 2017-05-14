import React from "react";
import {
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import utilities from '../utilities';

import styles from '../styles/pages/AddIdea';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Dropdown from '../components/Dropdown';
import FooterButton from '../components/FooterButton';
import Growl from '../components/Growl';

export class AddIdea extends React.Component {
  constructor(props) {
    super(props);

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
    else {
      this.props.dispatch({
        type: 'USER_ERROR',
        message: 'You forgot to enter your idea'
      });
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'RESET_USER_ERROR'
    });
  }

  render() {
    const deleteIcon = this.props.newIdeaDescription && this.props.newIdeaDescription.length ?
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => this.updateNewIdeaDescription('')}>
          <MaterialIcon
            name='close'
            color={styleConstants.grey}
            size={18} />
        </TouchableOpacity>
      </View>
      :
      null;

    const errorMessage = this.props.errorMessage ?
      <Growl text={this.props.errorMessage} />
      :
      null;

    return (
      <View
        style={styles.container}>
        <Header
          backgroundColor={styleConstants.primary}
          text='Add an Idea'
          textSize={28}
          textColor={styleConstants.white}
          textStyle={styleConstants.ranga}
          rightIconName='close'
          rightIconColor={styleConstants.white}
          rightIconSize={28}
          handleRightIconPress={() => Actions.pop()} />
        <View style={styles.inputArea}>
          <Input
            placeholder="What's the big idea?"
            value={this.props.newIdeaTitle}
            handleChange={this.updateNewIdeaTitle}
            autoFocus={true} />
          <View style={styles.textAreaContainer}>
            <TextArea
              placeholder="Enter your description here..."
              value={this.props.newIdeaDescription}
              handleChange={this.updateNewIdeaDescription} />
            {deleteIcon}
          </View>
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
            pushContent={true}
            height={105} />
        </View>
        <FooterButton
          iconName='check'
          handlePress={this.addNewIdea} />
        {errorMessage}
      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.categories,
    priorities: state.main.priorities,
    newIdea: state.main.newIdea,
    newIdeaTitle: state.main.newIdea.title,
    newIdeaDescription: state.main.newIdea.description,
    newIdeaCategory: state.main.categories[state.main.newIdea.categoryId],
    newIdeaPriority: state.main.priorities[state.main.newIdea.priorityId],
    errorMessage: state.main.user.errorMessage,
    ideas: state.main.ideas,
    uid: state.main.user.uid
  });
}

export default connect(MapStateToProps)(AddIdea);