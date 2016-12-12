'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPostList } from '../modules/Post';
import { showProgress } from '../modules/Progress';
import PostItem from './PostItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
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
    this.props.showProgress();
    this.props.fetchPostList(MAPLE_TALK_URL);
  }

  render() {
    const { showing } = this.props;
    const dataSource = this.ds.cloneWithRows(this.props.posts);

    return (
      <View style={ styles.container }>
        {
          showing &&
          <Text style={ { marginTop: 256, textAlign: 'center' } }>
            로딩 중입니다...
          </Text> ||
          <ListView
            style={ styles.list }
            dataSource={ dataSource }
            renderRow={ (data) => <PostItem { ...data } /> }
          />
        }
      </View>
    );
  }
}

export default connect(
  ({ Post, Progress }) => ({
    posts: Post.posts,
    showing: Progress.showing,
  }),
  { fetchPostList, showProgress },
)(MapleTalk);
