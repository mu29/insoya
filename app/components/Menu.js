import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopColor: '#E5E5E5',
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
  },
});

export default class Menu extends Component {
  constructor() {
    super();
    this.onSelectMenu = this.onSelectMenu.bind(this);
  }

  onSelectMenu(index) {
    this.props.onSelectMenu(index);
  }

  render() {
    const { menus, index } = this.props;
    return (
      <View style={ styles.container }>
        {
          menus.map((menu, i) => {
            const selected = i === index;
            const iconStyle = Object.assign({ marginBottom: 4 }, { color: selected ? '#FA5D63' : '#898989' });
            const textStyle = Object.assign({ fontSize: 10 }, { color: selected ? '#FA5D63' : '#898989' });

            return (
              <View style={ styles.content } key={ i }>
                <TouchableHighlight
                  underlayColor={ 'transparent' }
                  onPress={ () => this.onSelectMenu(i) }
                >
                  <View style={ { alignItems: 'center' } }>
                    <Icon name={ menu.icon } style={ iconStyle } size={ 20 } />
                    <Text style={ textStyle }>{ menu.label }</Text>
                  </View>
                </TouchableHighlight>
              </View>
            )
          })
        }
      </View>
    );
  }
}
