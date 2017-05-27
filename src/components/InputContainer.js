import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
    },
    inputContainer: {
        alignItems: 'center',
    },
});

export default class InputContainer extends React.Component {
    render() {
        return (
            <View style={styles.inputWrapper}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.inputContainer}
                    keyboardShouldPersistTaps='always'>
                    {this.props.children}
                </KeyboardAwareScrollView>

            </View>
        );
    }
}