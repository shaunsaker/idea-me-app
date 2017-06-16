import React from "react";
import {
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
} from "react-native";

import styleConstants from '../styles/styleConstants';

export default Touchable = (props) => {
    const touchable = props.androidRipple && Platform.OS === 'android' ?
        <TouchableNativeFeedback
            onPress={props.onPress}
            background={TouchableNativeFeedback.Ripple(props.androidRippleColor, props.androidRippleBorderless)}>
            <View style={props.style}>
                {props.children}
            </View>
        </TouchableNativeFeedback>
        :
        <TouchableOpacity
            onPress={props.onPress}
            style={props.style}>
            {props.children}
        </TouchableOpacity>;

    return touchable;
}