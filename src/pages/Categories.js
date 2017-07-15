import React from "react";
import PropTypes from 'prop-types';
import {
  View,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import ActionModal from '../components/ActionModal';
import SnackBar from '../components/SnackBar';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.updateNewCategory = this.updateNewCategory.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      newCategory: null,
      showModal: false,
      deleteCategory: null,
    }
  }

  static get propTypes() {
    return {
      categories: PropTypes.object,
      currentCategory: PropTypes.string,
      ideas: PropTypes.object,
      uid: PropTypes.string,
      cloudDataSuccess: PropTypes.bool,
      currentAction: PropTypes.string,
      hasNetwork: PropTypes.bool,
    };
  }

  updateNewCategory(value) {
    this.setState({
      newCategory: value
    });
  }

  addNewCategory() {
    const newCategory = {
      title: utilities.prettifyString(this.state.newCategory),
      uid: utilities.createUID(),
    };
    let isCategoryPresent;

    // if we have categories
    if (this.props.categories) {

      // check if the category title is already present
      isCategoryPresent = utilities.isKeyValuePairPresentInObjectArray({ title: newCategory.title }, this.props.categories);
    }

    if (!isCategoryPresent) {
      const newCategories = utilities.pushObjectToObjectArray(newCategory, this.props.categories);

      this.props.dispatch({
        type: 'saveUserData',
        node: 'categories',
        userData: newCategories,
        uid: this.props.uid,
        hasNetwork: this.props.hasNetwork,
      });

      this.updateNewCategory('');
    }
    else {
      this.props.dispatch({
        type: 'USER_ERROR',
        message: 'A category with this name already exists'
      });
    }
  }

  toggleDeleteModal(category) {

    if (category && category.title) {
      this.setState({
        showModal: true,
        deleteCategory: category,
      });
    }
    else {
      this.setState({
        showModal: false,
        deleteCategory: null,
      });
    }
  }

  deleteCategory(category) {
    const newCategories = utilities.deleteObjectFromObjectArray(category.uid, this.props.categories)
    const newIdeas = utilities.findKeyValuePairAndSetKeysValueToNull({ category: category.title }, this.props.ideas);
    const nextActions = [
      {
        type: 'UPDATE_USER_DATA',
        node: 'categories',
        userData: newCategories,
      },
      {
        type: 'saveUserData',
        node: 'ideas',
        uid: this.props.uid,
        userData: newIdeas,
        currentAction: 'deleteCategory',
        hasNetwork: this.props.hasNetwork,
      }
    ];

    // Check current category prop
    if (category.title === this.props.currentCategory) {
      nextActions.push({
        type: 'SELECT_CATEGORY',
        value: 'All Categories',
      });
    }

    // Save as bulk action (delete, props, save)
    this.props.dispatch({
      type: 'deleteUserData',
      node: 'categories/' + category.uid,
      uid: this.props.uid,
      hasNetwork: this.props.hasNetwork,
      nextAction: nextActions,
    });

    this.toggleDeleteModal();
  }

  render() {
    const categoriesArray = utilities.convertObjectArrayToArray(this.props.categories);

    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.deleteCategory.title + '?'}
        handleLeftIconPress={() => this.deleteCategory(this.state.deleteCategory)}
        handleRightIconPress={this.toggleDeleteModal} />
      :
      null;

    return (
      <Page
        backgroundColor={styleConstants.white}
        removeBottomPadding >

        <Header
          text='Categories'
          backButton
          headerShadow />

        <NoteCard
          type='categories'
          categories={categoriesArray}
          hideTitle
          inputValue={this.state.newCategory}
          handleChangeText={this.updateNewCategory}
          handleAdd={this.addNewCategory}
          handleDelete={this.toggleDeleteModal} />

        {modal}

        <SnackBar />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    currentCategory: state.main.appData.currentCategory,
    ideas: state.main.userData.ideas,
    uid: state.main.auth.uid,
    cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    currentAction: state.main.app.currentAction,
    hasNetwork: state.main.app.hasNetwork,
  });
}

export default connect(mapStateToProps)(Categories);