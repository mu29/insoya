import React, { Component } from 'react';
import { Platform, Modal, ActivityIndicator, View, Text, Image, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { readPost } from '../modules/Post';
import { showProgress } from '../modules/Progress';
import CommentItem from '../components/CommentItem';
import Navigation from '../components/Navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: '#FAFAFA'
  },
  contentWrapper: {
    padding: 12,
    paddingBottom: 0,
    marginBottom: -12,
    backgroundColor: '#FFF'
  },
  commentWarpper: {
    marginTop: -8,
    paddingTop: 8,
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#999999',
  },
  image: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#999999',
    marginBottom: 16,
    width: undefined,
    height: 300,
  },
  fullImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  content: {
    color: '#000',
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
  constructor() {
    super();
    this.state = { imageUrl: '' };
    this.showImage = this.showImage.bind(this);
  }

  componentDidMount() {
    const { url, readPost, showProgress } = this.props;
    showProgress();
    readPost(`${BASE_URL}/${url}`);
  }

  showImage(imageUrl) {
    this.setState({ imageUrl });
  }

  render() {
    const { showing, post, route, navigator } = this.props;
    const { imageUrl } = this.state;
    console.log(this.state);
    return (
      <View style={ styles.container }>
        <Navigation route={ route } navigator={ navigator } />
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
        <Modal
          animationType={ "fade" }
          transparent={ false }
          visible={ imageUrl !== '' }
          onRequestClose={ () => {} }
        >
          <Image style={ styles.fullImage } source={ { uri: imageUrl } }>
            <TouchableHighlight style={ styles.modal } onPress={ () => { this.setState({ imageUrl: '' }) } }>
              <View style={ styles.modal }/>
            </TouchableHighlight>
          </Image>
        </Modal>
        <ScrollView>
          <View>
            <View style={ styles.contentWrapper }>
              <Text style={ styles.title }>{ post.title }</Text>
              <Text style={ styles.author }>{ `${post.author} | ${post.date} | 조회 ${post.count}` }</Text>
              <View style={ styles.line } />
              {
                post.images && post.images.map((image, i) => (
                  <TouchableHighlight
                    key={ i }
                    underlayColor={ 'transparent' }
                    onPress={ () => this.showImage(image) }
                  >
                    <Image style={ styles.image } source={ { uri: image } } />
                  </TouchableHighlight>
                ))
              }
              <Text style={ styles.content }>{ post.content }</Text>
              <View style={ styles.line } />
            </View>
            <View style={ styles.commentWarpper }>
              {
                post.commentList && post.commentList.map((comment, i) => (
                  <CommentItem key={ i } comment={ comment } />
                ))
              }
            </View>
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
