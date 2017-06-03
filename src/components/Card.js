import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

import InfoBlock from './InfoBlock';
import Menu from './Menu';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        width: window.width - 32,
        flex: 1,
        backgroundColor: styleConstants.white,
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
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    labelsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 8,
        alignItems: 'flex-end',
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
    const categoryLabelText = props.item.category ? props.item.category : 'Uncategorised';
    const priorityLabelText = props.item.priority ? props.item.priority + ' Priority': 'Unprioritised';
    
    const categoryLabel = 
        <View style={styles.categoryLabel}>
            <Text style={[styles.categoryLabelText, styleConstants.robotoCondensed]}>
                {categoryLabelText}
            </Text>
        </View>;

    const priorityLabel =
        <View style={styles.priorityLabel}>
            <Text style={[styles.priorityLabelText, styleConstants.robotoCondensed]}>
                {priorityLabelText}
            </Text>
        </View>;

    return (
        <View
            style={styles.cardContainer} >
            
            <InfoBlock
                title={props.item.title}
                subtitle={props.item.description}
                titleColor={styleConstants.primary}
                subtitleColor={styleConstants.grey} />

            <View style={styles.menuContainer}>
                <Menu 
                    values={['Edit', 'Share', 'Delete']}
                    handleSelect={(type) => props.handleSelect(type, props.item)} />
            </View>
            
            <View
                style={styles.labelsContainer} >
                {categoryLabel}
                {priorityLabel}
            </View>
        </View>
    )
}