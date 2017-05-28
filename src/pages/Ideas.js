import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Share,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import utilities from '../utilities';

import styles from '../styles/pages/Ideas';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Logo from '../components/Logo';
import Count from '../components/Count';
import CategoriesDropdown from '../components/CategoriesDropdown';
import Card from '../components/Card';
import TabBar from '../components/TabBar';
import ActionModal from '../components/ActionModal';
import Growl from '../components/Growl';
import Loader from '../components/Loader';

export class Ideas extends React.Component {
  constructor(props) {
    super(props);

    this.selectCategory = this.selectCategory.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.shareIdea = this.shareIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.toggleActionModal = this.toggleActionModal.bind(this);

    this.state = {
      currentCategory: 'All',
      showActionModal: false,
      actionModalTitle: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array,
      ideas: React.PropTypes.array,
      uid: React.PropTypes.string,
      apiSaveSuccess: React.PropTypes.bool,
    };
  }

  selectCategory(eventId) {

    if (eventId === 200) {

      // Edit Categories
      Actions.categories();
    }
    else if (eventId === 100) {

      // All Categories
      this.setState({
        currentCategory: 'All'
      });
    }
    else {
      this.setState({
        currentCategory: this.props.categories[eventId]
      });
    }
  }

  editIdea(idea) {
    Actions.editIdea(idea);
  }

  shareIdea(idea) {
    const description = idea.description ? idea.description : '';
    
    Share.share({
      message: 'My new idea off the IdeaMe App: ' + idea.title + '. ' + description,
    }, {
        dialogTitle: 'Share Your Idea',
      })
      .then( /* Do nothing. It's obvious to the user that his message was shared. */)
      .catch((error) => console.log('Share error:', error.message));
  }

  deleteIdea(title) {
    this.toggleActionModal();

    this.props.dispatch({
      type: 'DELETE_IDEA',
      title
    });

    // this.props.dispatch({
    //   type: 'saveUserIdeas',
    //   ideas: newIdeas,
    //   uid: this.props.uid
    // });
  }

  toggleActionModal(title) {
    if (title) {
      this.setState({
        showActionModal: !this.state.showActionModal,
        actionModalTitle: title,
      });
    }
    else {
      this.setState({
        showActionModal: !this.state.showActionModal,
      });
    }
  }

  renderItem = ({ item }) => {
    return (
      <Card
        item={item}
        currentCategory={this.state.currentCategory}
        categories={this.props.categories}
        priorities={this.props.priorities}
        handleEdit={this.editIdea}
        handleShare={this.shareIdea}
        handleDelete={this.toggleActionModal} />
    );
  }

  render() {
    let counter = 0;
    let ideas = <View style={{ flex: 1 }}></View>; // empty state

    if (this.props.ideas) {
      const currentCategoryIdeas = utilities.sortIdeas(this.props.ideas, this.props.categories, this.state.currentCategory);

      // Need this for the Count component
      counter = currentCategoryIdeas.length;

      ideas =
        <FlatList
          keyExtractor={item => 'idea' + item.title}
          data={currentCategoryIdeas}
          renderItem={this.renderItem}
          style={styles.ideasContainer}
          horizontal={true}
          pagingEnabled={true} />
    }

    const actionModal = this.state.showActionModal ?
      <ActionModal
        text={'Are you sure you want to delete ' + this.state.actionModalTitle + '?'}
        leftIconName='check'
        handleLeftIconPress={() => this.deleteIdea(this.state.actionModalTitle)}
        rightIconName='close'
        handleRightIconPress={this.toggleActionModal} />
      :
      null;

    const count = () =>
      <Count
        count={counter}
        total={this.props.ideas ? this.props.ideas.length : 0}
        unit='ideas' />;

    return (
      <View style={styles.container}>

        <Header
          headerShadow={true}
          textComponent={() => <Logo />}
          textLeft={true}
          rightComponent={count} />

        <View style={styles.buttonContainer}>
          <CategoriesDropdown
            currentValue={this.state.currentCategory}
            values={this.props.categories}
            handleSelect={this.selectCategory}
            editItem={true}
            showAllOption={true}
            pushContent={false} />
        </View>

        {ideas}

        <TabBar
          currentPage='ideas' />

        {actionModal}

        <Growl />

        <Loader />

      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.userData.categories,
    priorities: state.main.appData.priorities,
    ideas: state.main.userData.ideas,
    uid: state.main.userAuth.uid,
  });
}

export default connect(MapStateToProps)(Ideas);