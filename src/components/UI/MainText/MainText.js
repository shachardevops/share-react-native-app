import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MainText = props => <Text style={styles.MainText}>{props.children}</Text>;

const styles = StyleSheet.create({
  MainText: {
    color: '#FA923F',
    backgroundColor: 'transparent'
  }
});
export default MainText;
