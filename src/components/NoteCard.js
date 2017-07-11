import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import utilities from '../utilities';
import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import InfoBlock from './InfoBlock';
import BulletList from './BulletList';
import PhotoList from './PhotoList';
import VoiceNoteList from './VoiceNoteList';
import NoteTaker from './NoteTaker';
import IconButton from './IconButton';
import VoiceNoteRecorder from './VoiceNoteRecorder';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
        width: window.width - 32,
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        paddingVertical: 16,
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
    contentContainer: {
        flex: 1,
        marginBottom: 16,
    },
    infoContainer: {

    },
    notesContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    titleContainer: {
        padding: 8,
        backgroundColor: styleConstants.primary,
    },
    title: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondary,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 8,
    },
});

export default NoteCard = (props) => {

    /*
        PROPTYPES
            idea
            notes/photos/voiceNotes
            handleAdd
            handleDelete

            NOTES
                inputValue
                handleChangeText

            PHOTOS
                handleViewPhotos   

            VOICENOTES
                handleRecord
    */

    let notesValues;
    let title;
    let iconName;
    let notes;

    if (props.type === 'notes') {
        notesValues = props.notes;
        title = 'NOTES';
        iconName = 'note';
        notes =
            <BulletList
                notes={notesValues}
                handleDelete={() => props.handleDelete(props.idea)} />;
    }
    else if (props.type === 'photos') {
        notesValues = props.photos;
        title = 'PHOTOS';
        iconName = 'camera';
        notes =
            <PhotoList
                photos={notesValues}
                handleViewPhotos={props.handleViewPhotos}
                handleDelete={props.handleDelete} />
    }
    else if (props.type === 'voiceNotes') {
        notesValues = props.voiceNotes;
        title = 'VOICE NOTES';
        notes =
            <VoiceNoteList
                voiceNotes={notesValues}
                handleDelete={props.handleDelete} />;
    }

    const button = props.type === 'notes' ?
        <NoteTaker
            handleAdd={props.handleAdd}
            inputValue={props.inputValue}
            handleChangeText={props.handleChangeText} />
        :
        props.type === 'photos' ?
            <IconButton
                handlePress={props.handleAdd}
                iconName={iconName}
                iconColor={styleConstants.secondary}
                disabled={props.disabled} />
            :
            props.type === 'voiceNotes' ?
                <VoiceNoteRecorder
                    handleRecord={props.handleRecord} />
                :
                null;

    const titleColorStyles = notesValues && notesValues.length < 1 &&
        {
            color: styleConstants.lightGrey,
        };

    const notesCount = notesValues ? notesValues.length : 0;

    return (
        <View
            style={styles.cardContainer} >

            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <InfoBlock
                        title={props.idea.title}
                        subtitle={props.idea.description}
                        titleColor={styleConstants.primary}
                        subtitleColor={styleConstants.grey}
                        fullWidth />
                </View>

                <View style={styles.notesContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, styleConstants.primaryFont, titleColorStyles]}>
                            {title + ' (' + notesCount + '):'}
                        </Text>
                    </View>

                    {notes}

                </View>
            </View>

            <View style={styles.buttonContainer}>
                {button}
            </View>
        </View>
    )
}