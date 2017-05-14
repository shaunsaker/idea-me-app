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

export class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
    this.saveUserCategories = this.saveUserCategories.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      loading: false
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

  renderItem({ item, index}) {
    return (
      <View
        style={styles.categoryItem}>
        <View style={styles.categoryTextContainer}>
          <Text style={[styles.categoryText, styleConstants.robotoCondensed]}>{item}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}
          onPress={() => this.deleteCategory(index)} >
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
        renderItem={this.renderItem}/>;

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
        <View style={styles.categoriesContainer}>
          {categories}
        </View>
        <FooterButton
          iconName='add'
          handlePress={() => Actions.addCategory()} />
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