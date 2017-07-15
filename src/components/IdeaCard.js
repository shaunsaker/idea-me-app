import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import utilities from '../utilities';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import InfoBlock from './InfoBlock';
import Menu from './Menu';
import IconButton from './IconButton';
import Label from './Label';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        width: width - 32,
        flex: 1,
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        paddingTop: 16,
        paddingBottom: 12,
        paddingHorizontal: 8,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    menuIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 42,
        height: 42,
        justifyContent: 'flex-end',
    },
    menuIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
    infoContainer: {
        flex: 1,
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: styleConstants.white,
        marginHorizontal: 4,
        padding: 8,
        elevation: 3,
    },
    buttonContainer: {

    },
    countContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: styleConstants.white,
        borderRadius: 32,
    },
    countText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.grey,
    },
});

export default class IdeaCard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);

        this.state = {
            showMenu: false,
        }
    }

    static get propTypes() {
        return {
            idea: PropTypes.object,
            handleMenuItemSelect: PropTypes.func,
            handleNotePress: PropTypes.func,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.showMenu !== this.state.showMenu ||
            nextProps.idea.title !== this.props.idea.title ||
            nextProps.idea.description !== this.props.idea.description ||
            nextProps.idea.category !== this.props.idea.category ||
            nextProps.idea.priority !== this.props.idea.priority ||
            nextProps.idea.notes !== this.props.idea.notes // needs work - will never be shallow equal
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    render() {
        const menu = this.state.showMenu &&
            <Menu
                values={['Edit', 'Share', 'Delete']}
                handleSelect={(type) => {
                    this.toggleMenu();
                    this.props.handleMenuItemSelect(type, this.props.idea)
                }
            } />;

        const categoryLabelText = this.props.idea.category ? this.props.idea.category : 'Uncategorised';
        const priorityLabelText = this.props.idea.priority ? this.props.idea.priority : 'Unprioritised';
        const notes = utilities.convertObjectArrayToArray(this.props.idea.notes);
        const notesCount = notes.length;
        const photosCount = utilities.getLengthOfObject(this.props.idea.photos);
        const voiceNotesCount = utilities.getLengthOfObject(this.props.idea.voiceNotes);

        return (
            <View
                style={styles.cardContainer} >

                <Touchable
                    onPress={this.toggleMenu}
                    style={styles.menuIconContainer} >
                    <Icon name='menu' style={styles.menuIcon} />
                </Touchable>

                <View style={styles.infoContainer}>
                    <InfoBlock
                        title={this.props.idea.title}
                        subtitle={this.props.idea.description}
                        titleColor={styleConstants.primary}
                        subtitleColor={styleConstants.grey}
                        fullWidth />
                </View>

                <View
                    style={styles.labelsContainer} >
                    <Label
                        iconName='folder'
                        labelText={categoryLabelText} />
                    <Label
                        iconName='priority'
                        labelText={priorityLabelText} />
                </View>

                <View
                    style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <IconButton
                            handlePress={() => this.props.handleNotePress('Note')}
                            iconName='note'
                            count={notesCount} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <IconButton
                            handlePress={() => this.props.handleNotePress('Photo')}
                            iconName='camera'
                            count={photosCount} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <IconButton
                            handlePress={() => this.props.handleNotePress('Voice Note')}
                            iconName='voice'
                            count={voiceNotesCount} />
                    </View>
                </View>

                {menu}

            </View>
        )
    }
}