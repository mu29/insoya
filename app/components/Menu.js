import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopColor: '#434343',
    borderTopWidth: 0.5,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    color: '#898989',
    marginBottom: 4
  }
});

const menus = [
  { icon: 'comments', label: '메이플토크' },
  { icon: 'users', label: '직업별토크' },
  { icon: 'question-circle', label: '질문답변' },
  { icon: 'fire', label: '인기 게시물' },
];

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  render() {
    const { index } = this.state;
    return (
      <View style={ styles.container }>
        {
          menus.map((menu, i) => {
            const selected = i === index;
            const iconStyle = Object.assign({ marginBottom: 4 }, { color: selected ? '#FA5D63' : '#898989' });
            const textStyle = Object.assign({ fontSize: 10 }, { color: selected ? '#FA5D63' : '#898989' });

            return (
              <View style={ styles.content } key={ i }>
                <Icon name={ menu.icon } style={ iconStyle } size={ 20 } />
                <Text style={ textStyle }>{ menu.label }</Text>
              </View>
            )
          })
        }
      </View>
    );
  }
}
