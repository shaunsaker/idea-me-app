import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import SnackBar from '../components/SnackBar';
import Loader from '../components/Loader';

export class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategory: null,
    }

    this.updateNewCategory = this.updateNewCategory.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }

  static get propTypes() {
    return {
      categories: PropTypes.object,
      uid: PropTypes.string,
      cloudDataSuccess: PropTypes.bool,
      currentAction: PropTypes.string,
      hasNetwork: PropTypes.bool,
    };
  }

  componentDidUpdate() {
    if (this.props.currentAction === 'addCategory' && this.props.cloudDataSuccess) {
      this.props.dispatch({
        type: 'RESET_CLOUD_DATA_SUCCESS',
      });

      Actions.pop();
    }
  }

  updateNewCategory(value) {
    this.setState({
      newCategory: value
    });
  }

  addNewCategory() {
    const newCategory = {
      title: utilities.prettifyString(this.state.newCategory),
      uid: utilities.createUID(),
    };
    let isCategoryPresent;

    // if we have categories
    if (this.props.categories) {

      // check if the category title is already present
      isCategoryPresent = utilities.isKeyValuePairPresentInObjectArray({title: newCategory.title}, this.props.categories);
    }

    if (!isCategoryPresent) {
      this.props.dispatch({
        type: 'TOGGLE_LOADING'
      });
      
      const newCategories = utilities.pushObjectToObjectArray(newCategory, this.props.categories);

      this.props.dispatch({
        type: 'saveUserData',
        node: 'categories',
        uid: this.props.uid,
        userData: newCategories,
        currentAction: 'addCategory',
        hasNetwork: this.props.hasNetwork,
      });
    }
    else {
      this.props.dispatch({
        type: 'USER_ERROR',
        message: 'A category with this name already exists'
      });
    }
  }

  render() {
    const enableContinueButton = this.state.newCategory ? true : false;

    return (
      <Page>

        <Header
          text='Add a Category'
          closeButton
          continueButton={enableContinueButton}
          handleRightIconPress={this.addNewCategory}
          headerShadow />

        <InputContainer
          verticalCenter>
          <Input
            placeholder="CATEGORY NAME"
            value={this.state.newCategory}
            handleChange={this.updateNewCategory}
            maxLength={16}
            autoFocus />
        </InputContainer>

        <SnackBar />

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
    cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
    currentAction: state.main.app.currentAction,
    hasNetwork: state.main.app.hasNetwork,
  });
}

export default connect(mapStateToProps)(AddCategory);