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
    this.addCategory = this.addCategory.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      newCategory: null,
      showDeleteModal: false,
      deleteCategoryModalTitle: null,
      deleteCategoryUID: null,
    }
  }

  static get propTypes() {
    return {
      categories: PropTypes.object,
      currentCategory: PropTypes.string,
      ideas: PropTypes.object,
      uid: PropTypes.string,
      hasNetwork: PropTypes.bool,
    };
  }

  updateNewCategory(value) {
    this.setState({
      newCategory: value
    });
  }

  addCategory() {
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
      let newCategories = utilities.cloneObject(this.props.categories);
      newCategories = utilities.pushObjectToObjectArray(newCategory, newCategories);

      // Dispatch to store
      this.props.dispatch({
        type: 'UPDATE_USER_DATA',
        node: 'categories',
        userData: newCategories,
      });

      // Dispatch to db
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
        message: 'A category with this name already exists.'
      });
    }
  }

  toggleDeleteModal(category) {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      deleteCategoryModalTitle: category && category.title, // will be null if closed
      deleteCategoryUID: category && category.uid, // will be null if closed
    });
  }

  deleteCategory() {
    let newCategories = utilities.cloneObject(this.props.categories);
    newCategories = utilities.deleteObjectFromObjectArray(this.state.deleteCategoryUID, newCategories);
    let newIdeas = utilities.cloneObject(this.props.ideas);
    newIdeas = utilities.findKeyValuePairAndSetKeysValueToNull({ category: this.state.deleteCategoryModalTitle }, newIdeas);

    // Check current category prop
    if (this.state.deleteCategoryModalTitle === this.props.currentCategory) {
      this.props.dispatch({
        type: 'SELECT_CATEGORY',
        value: 'All Categories',
      });
    }

    this.props.dispatch({
      type: 'UPDATE_USER_DATA',
      node: 'categories',
      userData: newCategories,
    });

    this.props.dispatch({
      type: 'UPDATE_USER_DATA',
      node: 'ideas',
      userData: newIdeas,
    });

    this.props.dispatch({
      type: 'deleteUserData',
      node: 'categories/' + this.state.deleteCategoryUID,
      uid: this.props.uid,
      hasNetwork: this.props.hasNetwork,
      nextAction: {
        type: 'saveUserData',
        node: 'ideas',
        uid: this.props.uid,
        userData: newIdeas,
        hasNetwork: this.props.hasNetwork,
      },
    });

    this.toggleDeleteModal();
  }

  render() {
    const categoriesArray = utilities.convertObjectArrayToArray(this.props.categories);

    const modal = this.state.showDeleteModal &&
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.deleteCategoryModalTitle + '?'}
        handleLeftIconPress={this.deleteCategory}
        handleRightIconPress={this.toggleDeleteModal} />;

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
          handleAdd={this.addCategory}
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
    hasNetwork: state.main.app.hasNetwork,
  });
}

export default connect(mapStateToProps)(Categories);