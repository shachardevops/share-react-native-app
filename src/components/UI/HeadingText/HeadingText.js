import React from 'react';
import { Text, StyleSheet } from 'react-native';
const HeadingText = props => (
  <Text style={[styles.textHeading, props.style]} {...props}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});
export default HeadingText;
