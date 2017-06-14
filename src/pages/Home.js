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
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);

    this.state = {
      showModal: false,
      modalTitle: null,
      modalUID: null,
    }
  }

  static get propTypes() {
    return {
      ideas: React.PropTypes.object,
      categories: React.PropTypes.object,
      currentCategory: React.PropTypes.string,
      uid: React.PropTypes.string,
      cloudDataSuccess: React.PropTypes.bool,
    };
  }
  
  componentDidUpdate() {
    if (this.props.cloudDataSuccess) {

      this.props.dispatch({
        type: 'RESET_CLOUD_DATA_SUCCESS',
      });

      // Scroll to beginning
      this.refs.ideasList.scrollToOffset({x: 0, y: 0, animated: false});

      // BUG: AddIdea does not pop without this
      Actions.pop(); 
    }
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
      this.toggleDeleteModal(idea);
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

  toggleDeleteModal(idea) {  
    if (idea && idea.title) {
      this.setState({
        showModal: true,
        modalTitle: idea.title,
        modalUID: idea.uid,
      });
    }
    else {
      this.setState({
        showModal: false,
        modalTitle: null,
        modalUID: null,
      });
    }
  }

  deleteIdea(uid) {
    this.props.dispatch({
      type: 'TOGGLE_LOADING'
    });

    this.toggleDeleteModal();

    const newIdeas = utilities.deleteObjectFromObjectArray(uid, this.props.ideas);

    this.props.dispatch({
      type: 'saveUserData',
      node: 'ideas',
      uid: this.props.uid,
      userData: newIdeas,
    });
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
    let currentCount = 0;
    const totalCount = utilities.getLengthOfObject(this.props.ideas);

    let ideas = <View style={{ flex: 1 }}></View>; // TODO: empty state
    let currentCategoryIdeas;

    if (this.props.ideas) {
      if (this.props.currentCategory === 'All Categories') {
        currentCategoryIdeas = this.props.ideas;
      }
      else {
        currentCategoryIdeas = utilities.filterObjectArrayByKeyValuePair({ category: this.props.currentCategory }, this.props.ideas);
      }

      const sortedIdeas = utilities.sortObjectArrayByKeyAndValues(currentCategoryIdeas, 'priority', ['High', 'Medium', 'Low', null]);
      currentCount = utilities.getLengthOfObject(sortedIdeas);
      const sortedIdeasArray = utilities.convertObjectArrayToArrayOfObjects(sortedIdeas);

      ideas =
        <FlatList
          ref='ideasList'
          keyExtractor={item => 'idea' + item.title}
          data={sortedIdeasArray}
          renderItem={this.renderItem}
          horizontal
          pagingEnabled />
    }

   const categories = utilities.convertObjectArrayToArrayOfObjects(this.props.categories);

    const modal = this.state.showModal ?
      <ActionModal
        title={'Are you sure you want to delete ' + this.state.modalTitle + '?'}
        handleLeftIconPress={() => this.deleteIdea(this.state.modalUID)}
        handleRightIconPress={this.toggleDeleteModal} />
      :
      null;

    const count = () =>
      <Count
        count={currentCount}
        total={totalCount}
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
          values={categories}
          handleSelect={this.selectCategory}
          headerValue='Edit Categories'
          footerValue='All Categories' 
          buttonBackgroundColor={styleConstants.primary} />

        {ideas}

        <TabBar
          currentPage='home' />

        {modal}

        <Growl />

        <Loader />

      </Page >
    );
  }
}

function mapStateToProps(state) {
  return ({
    ideas: state.main.userData.ideas,
    categories: state.main.userData.categories,
    currentCategory: state.main.appData.currentCategory,
    uid: state.main.auth.uid,
    cloudDataSuccess: state.main.cloudData.cloudDataSuccess,
  });
}

export default connect(mapStateToProps)(Home);