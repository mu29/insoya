import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderTopColor: '#AAAAAA',
    borderTopWidth: 0.5,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    height: 40,
  },
  button: {
    marginRight: 12,
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA5D63',
    borderColor: '#FA5D63',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 14,
    color: '#FAFAFA',
  },
});

export default class CommentBar extends Component {
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
        <TextInput
          style={ styles.input }
          placeholder="댓글 쓰기..."
        />
        <TouchableHighlight
          underlayColor={ 'transparent' }
        >
          <View style={ styles.button }>
            <Text style={ styles.buttonText }>입력</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
