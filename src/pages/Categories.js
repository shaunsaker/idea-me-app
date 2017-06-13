import React from "react";
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
import Button from '../components/Button';
import ActionModal from '../components/ActionModal';
import Growl from '../components/Growl';
import Loader from '../components/Loader';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      showModal: false,
      modalTitle: null,
      modalUID: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.object,
      ideas: React.PropTypes.object,
      uid: React.PropTypes.string,
      cloudDataSuccess: React.PropTypes.bool,
    };
  }

  componentDidUpdate() {
    if (this.props.cloudDataSuccess) {
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

    const newCategories = utilities.deleteObjectFromObjectArray(uid, this.props.categories);

    const targetCategory = this.props.categories[uid].title;
    const newIdeas = utilities.removeValueOnKeyValuePairFromObjectArray({'category': targetCategory}, this.props.ideas);
    console.log(newCategories);
    console.log(newIdeas);

    this.props.dispatch({
      type: 'saveUserData',
      node: 'categories',
      uid: this.props.uid,
      userData: newCategories,
    });

    this.props.dispatch({
      type: 'saveUserData',
      node: 'ideas',
      uid: this.props.uid,
      userData: newIdeas,
    });
  }

  render() {
    const categoriesArray = utilities.convertObjectArrayToArrayOfObjects(this.props.categories);

    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
        handleLeftIconPress={() => this.deleteCategory(this.state.modalUID)}
        handleRightIconPress={this.toggleDeleteModal} />
      :
      null;

    return (
      <Page>

        <Header
          text='Categories'
          textSize={28}
          textStyle={styleConstants.primaryFont}
          backButton
          headerShadow />

        <ItemList
          items={categoriesArray}
          deleteIcon
          handleIconPress={this.toggleDeleteModal} />

        <Button
          iconName='add'
          text='Add New Category'
          styleMode='primary'
          handlePress={() => Actions.addCategory()} />

        {modal}

        <Growl />

        <Loader
          position='bottom' />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    ideas: state.main.userData.ideas,
    uid: state.main.auth.uid,
    cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
  });
}

export default connect(mapStateToProps)(Categories);