import React from "react";
import {
  View,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';

import styles from '../styles/pages/AddCategory';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Input from '../components/Input';
import FooterButton from '../components/FooterButton';
import Growl from '../components/Growl';

export class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.updateNewCategoryValue = this.updateNewCategoryValue.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }

  static get propTypes() {
    return {
      newCategoryValue: React.PropTypes.string,
      errorMessage: React.PropTypes.string,
      categories: React.PropTypes.array,
      uid: React.PropTypes.string,
    };
  }

  componentDidMount() {
    if (this.props.errorMessage) {
      this.props.dispatch({
        type: 'RESET_USER_ERROR'
      });
    }
  }

  updateNewCategoryValue(text) {
    this.props.dispatch({
      type: 'UPDATE_NEW_CATEGORY_VALUE',
      value: text
    });
  }

  addNewCategory() {
    if (this.props.newCategoryValue) {
      let categories = this.props.categories;
      const newCategory = utilities.firstCharToUppercase(this.props.newCategoryValue.trim());
      let categoryPresent = false;

      // Check if this category exists already
      categories.map((value) => {
        if (value === newCategory) {
          categoryPresent = true;
        }
      });

      if (!categoryPresent) {
        if (categories) {
          categories.push(newCategory);
        }
        else {
          categories = [this.props.newCategoryValue.trim()];
        }

        this.props.dispatch({
          type: 'UPDATE_USER_CATEGORIES',
          categories
        });

        this.props.dispatch({
          type: 'saveUserCategories',
          categories,
          uid: this.props.uid
        });

        Actions.pop();
      }
      else {
        this.props.dispatch({
          type: 'USER_ERROR',
          message: 'This category already exists'
        });

        setTimeout(() => {
          this.props.dispatch({
            type: 'RESET_USER_ERROR'
          });
        }, 2500);
      }
    }
    else {
      this.props.dispatch({
        type: 'USER_ERROR',
        message: 'You forgot to enter a category'
      });

      setTimeout(() => {
        this.props.dispatch({
          type: 'RESET_USER_ERROR'
        });
      }, 2500);
    }
  }

  render() {
    console.log('Error message', this.props.errorMessage);
    const errorMessage = this.props.errorMessage ?
      <Growl text={this.props.errorMessage} />
      :
      null;

    return (
      <View
        style={styles.container}>
        <Header
          backgroundColor={styleConstants.primary}
          text='Add a Category'
          textSize={28}
          textColor={styleConstants.white}
          textStyle={styleConstants.ranga}
          rightIconName='close'
          rightIconColor={styleConstants.white}
          rightIconSize={28}
          handleRightIconPress={() => Actions.pop()} />
        <View style={styles.inputArea}>
          <Input
            placeholder="Enter new category..."
            value={this.props.newCategoryValue}
            handleChange={this.updateNewCategoryValue}
            autoFocus={true} />
        </View>
        <FooterButton
          iconName='check'
          handlePress={this.addNewCategory} />
        {errorMessage}
      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    newCategoryValue: state.main.userData.newCategory.value,
    errorMessage: state.main.userAuth.userAuthErrorMessage,
    categories: state.main.userData.categories,
    uid: state.main.userAuth.uid,
  });
}

export default connect(MapStateToProps)(AddCategory);