'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPostList } from '../modules/Post';
import PostItem from './PostItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const MAPLE_TALK_URL = 'http://www.insoya.com/bbs/zboard.php?id=talkmaple';

class MapleTalk extends Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      page: 0,
    };
  }

  componentDidMount() {
    this.props.fetchPostList(MAPLE_TALK_URL);
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.posts);

    return (
      <View style={ styles.container }>
        <ListView
          style={ styles.list }
          dataSource={ dataSource }
          renderRow={ (data) => <PostItem { ...data } /> }
          renderSeparator={ (sectionId, rowId) => <View key={ rowId } style={ styles.separator } /> }
        />
      </View>
    );
  }
}

export default connect(
  ({ Post }) => ({
    posts: Post.posts,
  }),
  { fetchPostList },
)(MapleTalk);
