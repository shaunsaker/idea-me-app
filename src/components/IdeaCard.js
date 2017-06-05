import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import InfoBlock from './InfoBlock';
import Menu from './Menu';
import Label from './Label';

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
        top: 16,
        right: 16,
    },
    labelsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});

export default IdeaCard = (props) => {
    const categoryLabelText = props.idea.category ? props.idea.category : 'Uncategorised';
    const priorityLabelText = props.idea.priority ? props.idea.priority + ' Priority': 'Unprioritised';

    return (
        <View
            style={styles.cardContainer} >
            
            <InfoBlock
                title={props.idea.title}
                subtitle={props.idea.description}
                titleColor={styleConstants.primary}
                subtitleColor={styleConstants.grey} />

            <View style={styles.menuContainer}>
                <Menu 
                    values={['Edit', 'Share', 'Delete']}
                    handleSelect={(type) => props.handleSelect(type, props.idea)} />
            </View>
            
            <View
                style={styles.labelsContainer} >
                <Label
                    iconName='group'
                    labelText={categoryLabelText} />
                <Label
                    iconName='sort'
                    labelText={priorityLabelText} />
            </View>
        </View>
    )
}