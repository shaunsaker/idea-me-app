import React from 'react';
import {
    View
} from "react-native";

import styles from '../styles/components/Splash';
import styleConstants from '../styles/styleConstants';

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