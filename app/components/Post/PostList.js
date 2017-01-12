import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPostList } from '../../modules/Post';
import { showProgress, showBackgroundProgress } from '../../modules/Progress';
import PostItem from '../Item/PostItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

class PostList extends Component {
  constructor({ posts }) {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { page: 0 };
    this.paginate = this.paginate.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentWillMount() {
    const {
      posts,
      group,
      url,
      fetchPostList,
      showProgress,
      showBackgroundProgress,
    } = this.props;
    posts.length < 20 ? showProgress() : showBackgroundProgress();
    fetchPostList(url, group);
  }

  componentWillReceiveProps(nextProps) {
    const {
      posts,
      group,
      url,
      fetchPostList,
      showProgress,
      showBackgroundProgress,
    } = this.props;
    if (group != nextProps.group) {
      posts.length < 20 ? showProgress() : showBackgroundProgress();
      fetchPostList(nextProps.url, nextProps.group);
    }
  }

  onClickItem(url) {
    this.props.navigator.push({ name: 'view', passProps: { url } })
  }

  paginate() {
    const { url, group } = this.props
    const { page } = this.state;
    this.props.fetchPostList(`${url}&page=${page + 1}`, group);
    this.setState({ page: page + 1 });
  }

  renderHeader() {
    const { progress } = this.props;
    return (
      <View>
        { progress && <ActivityIndicator animating={ true } style={ { padding: 8 } } size="large" color="#fa5d63"/> }
      </View>
    );
  }

  render() {
    const { progress, posts, group } = this.props;
    const { page } = this.state;
    const dataSource = this.ds.cloneWithRows(posts.filter(p => p.menu === group).slice(0, 20 * (page + 1)));

    return (
      <View style={ styles.container }>
        <ListView
          style={ styles.list }
          pageSize={ 10 }
          initialListSize={ 20 }
          dataSource={ dataSource }
          renderRow={ (data) => <PostItem { ...data } onClick={ this.onClickItem } /> }
          renderHeader={ () => this.renderHeader() }
          renderFooter={ () => <View>{ !progress && <ActivityIndicator animating={ true } style={ { padding: 8 } } size="large" color="#fa5d63"/> }</View> }
          onEndReached={ () => this.paginate() }
          onEndReachedThreshold={ 1000 }
          enableEmptySections={ true }
          removeClippedSubviews={ false }
        />
      </View>
    );
  }
}

export default connect(
  ({ Post, Progress }) => ({
    posts: Post.posts,
    progress: Progress.backgroundShowing || Progress.showing,
  }),
  { fetchPostList, showProgress, showBackgroundProgress },
)(PostList);
