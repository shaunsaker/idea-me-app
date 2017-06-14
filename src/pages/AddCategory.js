import React from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import Growl from '../components/Growl';
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
      categories: React.PropTypes.object,
      uid: React.PropTypes.string,
      cloudDataSuccess: React.PropTypes.bool,
    };
  }

  componentDidUpdate() {
    if (this.props.cloudDataSuccess) {
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
    const enableContinueButton = this.state.newCategory;

    return (
      <Page>

        <Header
          text='Add a Category'
          closeButton
          headerShadow />

        <InputContainer>
          <Input
            placeholder="CATEGORY NAME"
            value={this.state.newCategory}
            handleChange={this.updateNewCategory}
            autoFocus />
        </InputContainer>

        <Button
          iconName='check'
          text='Continue'
          handlePress={this.addNewCategory}
          disabled={!enableContinueButton} 
          backgroundColor={styleConstants.white}/>

        <Growl />

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
  });
}

export default connect(mapStateToProps)(AddCategory);