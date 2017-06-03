import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles/pages/Categories';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import Button from '../components/Button';
import DeleteButton from '../components/DeleteButton';
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      showModal: false,
      modalTitle: null,
      modalIndex: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array.isRequired,
      ideas: React.PropTypes.array.isRequired,
      uid: React.PropTypes.string,
      apiSuccess: React.PropTypes.bool,
    };
  }

  deleteCategory(index) {
    this.toggleModal();

    let newCategories = this.props.categories;
    newCategories.splice(index, 1);

    this.props.dispatch({
      type: 'UPDATE_USER_CATEGORIES',
      categories: newCategories
    });

    this.saveUserData();
  }

  saveUserData() {
    // this.props.dispatch({
    //   type: 'saveUserCategories',
    //   categories: this.props.categories,
    //   uid: this.props.uid
    // });

    // this.props.dispatch({
    //   type: 'saveUserIdeas',
    //   ideas: this.props.ideas,
    //   uid: this.props.uid
    // });
  }

  toggleModal(index, title) {
    if ((index || index === 0) && title) {
      this.setState({
        showModal: !this.state.showModal,
        modalTitle: title,
        modalIndex: index
      });
    }
    else {
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  }

  renderItem({ item, index }) {
    return (
      <View
        style={styles.categoryItem}>
        <View style={styles.categoryTextContainer}>
          <Text style={[styles.categoryText, styleConstants.robotoCondensed]}>{item}</Text>
        </View>
        <View style={styles.deleteButtonContainer}>
          <DeleteButton
            handlePress={() => this.toggleModal(index, item)} />
        </View>
      </View>
    );
  }

  render() {
    const categories =
      <FlatList
        keyExtractor={item => 'category' + item}
        data={this.props.categories}
        renderItem={this.renderItem}
        style={styles.categoriesWrapper}
        contentContainerStyle={styles.categoriesContainer} />;

    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
        handleLeftIconPress={() => this.deleteCategory(this.state.modalIndex)}
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
          leftIconName='chevron-left'
          leftIconSize={36}
          handleLeftIconPress={() => Actions.pop()} />

        {categories}

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
    ideas: state.main.userData.ideas,
    uid: state.main.user.uid,
    apiSuccess: state.main.api.apiSuccess,
  });
}

export default connect(mapStateToProps)(Categories);