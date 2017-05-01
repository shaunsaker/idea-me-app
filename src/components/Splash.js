import React from 'react';
import {
    View,
    StatusBar
} from "react-native";

import styles from '../styles/components/Splash';
import styleConstants from '../styles/styleConstants';

import Spinner from './Spinner';

export default class Auth extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={styleConstants.primary} />
                <Spinner
                    size={64}
                    color={styleConstants.white} />
            </View>
        );
    }
}