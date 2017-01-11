import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 0.5,
    padding: 12,
  },
  text: {
    color: '#3C3C3C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default class Header extends Component {
  render() {
    const { menus, index, onClickTitle } = this.props;
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          underlayColor={ 'transparent' }
          onPress={ onClickTitle }
        >
          <View style={ { alignItems: 'center' } }>
            <Text style={ styles.text }>메이플 토크</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
