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
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
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

  updateNewCategoryValue(text) {
    this.props.dispatch({
      type: 'UPDATE_NEW_CATEGORY_VALUE',
      value: text
    });
  }

  addNewCategory() {
    let categories = this.props.categories;
    const newCategory = utilities.firstCharToUppercase(this.props.newCategoryValue.trim());
    const categoryPresent = utilities.isCategoryAlreadyPresent(newCategory, categories);

    if (!categoryPresent) {
      if (categories) {
        categories.push(newCategory);
      }
      else {
        categories = [newCategory];
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
    }
  }

  render() {
    const enableContinueButton = this.props.newCategoryValue;

    return (
      <View
        style={styles.container}>

        <Header
          text='Add a Category'
          headerShadow={false}
          rightIconName='close'
          rightIconSize={28}
          handleRightIconPress={() => Actions.pop()} />

        <View style={styles.inputContainer}>
          <InputContainer>
            <Input
              placeholder="CATEGORY NAME"
              value={this.props.newCategoryValue}
              handleChange={this.updateNewCategoryValue}
              autoFocus={true} />
          </InputContainer>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            iconName='check'
            text='Continue'
            styleMode='primaryReversed'
            handlePress={this.addNewCategory}
            disabled={!enableContinueButton} />
        </View>

        <Growl />

      </View >
    );
  }
}

function mapStateToProps(state) {
  return ({
    newCategoryValue: state.main.userData.newCategory.value,
    categories: state.main.userData.categories,
    uid: state.main.userAuth.uid,
  });
}

export default connect(mapStateToProps)(AddCategory);