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

import styles from '../styles/pages/Ideas';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Count from '../components/Count';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import DeleteModal from '../components/DeleteModal';
import Loader from '../components/Loader';
import Growl from '../components/Growl';

export class Ideas extends React.Component {
  constructor(props) {
    super(props);

    this.selectCategory = this.selectCategory.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.shareIdea = this.shareIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.signOut = this.signOut.bind(this);

    this.state = {
      currentCategory: 'All',
      showDeleteModal: false,
      showDeleteModalTitle: null,
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array,
      ideas: React.PropTypes.array,
      uid: React.PropTypes.string.isRequired,
      errorMessage: React.PropTypes.string,
      apiSaveSuccess: React.PropTypes.bool,
      loading: React.PropTypes.bool,
    };
  }

  componentWillMount() {
    this.props.dispatch({
        type: 'SET_LOADING_FALSE'
    });
  }

  componentDidUpdate() {
    if (this.props.errorMessage || this.props.apiSaveSuccess) {
      this.props.dispatch({
        type: 'SET_LOADING_FALSE'
      });
    }
  }

  selectCategory(eventId) {

    // 100 is reserved for 'All' categories, 200 is reserved as the categories button
    if (eventId !== 200) {
      if (eventId !== 100) {
        this.setState({
          currentCategory: this.props.categories[eventId]
        });
      }
      else {
        this.setState({
          currentCategory: 'All'
        });
      }
    }
    else {
      Actions.categories();
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
    .then( /* Do nothing */)
    .catch((error) => console.log('Share error:', error.message));
  }

  deleteIdea(title) { 
    this.toggleDeleteModal();

    let id;
    this.props.ideas.map((value, index) => {
        if (value.title === title) {
            id = index;
        }
    });
    let newIdeas = this.props.ideas;
    newIdeas.splice(id, 1);

    this.props.dispatch({
      type: 'UPDATE_USER_IDEAS',
      ideas: newIdeas
    });

    this.props.dispatch({
      type: 'saveUserIdeas',
      ideas: newIdeas,
      uid: this.props.uid
    });
  }

  toggleDeleteModal(title) {
    if (title) {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal,
        showDeleteModalTitle: title,
      });
    }
    else {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal,
      });
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.ideaItem} >
        <View style={styles.textContainer}>
          <Text style={[styles.ideaTextTitle, styleConstants.ranga]}>
            {item.title}
          </Text>
          <Text style={[styles.ideaTextDescription, styleConstants.robotoCondensed]}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteIconContainer}
          onPress={() => this.toggleDeleteModal(item.title)} >
          <MaterialIcon
            name='close'
            color={styleConstants.grey}
            size={24}
            style={styles.icon} />
        </TouchableOpacity>
        <View
          style={styles.labelsContainer} >
          {
            this.state.currentCategory === 'All' && (item.categoryId === 0 || item.categoryId) ?
              <View style={styles.categoryChip}><Text style={[styles.text, styleConstants.robotoCondensed]}>{this.props.categories[item.categoryId]}</Text></View>
              :
              <View></View>
          }
          {
            item.priorityId === 0 || item.priorityId ?
              <View style={styles.priorityChip}><Text style={[styles.text, styleConstants.robotoCondensed]}>{this.props.priorities[item.priorityId] + ' Priority'}</Text></View>
              :
              <View></View>
          }
        </View>
        <View style={styles.ButtonsContainer}>
          <TouchableOpacity
            style={styles.shareIconContainer}
            onPress={() => this.shareIdea({ ...item})} >
            <MaterialIcon
              name='share'
              color={styleConstants.white}
              size={24}
              style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() => this.editIdea({ ...item})} >
            <Icon
              name='pencil'
              color={styleConstants.white}
              size={24}
              style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  signOut() {
    this.props.dispatch({
      type: 'signOutUser'
    });

    Actions.welcome();
  }

  render() {
    let counter = 0;
    let ideas = <View style={{ flex: 1 }}></View>;

    if (this.props.ideas) {

      // Prioritise our ideas in order of variables below
      let noPriority = [];
      let highPriority = [];
      let mediumPriority = [];
      let lowPriority = [];
      let allIdeas = [];

      this.props.ideas.map((value) => {
        if (value.priorityId === 0) {
          highPriority.push(value);
        }
        else if (value.priorityId === 1) {
          mediumPriority.push(value);
        }
        else if (value.priorityId === 2) {
          lowPriority.push(value);
        }
        else {
          noPriority.push(value);
        }
      });

      noPriority.map((value) => {
        allIdeas.push(value);
      });

      highPriority.map((value) => {
        allIdeas.push(value);
      });

      mediumPriority.map((value) => {
        allIdeas.push(value);
      });

      lowPriority.map((value) => {
        allIdeas.push(value);
      });

      // First filter all ideas to return the ideas that match this.state.category (and increment counter)
      let currentCategoryIdeas = [];

      allIdeas.map((value, index) => {
        if (this.state.currentCategory === 'All' || this.props.categories[value.categoryId] === this.state.currentCategory) {
          counter++;
          currentCategoryIdeas.push(value);
        }
      });

      ideas =
        <FlatList
          keyExtractor={item => 'idea' + item.title}
          data={currentCategoryIdeas}
          renderItem={this.renderItem}
          style={styles.ideasContainer}
          horizontal={true}
          pagingEnabled={true} />
    }

    const deleteModal = this.state.showDeleteModal ?
      <DeleteModal 
        text={'Are you sure you want to delete ' + this.state.showDeleteModalTitle + '?'} 
        leftIconName='check' 
        handleLeftIconPress={() => this.deleteIdea(this.state.showDeleteModalTitle)}
        rightIconName='close'
        handleRightIconPress={this.toggleDeleteModal} />
      :
      <View />;

    const loader = this.props.loading ?
        <Loader positionStyle={{ bottom: 56 }} />
        :
        null;

    const errorMessage = this.props.errorMessage ?
        <Growl text={this.props.errorMessage} />
        :
        null;

    return (
      <View style={styles.container}>
        <Header 
          backgroundColor={styleConstants.primary}
          text='Idea Me'
          textSize={28}
          textColor={styleConstants.white}
          textStyle={styleConstants.ranga} 
          rightIconName='info'
          handleRightIconPress={this.signOut}/>
        <View style={styles.infoContainer}>
          <Count
            count={counter}
            total={this.props.ideas ? this.props.ideas.length : 0}
            unit='ideas' />
          <Dropdown
            value={this.state.currentCategory}
            handleSelect={this.selectCategory}
            values={this.props.categories}
            editItem={true}
            showAllOption={true} />
        </View>
        {ideas}
        <Button
          iconName='add'
          handlePress={() => Actions.addIdea()} />
        {deleteModal}
        {loader}
        {errorMessage}
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
    errorMessage: state.main.userAuth.userAuthErrorMessage,
    apiSaveSuccess: state.main.api.apiSaveSuccess,
    loading: state.main.app.loading
  });
}

export default connect(MapStateToProps)(Ideas);