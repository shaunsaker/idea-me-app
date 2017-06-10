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
          items={this.props.categories}
          deleteIcon
          handleIconPress={this.toggleModal} />

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
    uid: state.main.auth.uid,
  });
}

export default connect(mapStateToProps)(Categories);