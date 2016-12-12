import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 2,
    margin: 4,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  subtitle: {
    flex: 1,
    fontSize: 12,
    color: '#999999',
  },
  category: {
    fontSize: 12,
    color: '#999999',
  },
});

export default class PostItem extends Component {
  render() {
    const { title, url, comment, author, date, count, category } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>
          { `${title}${comment !== '' && ` [${comment}]` || ''}` }
        </Text>
        <View style={ styles.bottomContainer }>
          <Text style={ styles.subtitle }>
            { `${author} | ${date} | 조회 ${count}` }
          </Text>
          <Text style={ styles.category }>
            { category }
          </Text>
        </View>
      </View>
    );
  }
}
