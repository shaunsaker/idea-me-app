import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';
import Counter from './Counter';
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
    voiceNoteIconContainer: {

    },
    voiceNoteIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
    },
    voiceNoteDurationTextContainer: {
        marginLeft: 8,
    },
    voiceNoteProgressContainer: {
        flex: 1,
        marginHorizontal: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    voiceNoteProgressMarker: {
        position: 'absolute',
        top: 4.5,
        left: 0,
        backgroundColor: styleConstants.primary,
        width: 16,
        height: 16,
        borderRadius: 8,
        zIndex: 1,
    },
    voiceNoteProgressLine: {
        height: 2,
        backgroundColor: styleConstants.lightGrey,
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
            const deleteButton = !props.handleDelete ?
                <DeleteButton
                    handlePress={() => props.handleDelete(value.filePath)} />
                :
                null;

            return (
                <View 
                    key={'voiceNote-' + value.filePath}
                    style={styles.voiceNoteContainer}>
                    <Touchable
                        onPress={() => props.handlePlay(value.filePath)}
                        style={styles.voiceNoteIconContainer}>
                        <Icon 
                            name='play'
                            style={styles.voiceNoteIcon} />                        
                    </Touchable>
                    <View style={styles.voiceNoteDurationTextContainer}>
                        <Counter
                            displayDuration={value.duration} 
                            totalDuration={value.duration} 
                            startTimer={props.isPlaying} />
                    </View>
                    <View style={styles.voiceNoteProgressContainer}>
                        <View style={styles.voiceNoteProgressMarker} />
                        <View style={styles.voiceNoteProgressLine} />
                    </View>
                    {deleteButton}
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