import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/pages/Ideas';
import styleConstants from '../styles/styleConstants';

import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import Count from '../components/Count';
import FooterButton from "../components/FooterButton";

export class Ideas extends React.Component {
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
    this.navigateCategories = this.navigateCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.saveUserIdeas = this.saveUserIdeas.bind(this);

    this.state = {
      currentCategory: 'All',
      loading: false
    }
  }

  static get propTypes() {
    return {
      categories: React.PropTypes.array,
      ideas: React.PropTypes.array,
      uid: React.PropTypes.string.isRequired,
      errorMessage: React.PropTypes.string,
      apiSaveSuccess: React.PropTypes.bool,
    };
  }

  navigateBack() {
    Actions.pop();
  }

  navigateCategories() {
    Actions.categories();
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
      this.navigateCategories();
    }
  }

  editIdea(idea) {
    // browserHistory.push(`/edit-idea?title=${idea.title}&description=${idea.description}&categoryId=${idea.categoryId}&priorityId=${idea.priorityId}&id=${idea.index}`);
    // TODO
  }

  deleteIdea(index) {
    this.props.dispatch({
      type: 'DELETE_IDEA',
      index
    });
  }

  saveUserIdeas() {
    this.setState({
      loading: true
    });

    this.props.dispatch({
      type: 'RESET_API_SAVE_SUCCESS'
    });

    this.props.dispatch({
      type: 'saveUserIdeas',
      uid: this.props.uid,
      ideas: this.props.ideas
    });
  }

  componentDidUpdate() {
    if (this.props.errorMessage || this.props.apiSaveSuccess) {
      if (this.state.loading) {
        this.setState({
          loading: false
        });
      }
    }
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
        <ScrollView style={styles.ideasContainer}>
          <FlatList
            data={currentCategoryIdeas}
            renderItem={(value, index) =>
              <View
                style={styles.ideaItem} >
                <View style={styles.textContainer}>
                  <Text style={[styles.ideaTextTitle, styleConstants.robotoCondensed]}>
                    {value.title}
                  </Text>
                  <Text style={[styles.ideaTextDescription, styleConstants.robotoCondensed]}>
                    {value.description}
                  </Text>
                </View>
                <View
                  style={styles.labelsContainer} >
                  {
                    this.state.currentCategory == 'All' && (value.categoryId === 0 || value.categoryId) ?
                      <Text style={[styles.ideaChip, styleConstants.robotoCondensed]}>{this.props.categories[value.categoryId]}</Text>
                      :
                      <View></View>
                  }
                  {
                    value.priorityId === 0 || value.priorityId ?
                      <Text style={[styles.ideaChip, styles.priority, styleConstants.robotoCondensed]}>{this.props.priorities[value.priorityId].split('')[0]}</Text>
                      :
                      <View></View>
                  }
                  <TouchableOpacity
                    onPress={() => this.editIdea({ ...value, index })} >
                    <Icon
                      name='pencil'
                      style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.deleteIdea(index)} >
                    <Icon
                      name='close'
                      style={styles.deleteIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            } />
        </ScrollView>;
    }

    return (
      <View style={styles.container}>
        <Header
          handlePress={this.navigateBack}
          addIdea={true} />
        <View style={styles.infoContainer}>
          <Count
            count={counter}
            total={this.props.ideas ? this.props.ideas.length : 0}
            unit='ideas' />
          <Dropdown
            value={this.state.currentCategory}
            handleSelect={this.selectCategory}
            values={this.props.categories}
            editItem={true} />
        </View>
        {ideas}
        <FooterButton
          text='SAVE IDEAS'
          handlePress={this.saveUserIdeas}
          loading={this.state.loading} />
      </View >
    );
  }
}

function MapStateToProps(state) {
  return ({
    categories: state.main.categories,
    priorities: state.main.priorities,
    ideas: state.main.ideas,
    uid: state.main.user.uid,
    errorMessage: state.main.user.errorMessage,
    apiSaveSuccess: state.main.user.apiSaveSuccess,
  });
}

export default connect(MapStateToProps)(Ideas);