import React, { Component } from 'react';
import { Platform, Modal, ActivityIndicator, View, Text, Image, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob'
import { readPost } from '../modules/Post';
import { showProgress } from '../modules/Progress';
import CommentItem from '../components/CommentItem';
import Navigation from '../components/Navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: '#FFF'
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentWrapper: {
    padding: 16,
    backgroundColor: '#FFF'
  },
  commentWarpper: {
    height: undefined,
    paddingTop: 8,
    paddingBottom: 8,
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
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  admobWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  admob: {
    width: 320,
    height: 50,
  },
});

const BASE_URL = 'http://www.insoya.com/bbs';

class PostView extends Component {
  constructor() {
    super();
    this.state = { showAd: true, imageUrl: '' };
    this.showImage = this.showImage.bind(this);
    this.hideAd = this.hideAd.bind(this);
  }

  componentDidMount() {
    const { url, readPost, showProgress } = this.props;
    showProgress();
    readPost(`${BASE_URL}/${url}`);
  }

  showImage(imageUrl) {
    this.setState({ imageUrl });
  }

  hideAd() {
    this.setState({ showAd: false });
  }

  render() {
    const { showing, post, route, navigator } = this.props;
    const { showAd, imageUrl } = this.state;
    const visible = { opacity: showing ? 0 : 255 };
    return (
      <View style={ styles.container }>
        <Navigation route={ route } navigator={ navigator } />
        {
          showing &&
          <View style={ styles.modal }>
            <ActivityIndicator animating={ true } size="large" color="#fa5d63" />
          </View>
        }
        <Modal
          animationType={ "fade" }
          transparent={ false }
          visible={ imageUrl !== '' }
          onRequestClose={ () => {} }
        >
          <Image style={ styles.fullImage } source={ { uri: imageUrl } }>
            <TouchableHighlight
              style={ styles.modal }
              underlayColor={ 'transparent' }
              onPress={ () => { this.setState({ imageUrl: '' }) } }
            >
              <View style={ styles.modal }/>
            </TouchableHighlight>
          </Image>
        </Modal>
        <ScrollView style={ [styles.scroll, visible] }>
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
              {
                showAd && [
                  <View key="0" style={ styles.line } />,
                  <View key="1" style={ styles.admobWrapper }>
                    <AdMobBanner
                      style={ styles.admob }
                      bannerSize="banner"
                      adUnitID={ Platform.OS === 'android' ? 'ca-app-pub-6596802864096567/9188079532' : 'ca-app-pub-6596802864096567/5955411536' }
                      didFailToReceiveAdWithError={ () => this.hideAd() }
                    />
                  </View>,
                ]
              }
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
