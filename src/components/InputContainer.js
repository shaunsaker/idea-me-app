import React from "react";
import {
    View,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default InputContainer = (props) => {
    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'>
                {props.children}
            </KeyboardAwareScrollView>

        </View>
    );
}