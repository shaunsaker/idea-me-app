import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import VoiceNotePlayer from './VoiceNotePlayer';
import DeleteButton from './DeleteButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.white,
    },
    voiceNotesWrapper: {
        flex: 1,
        padding: 8,
    },
    voiceNotesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 4,
        paddingBottom: 16,
    },
    voiceNoteContainer: {
        width: styleConstants.noteCardCell,
        height: styleConstants.noteCardCell,
        marginHorizontal: 4,
        marginBottom: 8,
    },

    noteTextContainer: {
        flex: 1,
        marginRight: 8,
    },
    noteText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },

    deleteButtonContainer: {
        position: 'absolute',
        top: 4,
        right: 4,
        elevation: 10,
    },
});

export default class VoiceNoteList extends React.Component {
    constructor(props) {
        super(props);

        this.renderVoiceNote = this.renderVoiceNote.bind(this);
    }

    static get propTypes() {
        return {
            voiceNotes: PropTypes.array,
            handleDelete: PropTypes.func,
        }
    }

    renderVoiceNote = ({ item }) => {
        return (
            <View style={styles.voiceNoteContainer}>
                <VoiceNotePlayer
                    voiceNote={item} />
                <View style={styles.deleteButtonContainer}>
                    <DeleteButton
                        handlePress={() => this.props.handleDelete(item)} />
                </View>
            </View>
        )
    }

    render() {
        const notes = this.props.voiceNotes && this.props.voiceNotes.length > 0 ?
            <FlatList
                keyExtractor={item => 'voiceNote-' + item.uid}
                data={this.props.voiceNotes}
                renderItem={this.renderVoiceNote}
                style={styles.voiceNotesWrapper}
                contentContainerStyle={styles.voiceNotesContainer}>
            </FlatList>
            :
            <View style={styles.voiceNotesWrapper}>
                <View style={styles.noteTextContainer}>
                    <Text
                        style={[styles.noteText, styleConstants.primaryFont]}>
                        None
                    </Text>
                </View>
            </View>;

        return (
            <View style={styles.container}>
                {notes}
            </View>
        )
    }
}