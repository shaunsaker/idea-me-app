import React from "react";
import PropTypes from 'prop-types';
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
import DropdownButton from '../components/DropdownButton';
import IdeaCard from '../components/IdeaCard';
import TabBar from '../components/TabBar';
import ActionModal from '../components/ActionModal';
import SnackBar from '../components/SnackBar';
import Loader from '../components/Loader';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.selectCategory = this.selectCategory.bind(this);
    this.scrollToBeginning = this.scrollToBeginning.bind(this);
    this.handleMenuItemSelect = this.handleMenuItemSelect.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.shareIdea = this.shareIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.handleNotePress = this.handleNotePress.bind(this);

    // TabBar
    this.tabs = [
      {
        title: 'Home',
        icon: 'home',
        action: () => Actions.home(),
        active: true,
      },
      {
        title: 'Profile',
        icon: 'person',
        action: () => Actions.profile(),
        active: false,
      },
    ];

    this.state = {
      showDeleteModal: false,
      deleteModalTitle: null,
      deleteModalUID: null,
    }
  }

  static get propTypes() {
    return {
      ideas: PropTypes.object,
      categories: PropTypes.object,
      currentCategory: PropTypes.string,
      uid: PropTypes.string,
      cloudDataSuccess: PropTypes.bool,
      currentAction: PropTypes.string,
      hasNetwork: PropTypes.bool,
    };
  }

  componentDidUpdate() {
    if (this.props.currentAction === 'deleteIdea' && this.props.cloudDataSuccess) {
      this.props.dispatch({
        type: 'RESET_CLOUD_DATA_SUCCESS',
      });
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

      this.scrollToBeginning();
    }
  }

  scrollToBeginning() {
    this.refs.ideasList.scrollToOffset({ x: 0, y: 0, animated: false });
  }

  handleMenuItemSelect(type, idea) {
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
        showDeleteModal: true,
        deleteModalTitle: idea.title,
        deleteModalUID: idea.uid,
      });
    }
    else {
      this.setState({
        showDeleteModal: false,
        deleteModalTitle: null,
        deleteModalUID: null,
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
      currentAction: 'deleteIdea',
      hasNetwork: this.props.hasNetwork,
    });
  }

  handleNotePress(noteType, idea) {
    if (noteType === 'Note') {
      Actions.notes({
        idea,
      });
    }
    else if (noteType === 'Photo') {
      Actions.photos({
        idea,
      });
    }
    else if (noteType === 'Voice Note') {
      Actions.voiceNotes({
        idea,
      });
    }
  }

  renderItem = ({ item }) => {
    return (
      <IdeaCard
        idea={item}
        handleMenuItemSelect={this.handleMenuItemSelect}
        handleNotePress={(noteType) => this.handleNotePress(noteType, item)} />
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
      const sortedIdeasArray = utilities.convertObjectArrayToArray(sortedIdeas);

      ideas =
        <FlatList
          ref='ideasList'
          keyExtractor={item => 'idea' + item.title}
          data={sortedIdeasArray}
          renderItem={this.renderItem}
          horizontal
          pagingEnabled />
    }

    const categories = utilities.convertObjectArrayToArray(this.props.categories);

    const deleteModal = this.state.showDeleteModal ?
      <ActionModal
        title='Are you sure you want to delete this idea?'
        subtitle={this.state.deleteModalTitle}
        handleLeftIconPress={() => this.deleteIdea(this.state.deleteModalUID)}
        handleRightIconPress={this.toggleDeleteModal} />
      :
      null;

    return (
      <Page
        backgroundColor={styleConstants.white}
        removeBottomPadding >

        <Header
          headerShadow
          leftComponent={() => <Logo />}
          addButton
          handleRightIconPress={() => Actions.addIdea()} />

        <DropdownButton
          buttonBackgroundColor={styleConstants.primary}
          categoriesButton
          values={categories}
          currentCategory={this.props.currentCategory}
          handleSelect={this.selectCategory}
          headerValue={this.props.currentCategory !== 'All Categories' ? 'All Categories' : ''}
          currentCount={currentCount}
          totalCount={totalCount} />

        {ideas}

        <TabBar
          tabs={this.tabs} />

        {deleteModal}

        <SnackBar />

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
    currentAction: state.main.app.currentAction,
    hasNetwork: state.main.app.hasNetwork,
  });
}

export default connect(mapStateToProps)(Home);