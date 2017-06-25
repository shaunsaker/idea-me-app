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
        marginHorizontal: 16,
        backgroundColor: styleConstants.white,
    },
    titleContainer: {
        padding: 8,
        backgroundColor: styleConstants.primary,
    },
    title: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondary,
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

export default PhotoList = (props) => {
    /*
        PROPTYPES
            labelColor
            bulletColor
            textColor
            title
            values
            handleDelete
    */

    const labelColorStyles = props.labelColor && 
        {
            color: props.labelColor
        };

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
                            key={'photo-' + value.title}
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
                style={[styles.noteText, styles.greyText, styleConstants.primaryFont, textColorStyles]}>
                None
            </Text>
        </View>;

    const titleColorStyles = props.values.length < 1 &&
        {
            color: styleConstants.lightGrey,
        };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, styleConstants.primaryFont, titleColorStyles, labelColorStyles,]}>{props.title}</Text>
            </View>

        </View>
    )
}