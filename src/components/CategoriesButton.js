import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

import Icon from '../styles/icons/index';
import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: width - 32,
        height: 56,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        marginTop: 16,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        marginRight: 8,
    },
    text: {
        fontSize: styleConstants.regularFont,
    }
});

export default CategoriesButton = (props) => {
    const altColor =
        props.backgroundColor === 'transparent' || props.backgroundColor === styleConstants.primary ?
            styleConstants.white
            :
            styleConstants.primary;       

    return (
        <View>
            <Touchable
                onPress={props.handlePress} 
                style={[styles.button, { backgroundColor: props.backgroundColor }, props.style]}
                androidRipple
                androidRippleColor={altColor}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Icon 
                            name='folder'
                            style={styles.icon} />
                        <Text
                            style={[styles.text, { color: altColor }, styleConstants.primaryFont]}>
                            {props.currentCategory}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Icon 
                            name='lightbulb'
                            style={styles.icon} />
                        <Text
                            style={[styles.text, { color: altColor }, styleConstants.primaryFont]}>
                            {props.currentCount + ' / ' + props.totalCount}
                        </Text>
                    </View>
                </View>
            </Touchable>
        </View>
    );
}