import React, { Component } from 'react';
import { Platform, Modal, ActivityIndicator, View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { readPost } from '../modules/Post';
import { showProgress } from '../modules/Progress';
import CommentItem from '../components/CommentItem';
import Navigation from '../components/Navigation';

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
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const BASE_URL = 'http://www.insoya.com/bbs';

class PostView extends Component {
  componentDidMount() {
    const { url, readPost, showProgress } = this.props;
    showProgress();
    readPost(`${BASE_URL}/${url}`);
  }

  render() {
    const { showing, post, route, navigator } = this.props;
    return (
      <View style={ styles.container }>
        <Navigation route={ route } navigator={ navigator } />
        {
          showing &&
          <Modal
            animationType={ "none" }
            transparent={ false }
            visible={ showing }
            onRequestClose={() => {}}
          >
            <View style={ styles.modal }>
              <ActivityIndicator animating={ true } size="large" color="#fa5d63" />
            </View>
          </Modal>
        }
        <ScrollView>
          <View>
            <View style={ styles.contentWrapper }>
              <Text style={ styles.title }>{ post.title }</Text>
              <Text style={ styles.author }>{ `${post.author} | ${post.date} | 조회 ${post.count}` }</Text>
              <View style={ styles.line } />
              <Text>{ post.content }</Text>
              <View style={ styles.line } />
            </View>
            {
              post.commentList && post.commentList.map((comment, i) => (
                <CommentItem key={ i } comment={ comment } />
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
    showing: Progress.showing,
  }),
  { readPost, showProgress },
)(PostView);
