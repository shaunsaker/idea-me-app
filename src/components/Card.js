import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

import InfoBlock from './InfoBlock';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        width: window.width - 32,
        flex: 1,
        backgroundColor: styleConstants.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        marginTop: 8,
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
    textContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 66,
    },
    ideaTextTitle: {
        fontSize: 32,
        color: styleConstants.primary,
        marginRight: 36,
    },
    ideaTextDescription: {
        fontSize: 18,
        color: styleConstants.grey,
        paddingTop: 8
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 8,
    },
    categoryLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.primary,
        borderRadius: 32,
        padding: 8,
        marginHorizontal: 4,
    },
    categoryLabelText: {
        fontSize: 18,
        color: styleConstants.white
    },
    priorityLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.primary,
        borderRadius: 32,
        padding: 8,
        marginHorizontal: 4,
    },
    priorityLabelText: {
        fontSize: 18,
        color: styleConstants.primary
    },
});

export default Card = (props) => {
    const categoryLabel = props.currentCategory === 'All' && (props.item.categoryId === 0 || props.item.categoryId) ?
        <View style={styles.categoryLabel}>
            <Text style={[styles.categoryLabelText, styleConstants.robotoCondensed]}>
                {props.categories[props.item.categoryId]}
            </Text>
        </View>
        :
        null;

    const priorityLabel = props.item.priorityId === 0 || props.item.priorityId ?
        <View style={styles.priorityLabel}>
            <Text style={[styles.priorityLabelText, styleConstants.robotoCondensed]}>
                {props.priorities[props.item.priorityId] + ' Priority'}
            </Text>
        </View>
        :
        null;

    return (
        <View
            style={styles.cardContainer} >
            <InfoBlock
                title={props.item.title}
                subtitle={props.item.description}
                titleColor={styleConstants.primary}
                subtitleColor={styleConstants.grey} />
            <View
                style={styles.labelsContainer} >
                {categoryLabel}
                {priorityLabel}
            </View>
        </View>
    )
}