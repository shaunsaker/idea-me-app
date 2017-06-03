import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import OctIcon from 'react-native-vector-icons/Octicons';

import InfoBlock from './InfoBlock';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        width: window.width - 32,
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
    profileImageContainer: {
        position: 'absolute',
        top: 16,
        right: 16
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    emailIcon: {
        fontSize: 18,
        color: styleConstants.primary,
        marginRight: 8,
        marginTop: 2,
    },  
    emailText: {
        fontSize: 18,
        color: styleConstants.primary,
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 8,
        alignItems: 'flex-end',
    },
    ideasLabel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.primary,
        borderRadius: 32,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
    },
    ideasIcon: {
        fontSize: 18,
        color: styleConstants.secondary,
        marginRight: 4,
    },
    labelText: {
        fontSize: 18,
        color: styleConstants.white
    },
});

export default ProfileCard = (props) => {
    const ideasLabel = props.numberOfIdeas ?
        <View style={styles.ideasLabel}>
            <OctIcon name='light-bulb' style={styles.ideasIcon} />
            <Text style={[styles.labelText, styleConstants.robotoCondensed]}>{props.numberOfIdeas} excellent idea{props.numberOfIdeas > 1 ? s : ''}</Text>
        </View>
        :
        null;
    
    return (
        <View
            style={styles.cardContainer} >
            
            <InfoBlock
                title={props.userName}
                subtitle={props.location}
                titleColor={styleConstants.primary}
                subtitleColor={styleConstants.grey} />

            <View
                style={styles.profileImageContainer}>
                <Image
                    source={{uri: props.photoUrl}}
                    style={styles.profileImage} />
            </View>

            <View style={styles.emailContainer}>
                <Icon name='email' style={styles.emailIcon} />
                <Text style={[styles.emailText, styleConstants.robotoCondensed]}>{props.email}</Text>
            </View>

            <View style={styles.labelsContainer}>
                {ideasLabel}
            </View>
        </View>
    )
}