import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, ListView, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPostList } from '../modules/Post';
import { showProgress, showBackgroundProgress } from '../modules/Progress';
import PostItem from './PostItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  title: {
    color: '#000',
    padding: 12,
    marginTop: 12,
    marginLeft: 8,
    marginBottom: 0,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const POPULAR = 'hot';
const POPULAR_URL = 'http://www.insoya.com/bbs/_v.php?id=hot_post';

class Popular extends Component {
  constructor({ posts }) {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { page: 0 };
    this.paginate = this.paginate.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentWillMount() {
    const { posts, fetchPostList, showProgress, showBackgroundProgress } = this.props;
    posts.length < 20 ? showProgress() : showBackgroundProgress();
    fetchPostList(POPULAR_URL, POPULAR);
  }

  onClickItem(url) {
    this.props.navigator.push({ name: 'view', passProps: { url } })
  }

  paginate() {
    const { page } = this.state;
    this.props.fetchPostList(`${POPULAR_URL}&page=${page + 1}`, POPULAR);
    this.setState({ page: page + 1 });
  }

  renderHeader() {
    const { progress } = this.props;
    return (
      <View>
        <Text style={ styles.title }>인기 게시물</Text>
        { progress && <ActivityIndicator animating={ true } style={ { padding: 8 } } size="large" color="#fa5d63"/> }
      </View>
    );
  }

  render() {
    const { posts } = this.props;
    const { page } = this.state;
    const dataSource = this.ds.cloneWithRows(posts.filter(p => p.menu === POPULAR).slice(0, 20 * (page + 1)));

    return (
      <View style={ styles.container }>
        <ListView
          style={ styles.list }
          pageSize={ 10 }
          initialListSize={ 20 }
          dataSource={ dataSource }
          renderRow={ (data) => <PostItem { ...data } onClick={ this.onClickItem } /> }
          renderHeader={ () => this.renderHeader() }
          renderFooter={ () => <ActivityIndicator animating={ true } style={ { padding: 8 } } size="large" color="#fa5d63"/> }
          onEndReached={ () => this.paginate() }
          onEndReachedThreshold={ 100 }
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
    progress: Progress.backgroundShowing,
  }),
  { fetchPostList, showProgress, showBackgroundProgress },
)(Popular);
