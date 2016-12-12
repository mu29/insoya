import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    margin: 4,
    marginLeft: 12,
    marginRight: 12,
  },
  author: {
    fontSize: 12,
    color: '#999999',
  },
  content: {
    fontSize: 16,
    marginBottom: -8,
  },
});

export default class CommentItem extends Component {
  render() {
    const { author, content } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={ styles.content }>{ content }</Text>
        <Text style={ styles.author }>{ `${author}` } | 16.12.13 02:16:01</Text>
      </View>
    );
  }
}
