import React, { Component } from 'react';
import { Platform, View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { readPost } from '../modules/Post';
import { showProgress } from '../modules/Progress';
import CommentItem from '../components/CommentItem';
import Navigator from '../components/Navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: '#FFF'
  },
  contentWrapper: {
    padding: 12,
    paddingBottom: 0,
    marginBottom: -12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#999999',
  },
  line: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: -12,
    marginRight: -12,
    borderTopWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  content: {

  },
});

const BASE_URL = 'http://www.insoya.com/bbs';

class PostView extends Component {
  componentDidMount() {
    const { url, readPost } = this.props;
    readPost(`${BASE_URL}/${url}`);
  }

  render() {
    const { post, route, navigator } = this.props;
    return (
      <View style={ styles.container }>
        <Navigator route={ route } navigator={ navigator } />
        <ScrollView>
          <View>
            <View style={ styles.contentWrapper }>
              <Text style={ styles.title }>{ post.title }</Text>
              <Text style={ styles.author }>{ post.author } | 2016.12.13 00:41 | 조회 630</Text>
              <View style={ styles.line } />
              <Text>asdfsadf{ post.content }</Text>
              <View style={ styles.line } />
            </View>
            {
              post.commentList && post.commentList.map((comment, i) => (
                <CommentItem key={ i } author={ comment.author } content={ comment.content } />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({ Post, Progress }) => ({
    post: Post.post,
    progress: Progress.showing,
  }),
  { readPost, showProgress },
)(PostView);
