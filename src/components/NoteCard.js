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
import IconButton from './IconButton';

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
            notes
            handleDelete
    */
  
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
                    <BulletList 
                        title={'NOTES (' + props.notes.length + '):'}
                        values={props.notes}
                        handleDelete={() => props.handleDeleteNote(props.idea)} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <IconButton
                    handlePress={props.handleAddNote}
                    iconName='add'
                    iconColor={styleConstants.secondary}
                    disabled={props.disabled} />
            </View>
        </View>
    )
}