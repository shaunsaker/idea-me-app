import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Photo from './Photo';
import Touchable from './Touchable';
import InfoBlock from './InfoBlock';
import Label from './Label';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        width: width - 32,
        backgroundColor: styleConstants.realWhite,
        borderWidth: 1,
        borderColor: styleConstants.white,
        marginHorizontal: 16,
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
        right: 16,
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: styleConstants.lightGrey,
    },
    editImageContainer: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: styleConstants.transPrimary,
    },
    editImageIcon: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    emailIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primary,
        marginRight: 8,
        marginTop: 2,
    },  
    emailText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
        alignItems: 'flex-end',
    },
});

export default ProfileCard = (props) => {
    const profilePhoto = props.userPhotoUrl ?
        <Photo
            uri={props.userPhotoUrl} 
            isThumbnail
            photoContainerStyles={styles.profileImageContainer}
            photoStyles={styles.profileImage}
            errorText='Photo not found'
            deleteOnErrorOnly
            handleDeletePhoto={props.handleDeletePhoto} />
        :
        <View style={styles.profileImageContainer}>
            <Touchable
                onPress={props.handleEditImagePress}
                style={styles.editImageContainer} >
                <Icon
                    name='camera'
                    style={styles.editImageIcon} />
            </Touchable>
        </View>;

    const ideasLabel = props.numberOfIdeas &&
        <Label
            iconName='lightbulb'
            labelText={props.numberOfIdeas + ' excellent idea' + (props.numberOfIdeas > 1 ? 's' : '')} />;
    
    return (
        <View
            style={styles.cardContainer} >
            
            <InfoBlock
                title={props.userName}
                subtitle={props.userLocation}
                titleColor={styleConstants.primary}
                subtitleColor={styleConstants.grey} />

            {profilePhoto}

            <View style={styles.emailContainer}>
                <Icon name='mail' style={styles.emailIcon} />
                <Text style={[styles.emailText, styleConstants.primaryFont]}>{props.userEmail}</Text>
            </View>

            <View style={styles.labelsContainer}>
                {ideasLabel}
            </View>
        </View>
    )
}