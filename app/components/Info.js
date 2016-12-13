import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Info extends Component {
  render() {
    return (
      <View style={ styles.container } />
    );
  }
}