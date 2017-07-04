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
import ItemList from '../components/ItemList';
import ActionModal from '../components/ActionModal';
import TabBar from '../components/TabBar';
import SnackBar from '../components/SnackBar';
import Loader from '../components/Loader';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    // TabBar
    this.tabs = [
      {
        title: 'Home',
        icon: 'home',
        action: () => Actions.home(),
        active: false,
      },
      {
        title: 'Categories',
        icon: 'folder',
        action: () => Actions.categories(),
        active: true,
      },
      {
        title: 'Profile',
        icon: 'person',
        action: () => Actions.profile(),
        active: false,
      },
    ];

    this.state = {
      showModal: false,
      modalTitle: null,
      modalUID: null,
    }
  }

  static get propTypes() {
    return {
      categories: PropTypes.object,
      ideas: PropTypes.object,
      uid: PropTypes.string,
      cloudDataSuccess: PropTypes.bool,
      currentAction: PropTypes.string,
      hasNetwork: PropTypes.bool,
    };
  }

  componentDidUpdate() {
    if (this.props.currentAction === 'deleteCategory' && this.props.cloudDataSuccess) {
      this.props.dispatch({
        type: 'RESET_CLOUD_DATA_SUCCESS',
      });
    }
  }

  toggleDeleteModal(category) {
    if (category && category.title) {
      this.setState({
        showModal: true,
        modalTitle: category.title,
        modalUID: category.uid,
      });
    }
    else {
      this.setState({
        showModal: false,
        modalTitle: null,
        modalUID: null,
      });
    }
  }

  deleteCategory(uid) {
    this.toggleDeleteModal();

    this.props.dispatch({
      type: 'TOGGLE_LOADING'
    });

    const targetCategory = this.props.categories[uid].title;
    const newCategories = utilities.deleteObjectFromObjectArray(uid, this.props.categories);
    const newIdeas = this.props.ideas && utilities.findKeyValuePairAndSetKeysValueToNull({'category': targetCategory}, this.props.ideas);

    let nextActions = [
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

    if (targetCategory === this.props.currentCategory) {
      nextActions.push({
        type: 'SELECT_CATEGORY',
        value: 'All Categories',
      });
    }

    this.props.dispatch({
      type: 'deleteUserData',
      node: 'categories/' + uid,
      uid: this.props.uid,
      hasNetwork: this.props.hasNetwork,
      nextAction: nextActions,
    });
  }

  render() {
    const categoriesArray = utilities.convertObjectArrayToArray(this.props.categories);

    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
        handleLeftIconPress={() => this.deleteCategory(this.state.modalUID)}
        handleRightIconPress={this.toggleDeleteModal} />
      :
      null;

    return (
      <Page
        backgroundColor={styleConstants.white}
        removeBottomPadding >

        <Header
          text='Categories'
          addButton
          handleRightIconPress={() => Actions.addCategory()}
          headerShadow />

        <ItemList
          items={categoriesArray}
          deleteIcon
          handleIconPress={this.toggleDeleteModal} />

        <TabBar
          tabs={this.tabs} />

        {modal}

        <SnackBar />

        <Loader
          position='bottom' />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    currentCategory: state.main.appData.currentCategory,
    ideas: state.main.userData.ideas,
    profile: state.main.userData.profile,
    uid: state.main.auth.uid,
    cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    currentAction: state.main.app.currentAction,
    hasNetwork: state.main.app.hasNetwork,
  });
}

export default connect(mapStateToProps)(Categories);