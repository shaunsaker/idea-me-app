import React from "react";
import {
  View
} from "react-native";
import { Actions } from "react-native-router-flux";

import Header from '../components/Header';
import AddButton from '../components/AddButton';
import ViewButton from '../components/ViewButton';

import styles from '../styles/pages/Home';
import styleConstants from '../styles/styleConstants';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header allowBack={false} />
        <AddButton size={48} />
        <ViewButton
          size={48}
          handlePress={() => Actions.ideas()} />
      </View >
    );
  }
}