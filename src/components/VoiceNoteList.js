import React from 'react';
import {
    View,
    ScrollView,
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
        paddingBottom: 16,
    },
    voiceNoteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
});

export default VoiceNoteList = (props) => {
    /*
        PROPTYPES
            labelColor
            textColor
            values
            handleDelete
            isPlaying
    */

    const labelColorStyles = props.labelColor && 
        {
            color: props.labelColor
        };

    const textColorStyles = props.textColor && 
        {
            color: props.textColor
        }; 

    const notes = props.values && props.values.length > 0 ? 
        props.values.map((value) => {
            return (
                <View 
                    key={'voiceNote-' + value.uid}
                    style={styles.voiceNoteContainer}>
                    <VoiceNotePlayer
                        voiceNote={value}
                        handlePlay={props.handlePlay}
                        isPlaying={props.isPlaying} />
                    <DeleteButton
                        handlePress={() => props.handleDelete(value.uid)} />
                </View>
            );
        })
        :
        <View style={styles.noteTextContainer}>
            <Text
                style={[styles.noteText, styleConstants.primaryFont, textColorStyles]}>
                None
            </Text>
        </View>;

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.voiceNotesWrapper}
                contentContainerStyle={styles.voiceNotesContainer}>
                {notes}
            </ScrollView>
        </View>
    )
}