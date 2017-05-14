import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
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

import GlowLoader from '../components/GlowLoader';

export default class Splash extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={styleConstants.transPrimary} />
                <GlowLoader
                    size={64} />
            </View>
        );
    }
}