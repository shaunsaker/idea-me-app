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
import Loader from '../components/Loader';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
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

  deleteCategory(index) {
    this.toggleDeleteModal();

    let newCategories = this.props.categories;
    newCategories.splice(index, 1);

    // set all matching categoryIds to null
    // all categoryIds above index should be decreased by 1
    let newIdeas = this.props.ideas;

    newIdeas.map((value) => {
        if (value.categoryId === index) {
            value.categoryId = null;
        }
        else if (value.categoryId > index) {
            value.categoryId--;
        }
    });

    this.props.dispatch({
      type: 'UPDATE_USER_CATEGORIES',
      categories: newCategories
    });

    this.props.dispatch({
      type: 'UPDATE_USER_IDEAS',
      ideas: newIdeas
    });

    this.props.dispatch({
      type: 'saveUserCategories',
      categories: newCategories,
      uid: this.props.uid
    });

    this.props.dispatch({
      type: 'saveUserIdeas',
      ideas: newIdeas,
      uid: this.props.uid
    });
  }

  componentDidUpdate() {
    if (this.props.errorMessage || this.props.apiSaveSuccess) {
      this.props.dispatch({
        type: 'SET_LOADING_FALSE'
      });
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

    const loader = this.props.loading ?
      <Loader />
      :
      null;

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
        {loader}
      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.categories,
    ideas: state.main.ideas,
    uid: state.main.user.uid,
    errorMessage: state.main.user.errorMessage,
    apiSaveSuccess: state.main.user.apiSaveSuccess,
    loading: state.main.app.loading,
  });
}

export default connect(MapStateToProps)(Categories);