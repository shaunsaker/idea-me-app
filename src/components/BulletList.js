import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import DeleteButton from './DeleteButton';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    titleContainer: {
        marginBottom: 8,
    },
    title: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.secondary,
    },
    notesContainer: {

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
        color: styleConstants.white,
    },
    deleteButtonContainer: {
        top: 4,
    },
});

export default BulletList = (props) => {
    const notes = props.values && props.values.length ? 
        props.values.map((value) => {
            return (
                <View 
                    key={'bullet-' + value.title}
                    style={styles.noteContainer}>
                    <View style={styles.bulletContainer}>
                        <View style={styles.bullet} />
                    </View>
                    <View style={styles.noteTextContainer}>
                        <Text
                            key={'note-' + value.title}
                            style={[styles.noteText, styleConstants.primaryFont]}>
                            {value.title}
                        </Text>
                    </View>
                    <View style={styles.deleteButtonContainer}>
                        <DeleteButton
                            handlePress={() => props.handlePress(value)} />
                    </View>
                </View>
            );
        })
        :
        <View style={styles.noteTextContainer}>
            <Text
                style={[styles.noteText, styleConstants.primaryFont]}>
                None
            </Text>
        </View>;

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, styleConstants.primaryFont]}>{props.title}</Text>
            </View>
            <View
                style={styles.notesContainer}>
                {notes}
            </View>
        </View>
    )
}