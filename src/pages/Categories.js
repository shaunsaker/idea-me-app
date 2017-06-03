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
import CategoriesList from '../components/CategoriesList';
import Button from '../components/Button';
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      showModal: false,
      modalTitle: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array.isRequired,
      uid: React.PropTypes.string,
    };
  }

  toggleModal(title) {
    this.setState({
      showModal: !this.state.showModal,
      modalTitle: title && title,
    });
  }

  deleteCategory(title) {
    this.toggleModal();

    const newCategories = utilities.deleteCategory(title, this.props.categories);

    this.props.dispatch({
      type: 'UPDATE_USER_CATEGORIES',
      categories: newCategories
    });

    // this.props.dispatch({
    //   type: 'saveUserCategories',
    //   categories: this.props.categories,
    //   uid: this.props.uid
    // });
  }

  render() {
    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
        handleLeftIconPress={() => this.deleteCategory(this.state.modalTitle)}
        handleRightIconPress={this.toggleModal} />
      :
      <View />;

    return (
      <Page
        backgroundColor={styleConstants.primary} >

        <Header
          text='Categories'
          textSize={28}
          textStyle={styleConstants.robotoCondensed}
          backButton
          headerShadow />

        <CategoriesList
          categories={this.props.categories}
          handleDelete={this.toggleModal} />

        <Button
          iconName='add'
          text='Add New Category'
          styleMode='primary'
          handlePress={() => Actions.addCategory()} />

        {modal}

        <Growl />

        <Loader />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    uid: state.main.auth.uid,
  });
}

export default connect(mapStateToProps)(Categories);