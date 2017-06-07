import React from "react";
import {
  View,
  FlatList,
  Share,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Count from '../components/Count';
import DropdownButton from '../components/DropdownButton';
import IdeaCard from '../components/IdeaCard';
import TabBar from '../components/TabBar';
import ActionModal from '../components/ActionModal';
import Growl from '../components/Growl';
import Loader from '../components/Loader';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.selectCategory = this.selectCategory.bind(this);
    this.selectMenuItem = this.selectMenuItem.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.shareIdea = this.shareIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      showModal: false,
      modalTitle: null,
    }
  }

  static get propTypes() {
    return {
      ideas: React.PropTypes.array,
      currentCategory: React.PropTypes.string,
      categories: React.PropTypes.array,
      uid: React.PropTypes.string,
    };
  }

  selectCategory(value) {

    if (value === 'Edit Categories') {
      Actions.categories();
    }
    else {
      this.props.dispatch({
        type: 'SELECT_CATEGORY',
        value,
      });
    }
  }

  selectMenuItem(type, idea) {
    if (type === 'Edit') {
      this.editIdea(idea);
    }
    else if (type === 'Share') {
      this.shareIdea(idea);
    }
    else {
      this.toggleModal(idea);
    }
  }

  editIdea(idea) {
    Actions.editIdea(idea);
  }

  shareIdea(idea) {
    const description = idea.description ? idea.description : '';

    Share.share(
      {
        message: 'My new idea off the IdeaMe App: ' + idea.title + '. ' + description,
      },
      {
        dialogTitle: 'Share Your Idea',
      })
      .then( /* Do nothing. It's obvious to the user that his message was shared. */)
      .catch((error) => console.log('Share error:', error.message));
  }

  deleteIdea(idea) {
    this.toggleModal();

    this.props.dispatch({
      type: 'DELETE_IDEA',
      idea
    });

    this.saveIdeas();
  }

  toggleModal(idea) {

    if (idea) {
      this.setState({
        showModal: !this.state.showModal,
        modalTitle: idea.title,
      });
    }
    else {
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  }

  saveIdeas() {
    // this.props.dispatch({
    //   type: 'TOGGLE_LOADING'
    // });

    // this.props.dispatch({
    //   type: 'saveUserIdeas',
    //   uid: this.props.uid,
    // });
  }

  renderItem = ({ item }) => {
    return (
      <IdeaCard
        idea={item}
        currentCategory={this.props.currentCategory}
        handleSelect={this.selectMenuItem} />
    );
  }

  render() {
    let counter = 0;
    let ideas = <View style={{ flex: 1 }}></View>; // TODO: empty state

    if (this.props.ideas) {
      const currentCategoryIdeas = utilities.sortIdeas(this.props.ideas, this.props.currentCategory);

      // Need this for the Count component
      counter = currentCategoryIdeas.length;

      ideas =
        <FlatList
          keyExtractor={item => 'idea' + item.title}
          data={currentCategoryIdeas}
          renderItem={this.renderItem}
          horizontal
          pagingEnabled />
    }

    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
        handleLeftIconPress={() => this.deleteIdea(this.state.modalTitle)}
        handleRightIconPress={this.toggleModal} />
      :
      null;

    const count = () =>
      <Count
        count={counter}
        total={this.props.ideas ? this.props.ideas.length : 0}
        unit='ideas' />;

    return (
      <Page
        removeBottomPadding >

        <Header
          textComponent={() => <Logo />}
          textLeft 
          rightComponent={count} 
          headerShadow />

        <DropdownButton
          displayText={null}
          currentValue={this.props.currentCategory}
          values={this.props.categories}
          handleSelect={this.selectCategory}
          headerValue='Edit Categories'
          footerValue='All Categories' />

        {ideas}

        <TabBar
          currentPage='home' />

        {modal}

        <Growl />

        <Loader positionStyle={{ bottom: 56 }} />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    ideas: state.main.userData.ideas,
    currentCategory: state.main.appData.currentCategory,
    categories: state.main.userData.categories,
    uid: state.main.auth.uid,
  });
}

export default connect(mapStateToProps)(Home);