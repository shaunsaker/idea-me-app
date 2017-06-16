import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: styleConstants.primary,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.lightGrey,
    },
    headerDisabled: {
        opacity: 0.33,
    },
    headerTextContainer: {

    },
    headerTitleText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondary,
    },
    headerSubtitleText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
    headerIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
});

export default ItemListHeader = (props) => {
	const icon = props.iconName ?
		<View
			style={styles.headerIconContainer}>
			<Icon name={props.iconName} style={styles.headerIcon} />
		</View>
		:
		null;

	const subtitle = props.subtitle ?
		<Text style={[styles.headerSubtitleText, styleConstants.secondaryFont]}>{props.subtitle}</Text>
		:
		null;

    const header = props.hasError ?
        <View
            style={[styles.header, styles.headerDisabled]}>
            <View style={styles.headerTextContainer}>
                <Text style={[styles.headerTitleText, styleConstants.secondaryFont]}>{props.title}</Text>

                {subtitle}

            </View>

            {icon}

        </View>
        :    
        props.handlePress ?
            <Touchable
                onPress={() => props.handlePress(props.header)}
                style={styles.header}
                androidRipple
                androidRippleColor={styleConstants.white}>
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitleText, styleConstants.secondaryFont]}>{props.title}</Text>

                    {subtitle}

                </View>

                {icon}

            </Touchable>
            :
            <View
                style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitleText, styleConstants.secondaryFont]}>{props.title}</Text>

                    {subtitle}

                </View>

                {icon}

            </View>

    return header;
}