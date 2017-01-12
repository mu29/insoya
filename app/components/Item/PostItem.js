import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    borderColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    margin: 4,
    marginBottom: -4,
    backgroundColor: '#FFF',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    flex: 1,
    fontSize: 12,
    color: '#999999',
  },
  commentWrapper: {
    marginLeft: 8,
    borderColor: '#999999',
    borderRadius: 4,
    borderWidth: 0.5,
    paddingLeft: 4,
    paddingRight: 4,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comment: {
    fontSize: 8,
    color: '#999999',
  },
  category: {
    fontSize: 12,
    color: '#999999',
  },
});

export default class PostItem extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(url) {
    this.props.onClick(url);
  }

  render() {
    const { title, url, comment, author, date, count, category } = this.props;
    const hotComment = Number(comment) > 9 ? { color: '#FA5D63' } : {};
    const hotCommentWrapper = Number(comment) > 9 ? { borderColor: '#FA5D63' } : {};
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          underlayColor={ 'transparent' }
          onPress={ () => this.onClick(url) }
        >
          <View>
            <View style={ styles.topContainer }>
              <Text style={ styles.title }>
                { title }
              </Text>
              <Text style={ styles.category }>
                { category }
              </Text>
            </View>
            <View style={ styles.bottomContainer }>
              <Text style={ styles.subtitle }>
                { `${author} | ${date} ${count !== '' && `| 조회 ${count}` || ''}` }
              </Text>
              {
                comment !== '' &&
                <View style={ [styles.commentWrapper, hotCommentWrapper] }>
                  <Text style={ [styles.comment, hotComment] }>
                    { comment }
                  </Text>
                </View>
              }
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
