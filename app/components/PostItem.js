import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  comment: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999999',
    padding: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#999999',
  },
});

export default class PostItem extends Component {
  render() {
    const { title, url, comment, author, count } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.content}>
          <Text style={ styles.title }>
            { `${title}${comment !== '' && ` [${comment}]` || ''}` }
          </Text>
          <Text style={ styles.subtitle }>
            { `${author} | 조회 ${count}` }
          </Text>
        </View>
      </View>
    );
  }
}
