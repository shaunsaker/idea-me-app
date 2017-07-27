import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    FlatList,
    Share,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from '../config';
import utilities from '../utilities';
import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import Logo from '../components/Logo';
import DropdownButton from '../components/DropdownButton';
import InfoBlock from '../components/InfoBlock';
import Button from '../components/Button';
import IdeaCard from '../components/IdeaCard';
import TabBar from '../components/TabBar';
import SoundPlayer from '../components/SoundPlayer';
import ActionModal from '../modals/ActionModal';
import SnackBar from '../widgets/SnackBar';
import ToolTip from '../widgets/ToolTip';

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
        this.showToolTips = this.showToolTips.bind(this);
        this.cancelOnboarding = this.cancelOnboarding.bind(this);

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
            deleteIdeaModalTitle: null,
            deleteIdeaUID: null,
            highlightProfileTab: false,
            ideaAdded: false,
        }
    }

    static get propTypes() {
        return {
            ideas: PropTypes.object,
            categories: PropTypes.object,
            currentCategory: PropTypes.string,
            uid: PropTypes.string,
            hasNetwork: PropTypes.bool,
            firstTimeUser: PropTypes.bool,
        };
    }

    componentDidMount() {
        if (this.props.firstTimeUser) {
            this.setState({
                highlightProfileTab: true,
            });
        }
    }

    componentDidUpdate(prevProps) {
        let ideaAdded;

        // Check if an idea has been added so we can play a sound
        if (utilities.getLengthOfObject(this.props.ideas) > utilities.getLengthOfObject(prevProps.ideas)) {
            ideaAdded = true;
        }
        else {
            ideaAdded = false;
        }

        if (ideaAdded !== this.state.ideaAdded) {
            this.setState({
                ideaAdded,
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
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteIdeaModalTitle: idea && idea.title, // will be null if closed
            deleteIdeaUID: idea && idea.uid, // will be null if closed
        });
    }

    deleteIdea() {
        let newIdeas = utilities.cloneObject(this.props.ideas);
        newIdeas = utilities.deleteObjectFromDictionary(this.state.deleteIdeaUID, newIdeas);

        // Dispatch to store
        this.props.dispatch({
            type: 'UPDATE_USER_DATA',
            node: 'ideas',
            userData: newIdeas,
        });

        // Dispatch to db
        this.props.dispatch({
            type: 'deleteUserData',
            node: 'ideas/' + this.state.deleteIdeaUID,
            uid: this.props.uid,
            hasNetwork: this.props.hasNetwork,
        });

        this.toggleDeleteModal();
        this.scrollToBeginning(); // otherwise we land up with a blank screen in some cases
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

    showToolTips() {
        this.props.dispatch({
            type: 'SHOW_TOOL_TIPS',
        });
    }

    cancelOnboarding() {
        this.props.dispatch({
            type: 'CANCEL_ONBOARDING',
        });
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

        // First time user / empty state
        let ideas = this.props.firstTimeUser ?
            <View style={{ flex: 1, justifyContent: 'center', marginVertical: 16 }}>
                <InfoBlock
                    title='Get Familiar'
                    subtitle="Hey! You've made it. You're a few steps away from success. Hit the 'Get Started' button for some handy tooltips (or skip them altogether). If all else fails, give us a shout from the menu found on your Profile page. Good luck! "
                    titleColor={styleConstants.primary}
                    subtitleColor={styleConstants.grey}
                    fullWidth />
                <Button
                    text='Get Started'
                    iconName='check'
                    backgroundColor={styleConstants.white}
                    handlePress={this.showToolTips} />
                <Button
                    text='No Thanks'
                    iconName='close'
                    backgroundColor={styleConstants.white}
                    handlePress={this.cancelOnboarding} />
            </View>
            :
            <View style={{ flex: 1 }} />;

        let currentCategoryIdeas;

        if (this.props.ideas) {
            if (this.props.currentCategory === 'All Categories') {
                currentCategoryIdeas = this.props.ideas;
            }
            else {
                currentCategoryIdeas = utilities.filterDictionaryByKeyValuePair({ category: this.props.currentCategory }, this.props.ideas);
            }

            const sortedIdeas = utilities.sortDictionaryByKeyAndValues(currentCategoryIdeas, 'priority', ['High', 'Medium', 'Low', null]);
            currentCount = utilities.getLengthOfObject(sortedIdeas);
            const sortedIdeasArray = utilities.convertDictionaryToArray(sortedIdeas);

            ideas =
                <FlatList
                    ref='ideasList'
                    keyExtractor={item => 'idea' + item.title}
                    data={sortedIdeasArray}
                    renderItem={this.renderItem}
                    horizontal
                    pagingEnabled />
        }

        const categories = utilities.convertDictionaryToArray(this.props.categories);

        const dropdownButtonComponent = !this.props.firstTimeUser &&
            <DropdownButton
                buttonBackgroundColor={styleConstants.primary}
                categoriesButton
                values={categories}
                currentCategory={this.props.currentCategory}
                handleSelect={this.selectCategory}
                headerValue={this.props.currentCategory !== 'All Categories' ? 'All Categories' : ''}
                currentCount={currentCount}
                totalCount={totalCount} />

        const deleteModal = this.state.showDeleteModal &&
            <ActionModal
                title='Are you sure you want to delete this idea?'
                subtitle={this.state.deleteIdeaModalTitle}
                handleLeftIconPress={this.deleteIdea}
                handleRightIconPress={this.toggleDeleteModal} />

        const soundPlayer = this.props.shouldPlaySounds &&
            <SoundPlayer
                fileName='ding.mp3'
                playSound={this.state.ideaAdded} />

        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding >

                <Header
                    headerShadow
                    leftComponent={() => <Logo />}
                    addButton
                    handleRightIconPress={() => Actions.addIdea()} />

                {dropdownButtonComponent}

                {ideas}

                <TabBar
                    tabs={this.tabs}
                    highlightProfileTab={this.state.highlightProfileTab} />

                {soundPlayer}

                {deleteModal}

                <SnackBar />

                <ToolTip />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.userAuth.uid,
        firstTimeUser: config.testing.firstTimeUser || state.main.userAuth.firstTimeUser, // testing
        hasNetwork: state.main.appState.hasNetwork,
        currentCategory: state.main.appData.currentCategory,
        ideas: state.main.userData.ideas,
        categories: state.main.userData.categories,
        shouldPlaySounds: state.main.userData.settings.shouldPlaySounds,
    });
}

export default connect(mapStateToProps)(Home);