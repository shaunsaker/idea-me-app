import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from "react-native";

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.primary
    },
});

import GlowLoader from './GlowLoader';

export default class Auth extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <GlowLoader
                    size={64} />
            </View>
        );
    }
}