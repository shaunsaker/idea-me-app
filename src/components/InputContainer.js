import React from "react";
import {
    View,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default InputContainer = (props) => {
    const customStyles = props.style && props.style;

    return (
        <View style={[{flex: 1, alignSelf: 'stretch'}, customStyles]}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'>
                {props.children}
            </KeyboardAwareScrollView>

        </View>
    );
}