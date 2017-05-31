import React from "react";
import {
    View,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default InputContainer = (props) => {
    const verticalCenterStyles = props.alignCenter ? 
        {
            flex: 1,
            justifyContent: 'center',
        }
        :
        null;

    return (
        <View style={[{flex: 1, alignSelf: 'stretch'}, verticalCenterStyles]}>
            <KeyboardAwareScrollView
                contentContainerStyle={[verticalCenterStyles]}
                keyboardShouldPersistTaps='always'>
                {props.children}
            </KeyboardAwareScrollView>

        </View>
    );
}