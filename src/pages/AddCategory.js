import React from "react";
import {
  View,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import styles from '../styles/pages/AddCategory';
import styleConstants from '../styles/styleConstants';

import Input from '../components/Input';
import FooterButton from '../components/FooterButton';
import Growl from '../components/Growl';

export class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
    this.updateNewCategoryValue = this.updateNewCategoryValue.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }

  static get propTypes() {
    return {
      newCategoryValue: React.PropTypes.string,
      errorMessage: React.PropTypes.string
    };
  }

  navigateBack() {
    Actions.pop();
  }

  updateNewCategoryValue(text) {
    this.props.dispatch({
      type: 'UPDATE_NEW_CATEGORY_VALUE',
      value: text
    });
  }

  addNewCategory() {

    if (this.props.newCategoryValue) {
      this.props.dispatch({
        type: 'ADD_NEW_CATEGORY'
      });

      this.navigateBack();
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

  componentDidMount() {
    this.props.dispatch({
      type: 'RESET_USER_ERROR'
    });
  }

  render() {
    const errorMessage = this.props.errorMessage ?
      <Growl text={this.props.errorMessage} />
      :
      null;

    return (
      <View
        style={styles.container}>
        <StatusBar backgroundColor={styleConstants.primary} />
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
    newCategoryValue: state.main.newCategory.value,
    errorMessage: state.main.user.errorMessage
  });
}

export default connect(MapStateToProps)(AddCategory);