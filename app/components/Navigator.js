import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    color: '#FA5D63',
    padding: 4,
  },
  text: {
    color: '#FA5D63',
  }
});

export default class Navigator extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          underlayColor={ 'transparent' }
          onPress={ () => this.onClick() }
        >
          <View style={ styles.content }>
            <Icon name={ 'angle-left' } style={ styles.icon } size={ 20 } />
            <Text style={ styles.text }>{ '뒤로'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}