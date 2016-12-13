import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  content: {
    textAlign: 'center',
    color: '#999999',
    marginBottom: 4,
  },
  line: {
    margin: 36,
    width: 100,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  icon: {
    color: '#FA5D63',
    marginBottom: 8,
  },
  textIcon: {
    color: '#898989',
    padding: 2,
    marginRight: 4,
    marginBottom: 8,
  },
  rightSpace: {
    marginRight: 8,
  },
});

export default class Info extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Icon name="user" style={ styles.icon } size={ 36 } />
        <Text style={ styles.content }>적류@베라</Text>
        <Text style={ styles.content }>mu29@yeoubi.net</Text>
        <View style={ styles.line } />
        <Icon name="code" style={ styles.icon } size={ 36 } />
        <View style={ styles.wrapper }>
          <Icon name="facebook" style={ styles.textIcon } size={ 14 } />
          <Text style={ [styles.content, styles.rightSpace] }>React Native</Text>
        </View>
        <View style={ styles.wrapper }>
          <Icon name="amazon" style={ styles.textIcon } size={ 14 } />
          <Text style={ [styles.content, styles.rightSpace] }>AWS Lambda</Text>
        </View>
      </View>
    );
  }
}