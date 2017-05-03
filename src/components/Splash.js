import React from 'react';
import {
    View
} from "react-native";

import styles from '../styles/components/Splash';
import styleConstants from '../styles/styleConstants';

import Spinner from './Spinner';

export default class Auth extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    size={64} />
            </View>
        );
    }
}