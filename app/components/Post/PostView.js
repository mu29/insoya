import React, { Component } from 'react';
import { Platform, StatusBar, Modal, ActivityIndicator, View, Text, Image, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';
import { readPost } from '../../modules/Post';
import { showViewProgress } from '../../modules/Progress';
import CommentItem from '../Item/CommentItem';
import Navigation from '../Navigation';
import CommentBar from '../CommentBar';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 0.5,
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
  admob: {
    width: 320,
    height: 50,
  },
  admobWrapper: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    margin: 4,
    marginLeft: 12,
    marginRight: 12,
    height: 70,
    backgroundColor: '#FFF',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#FAFAFA',
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
    const { url, readPost, showViewProgress } = this.props;
    showViewProgress();
    readPost(`${BASE_URL}/${url}`);
  }

  showImage(imageUrl) {
    this.setState({ imageUrl });
  }

  hideAd() {
    this.setState({ showAd: false });
  }

  render() {
    const { showing, post, route, navigator, url } = this.props;
    const { showAd, imageUrl } = this.state;
    const visible = { opacity: showing ? 0 : 255 };
    return (
      <View style={ styles.container }>
        { 
          Platform.OS === 'ios' &&
          <View style={ styles.statusBar }>
            <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content"/>
          </View>
        }
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
            </View>
            <View style={ styles.commentWarpper }>
              {
                showAd && <View style={ styles.admobWrapper }>
                    <AdMobBanner
                      style={ styles.admob }
                      bannerSize="banner"
                      adUnitID={ Platform.OS === 'android' ? 'ca-app-pub-6988311040138762/6252116935' : 'ca-app-pub-6988311040138762/7170446937' }
                      didFailToReceiveAdWithError={ () => this.hideAd() }
                    />
                  </View>
              }
              {
                post.commentList && post.commentList.map((comment, i) => (
                  <CommentItem key={ i } comment={ comment } showImage={ this.showImage }/>
                ))
              }
            </View>
          </View>
        </ScrollView>
        <CommentBar referer={ `${BASE_URL}/${url}` }/>
      </View>
    );
  }
}

export default connect(
  ({ Post, Progress }) => ({
    post: Post.post,
    showing: Progress.viewShowing,
  }),
  { readPost, showViewProgress },
)(PostView);
