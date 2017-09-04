import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from '../assets/icons/index';
import styleConstants from '../assets/styleConstants';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    button: {
        ...styleConstants.smallShadow,
        width: styleConstants.windowWidth - 32,
        height: 56,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: styleConstants.white,
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
    },
});

export default (CategoriesButton = props => {
    const altColor =
        props.backgroundColor === 'transparent' ||
        props.backgroundColor === styleConstants.primary
            ? styleConstants.white
            : styleConstants.primary;

    return (
        <View>
            <Touchable
                onPress={props.handlePress}
                style={[
                    styles.button,
                    { backgroundColor: props.backgroundColor },
                    props.style,
                ]}
                androidRipple
                androidRippleColor={altColor}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Icon name="folder" style={styles.icon} />
                        <Text
                            style={[
                                styles.text,
                                { color: altColor },
                                styleConstants.primaryFont,
                            ]}>
                            {props.currentCategory}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Icon name="lightbulb" style={styles.icon} />
                        <Text
                            style={[
                                styles.text,
                                { color: altColor },
                                styleConstants.primaryFont,
                            ]}>
                            {props.currentCount + ' / ' + props.totalCount}
                        </Text>
                    </View>
                </View>
            </Touchable>
        </View>
    );
});
