import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import utilities from '../utilities';
import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import InfoBlock from './InfoBlock';
import BulletList from './BulletList';
import PhotoList from './PhotoList';
import VoiceNoteList from './VoiceNoteList';
import NoteTaker from './NoteTaker';
import IconButton from './IconButton';
import VoiceNoteRecorder from './VoiceNoteRecorder';

const styles = StyleSheet.create({
    cardContainer: {
        ...styleConstants.smallShadow,
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
        width: styleConstants.windowWidth - 32,
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    contentContainer: {
        flex: 1,
        marginBottom: 16,
    },
    infoContainer: {

    },
    notesContainer: {
        ...styleConstants.smallShadow,
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
            notes/photos/voiceNotes/categories
            handleAdd
            handleDelete
            hideTitle

            NOTES/CATEGORIES
                inputValue
                handleChangeText

            PHOTOS
                handleViewPhotos   

            VOICENOTES
                handleRecord
    */

    let notesValues;
    let title;
    let notes;
    let button;

    if (props.type === 'notes') {
        notesValues = props.notes;
        title = 'NOTES';
        notes =
            <BulletList
                values={notesValues}
                handleDelete={props.handleDelete} />;
        button =
            <NoteTaker
                text='Add a Note'
                handleAdd={props.handleAdd}
                inputValue={props.inputValue}
                handleChangeText={props.handleChangeText} />
    }
    else if (props.type === 'categories') {
        notesValues = props.categories;
        notes =
            <BulletList
                values={notesValues}
                handleDelete={props.handleDelete} />;
        button =
            <NoteTaker
                text='Add a Category'
                handleAdd={props.handleAdd}
                inputValue={props.inputValue}
                handleChangeText={props.handleChangeText} />
    }
    else if (props.type === 'photos') {
        notesValues = props.photos;
        title = 'PHOTOS';
        notes =
            <PhotoList
                photos={notesValues}
                handleViewPhotos={props.handleViewPhotos}
                handleDelete={props.handleDelete} />
        button =
            <IconButton
                handlePress={props.handleAdd}
                iconName='camera'
                iconColor={styleConstants.white}
                disabled={props.disabled} />
    }
    else if (props.type === 'voiceNotes') {
        notesValues = props.voiceNotes;
        title = 'VOICE NOTES';
        notes =
            <VoiceNoteList
                voiceNotes={notesValues}
                handleDelete={props.handleDelete} />;
        button =
            <VoiceNoteRecorder
                handleRecord={props.handleRecord} />
    }

    const notesCount = notesValues ? notesValues.length : 0;

    const titleColorStyles = title && notesCount === 0 &&
        {
            color: styleConstants.lightGrey,
        };

    const infoBlock = props.displayInfo &&
        <View style={styles.infoContainer}>
            <InfoBlock
                title={props.idea.title}
                titleColor={styleConstants.primary}
                fullWidth />
        </View>;

    const titleComponent = !props.hideTitle &&
        <View style={styles.titleContainer}>
            <Text style={[styles.title, styleConstants.primaryFont, titleColorStyles]}>
                {title + ' (' + notesCount + '):'}
            </Text>
        </View>;

    const buttonComponent = button &&
        <View style={styles.buttonContainer}>
            {button}
        </View>;

    return (
        <View
            style={styles.cardContainer} >

            <View style={styles.contentContainer}>

                {infoBlock}

                <View style={styles.notesContainer}>
                    {titleComponent}

                    {notes}

                </View>
            </View>

            {buttonComponent}

        </View>
    )
}