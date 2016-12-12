import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#434343',
  },
  content: {
    flex: 1,
    color: '#FFFFFF',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
  }
});

export default class Menu extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.content }>메이플토크</Text>
        <Text style={ styles.content }>직업별토크</Text>
      </View>
    );
  }
}
