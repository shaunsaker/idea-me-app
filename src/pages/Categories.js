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
    this.toggleActionModal = this.toggleActionModal.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      showActionModal: false,
      actionModalTitle: null,
      actionModalIndex: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array.isRequired,
      ideas: React.PropTypes.array.isRequired,
      uid: React.PropTypes.string,
      apiSaveSuccess: React.PropTypes.bool,
    };
  }

  deleteCategory(index) {
    this.toggleActionModal();

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

    this.saveUserData();
  }
  
  saveUserData() {
    this.props.dispatch({
      type: 'saveUserCategories',
      categories: this.props.categories,
      uid: this.props.uid
    });

    this.props.dispatch({
      type: 'saveUserIdeas',
      ideas: this.props.ideas,
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

  toggleActionModal(index, title) {
    if ((index || index === 0) && title) {
      this.setState({
        showActionModal: !this.state.showActionModal,
        actionModalTitle: title,
        actionModalIndex: index
      });
    }
    else {
      this.setState({
        showActionModal: !this.state.showActionModal,
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
            handlePress={() => this.toggleActionModal(index, item)} />
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

    const actionModal = this.state.showActionModal ?
      <ActionModal
        text={'Are you sure you want to delete ' + this.state.actionModalTitle + '?'}
        handleLeftIconPress={() => this.deleteCategory(this.state.actionModalIndex)}
        handleRightIconPress={this.toggleActionModal} />
      :
      <View />;

    return (
      <View
        style={styles.container}>

        <Header
          text='Categories'
          textSize={28}
          textStyle={styleConstants.robotoCondensed}
          leftIconName='chevron-left'
          leftIconSize={36}
          handleLeftIconPress={() => Actions.pop()} />

        {categories}

        <View style={styles.buttonContainer}>
          <Button
            iconName='add'
            text='Add Category'
            styleMode='primary'
            handlePress={() => Actions.addCategory()} />
        </View>

        {actionModal}

        <Growl />

        <Loader />

      </View >
    );
  }
}

function mapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    ideas: state.main.userData.ideas,
    uid: state.main.userAuth.uid,
    apiSaveSuccess: state.main.api.apiSaveSuccess,
  });
}

export default connect(mapStateToProps)(Categories);