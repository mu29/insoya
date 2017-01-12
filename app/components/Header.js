import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 0.5,
    padding: 8,
  },
  title: {
    color: '#3C3C3C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#898989',
    fontSize: 12,
    marginTop: 4,
  },
  icon: {
    color: '#898989',
    marginTop: 4,
  },
  horizontal: {
    flexDirection: 'row',
  },
});

export default class Header extends Component {
  render() {
    const { title, subtitle, menus, onClick } = this.props;

    return (
      <View style={ styles.container }>
        <TouchableHighlight
          underlayColor={ 'transparent' }
          onPress={ onClick }
        >
          <View style={ { alignItems: 'center' } }>
            <Text style={ styles.title }>{ title }</Text>
            <View style={ styles.horizontal }>
              <Text style={ styles.subtitle }>{ subtitle } </Text>
              <Icon name="caret-down" style={ styles.icon } size={ 12 } />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
