import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import DeleteButton from './DeleteButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.white,
    },
    notesWrapper: {
        flex: 1,
        padding: 8,
    },
    notesContainer: {
        paddingBottom: 16,
    },
    noteContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    bulletContainer: {
        marginRight: 8,
        top: 8,
        alignSelf: 'flex-start',
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
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
    deleteButtonContainer: {
        top: 4,
    },
});

export default BulletList = (props) => {
    /*
        PROPTYPES
            labelColor
            bulletColor
            textColor
            title
            values
            handleDelete
    */

    const bulletColorStyles = props.bulletColor && 
        {
            backgroundColor: props.bulletColor
        };

    const textColorStyles = props.textColor && 
        {
            color: props.textColor
        }; 

    const notes = props.values && props.values.length > 0 ? 
        props.values.map((value) => {
            const deleteButton = props.handleDelete ?
                <View style={styles.deleteButtonContainer}>
                    <DeleteButton
                        handlePress={() => props.handleDelete(value)} />
                </View>
                :
                null;

            return (
                <View 
                    key={'bullet-' + value.title}
                    style={styles.noteContainer}>
                    <View style={styles.bulletContainer}>
                        <View style={[styles.bullet, bulletColorStyles]} />
                    </View>
                    <View style={styles.noteTextContainer}>
                        <Text
                            key={'note-' + value.title}
                            style={[styles.noteText, styleConstants.primaryFont, textColorStyles]}>
                            {value.title}
                        </Text>
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
                style={styles.notesWrapper}
                contentContainerStyle={styles.notesContainer}>
                {notes}
            </ScrollView>
        </View>
    )
}