import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, ActivityIndicator, StyleSheet } from 'react-native';
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

const JOB_TALK = 'jobtalk';
const JOB_TALK_URL = 'http://www.insoya.com/bbs/zboard.php?id=talkmaple_job&divpage=8';

class JobTalk extends Component {
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
    posts.length < 25 ? showProgress() : showBackgroundProgress();
    fetchPostList(JOB_TALK_URL, JOB_TALK);
  }

  onClickItem(url) {
    this.props.navigator.push({ name: 'view', passProps: { url } })
  }

  paginate() {
    const { page } = this.state;
    this.props.fetchPostList(`${JOB_TALK_URL}&page=${page + 1}`, JOB_TALK);
    this.setState({ page: page + 1 });
  }

  renderHeader() {
    const { progress } = this.props;
    return (
      <View>
        <Text style={ styles.title }>직업별 토크</Text>
        { progress && <ActivityIndicator animating={ true } style={ { padding: 8 } } size="large" color="#fa5d63"/> }
      </View>
    );
  }

  render() {
    const { posts } = this.props;
    const { page } = this.state;
    const dataSource = this.ds.cloneWithRows(posts.filter(p => p.menu === JOB_TALK).slice(0, 25 * (page + 1)));

    return (
      <View style={ styles.container }>
        <ListView
          style={ styles.list }
          pageSize={ 10 }
          initialListSize={ 25 }
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
)(JobTalk);
