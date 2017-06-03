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
      categories: React.PropTypes.array,
      uid: React.PropTypes.string,
    };
  }

  updateNewCategory(value) {
    this.setState({
      newCategory: value
    });
  }

  addNewCategory() {
    const newCategories = utilities.addCategory(this.state.newCategory, this.props.categories);

    if (newCategories) {
      this.props.dispatch({
        type: 'UPDATE_USER_CATEGORIES',
        categories: newCategories,
      });

      // this.props.dispatch({
      //   type: 'saveUserCategories',
      //   categories,
      //   uid: this.props.uid
      // });

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
    const enableContinueButton = this.state.newCategory;

    return (
      <Page
        backgroundColor={styleConstants.primary}>

        <Header
          text='Add a Category'
          rightIconName='close'
          rightIconSize={28}
          handleRightIconPress={() => Actions.pop()}
          headerShadow />

        <InputContainer>
          <Input
            placeholder="CATEGORY NAME"
            value={this.state.newCategory}
            handleChange={this.updateNewCategory}
            autoFocus={true} />
        </InputContainer>

        <Button
          iconName='check'
          text='Continue'
          styleMode='primaryReversed'
          handlePress={this.addNewCategory}
          disabled={!enableContinueButton} />

        <Growl />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    uid: state.main.user.uid,
  });
}

export default connect(mapStateToProps)(AddCategory);