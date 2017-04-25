import React from "react";
import {
  View,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EvilIcon from "react-native-vector-icons/EvilIcons";

import Header from '../components/Header';

import styles from '../styles/pages/Home';
import styleConstants from '../styles/styleConstants';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header 
          allowBack={false} 
          addIdea={false} 
          addCategory={false} />
        <TouchableOpacity
          style={styles.button} 
          onPress={() => Actions.addIdea()}>
          <MaterialIcon
            name='add'
            color={styleConstants.secondary}
            size={48} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button} 
          onPress={() => Actions.ideas()}>
          <EvilIcon
            name='eye'
            color={styleConstants.secondary}
            size={64} />
        </TouchableOpacity>
      </View >
    );
  }
}