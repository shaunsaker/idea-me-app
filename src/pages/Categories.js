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
import Button from '../components/Button';
import ActionModal from '../components/ActionModal';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
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
      uid: React.PropTypes.string,
      errorMessage: React.PropTypes.string,
      apiSaveSuccess: React.PropTypes.bool,
      loading: React.PropTypes.bool,
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
        <TouchableOpacity style={styles.iconContainer}
          onPress={() => this.toggleActionModal(index, item)} >
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

    const ActionModal = this.state.showActionModal ?
      <ActionModal
        text={'Are you sure you want to delete ' + this.state.actionModalTitle + '?'}
        leftIconName='check'
        handleLeftIconPress={() => this.deleteCategory(this.state.actionModalIndex)}
        rightIconName='close'
        handleRightIconPress={this.toggleActionModal} />
      :
      <View />;

    const loader = this.props.loading ?
        <Loader positionStyle={{ bottom: 56}} />
        :
        null;

    const errorMessage = this.props.errorMessage ?
        <Growl text={this.props.errorMessage} />
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
        <Button
          iconName='add'
          handlePress={() => Actions.addCategory()} />
        {ActionModal}
        {loader}
        {errorMessage}
      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    ideas: state.main.userData.ideas,
    uid: state.main.userAuth.uid,
    errorMessage: state.main.userAuth.userAuthErrorMessage,
    apiSaveSuccess: state.main.api.apiSaveSuccess,
    loading: state.main.app.loading,
  });
}

export default connect(MapStateToProps)(Categories);