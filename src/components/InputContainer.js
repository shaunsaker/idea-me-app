import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
    },
    inputContainer: {
        alignItems: 'center',
        backgroundColor: styleConstants.primary
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