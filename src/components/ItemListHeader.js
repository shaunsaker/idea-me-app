import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
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
    loaderContainer: {
        alignItems: 'flex-start',
        marginTop: 4.5,
    }
});

export default ItemListHeader = (props) => {
	const icon = props.iconName ?
		<View
			style={styles.headerIconContainer}>
			<Icon name={props.iconName} style={styles.headerIcon} />
		</View>
		:
		null;

	const subtitle = !props.value && !props.headerDisabled ?
        <View style={styles.loaderContainer}>
            <ActivityIndicator
                size="small"
                color={styleConstants.white} />
        </View>
        :
        props.value ?
            <Text style={[styles.headerSubtitleText, styleConstants.primaryFont]}>{props.value}</Text>
            :
            null;

    const header = props.disabled ?
        <View
            style={[styles.header, styles.headerDisabled]}>
            <View style={styles.headerTextContainer}>
                <Text style={[styles.headerTitleText, styleConstants.primaryFont]}>{props.title}</Text>

                {subtitle}

            </View>

            {icon}

        </View>
        :    
        props.handlePress ?
            <Touchable
                onPress={() => props.handlePress({title: props.value})}
                style={styles.header}
                androidRipple
                androidRippleColor={styleConstants.white}>
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitleText, styleConstants.primaryFont]}>{props.title}</Text>

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