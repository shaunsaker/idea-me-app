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

import Header from '../components/Header';
import Input from '../components/Input';
import FooterButton from '../components/FooterButton';
import DeleteModal from '../components/DeleteModal';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
    this.saveUserCategories = this.saveUserCategories.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      loading: false,
      showDeleteModal: false,
      showDeleteModalTitle: null,
      showDeleteModalIndex: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array.isRequired,
      uid: React.PropTypes.string,
      errorMessage: React.PropTypes.string,
      apiSaveSuccess: React.PropTypes.bool
    };
  }

  navigateBack() {
    Actions.pop();
  }

  deleteCategory(index) {
    this.props.dispatch({
      type: 'DELETE_CATEGORY',
      index
    });
    this.toggleDeleteModal();
  }

  saveUserCategories() {
    this.setState({
      loading: true
    });

    this.props.dispatch({
      type: 'RESET_API_SAVE_SUCCESS'
    });

    this.props.dispatch({
      type: 'saveUserCategories',
      uid: this.props.uid,
      categories: this.props.categories
    });
  }

  componentDidUpdate() {
    if (this.props.errorMessage || this.props.apiSaveSuccess) {
      setTimeout(() => {
        if (this.state.loading) {
          this.setState({
            loading: false
          });
        }
      }, 1500);
    }
  }

  toggleDeleteModal(index, title) {
    if ((index || index === 0) && title) {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal,
        showDeleteModalTitle: title,
        showDeleteModalIndex: index
      });
    }
    else {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal,
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
        <TouchableOpacity style={styles.iconContainer}
          onPress={() => this.toggleDeleteModal(index, item)} >
          <Icon
            name='close'
            size={24}
            color={styleConstants.white} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const categories =
      <FlatList
        keyExtractor={item => 'category' + item}
        data={this.props.categories}
        renderItem={this.renderItem} 
        contentContainerStyle={styles.categoriesContainer} />;

    const deleteModal = this.state.showDeleteModal ?
      <DeleteModal
        text={'Are you sure you want to delete ' + this.state.showDeleteModalTitle + '?'}
        leftIconName='check'
        handleLeftIconPress={() => this.deleteCategory(this.state.showDeleteModalIndex)}
        rightIconName='close'
        handleRightIconPress={this.toggleDeleteModal} />
      :
      <View />;

    return (
      <View
        style={styles.container}>
        <Header
          backgroundColor={styleConstants.primary}
          text='Categories'
          textSize={28}
          textColor={styleConstants.white}
          textStyle={styleConstants.ranga}
          leftIconName='chevron-left'
          leftIconColor={styleConstants.white}
          leftIconSize={36}
          handleLeftIconPress={() => Actions.pop()} />
        {categories}
        <FooterButton
          iconName='add'
          handlePress={() => Actions.addCategory()} />
        {deleteModal}
      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.categories,
    uid: state.main.user.uid,
    errorMessage: state.main.user.errorMessage,
    apiSaveSuccess: state.main.user.apiSaveSuccess
  });
}

export default connect(MapStateToProps)(Categories);