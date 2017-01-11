import React, { Component, PropTypes } from 'react';
import { StatusBar, BackAndroid, Platform, Navigator, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { INSOYA_HOST } from './config';
import PostView from './components/Post/PostView';
import Info from './components/Info';
import PostList from './components/Post/PostList';
import Header from './components/Header';
import Menu from './components/Menu';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const ROUTES = {
  list: PostList,
  view: PostView,
};

const MENUS = [
  {
    icon: 'bell', title: '메이플 정보', component: PostList,
    menus: [
      { group: 'news', title: '새소식', url: `${INSOYA_HOST}zboard.php?id=bbs11&divpage=1` },
      { group: 'info', title: '정보나눔터', url: `${INSOYA_HOST}zboard.php?id=maple_info&divpage=2` },
    ],
  },
  {
    icon: 'comments', title: '메이플 커뮤니티', component: PostList,
    menus: [
      { group: 'maple', title: '메이플 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple&divpage=18` },
      { group: 'reboot', title: '리부트 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&category=5` },
      { group: 'world', title: '해외 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&category=1` },
      { group: 'mobile', title: '모바일 메이플', url: `${INSOYA_HOST}zboard.php?id=maple_mobile&divpage=1` },
    ],
  },
  {
    icon: 'users', title: '인소야 포럼', component: PostList,
    menus: [
      { group: 'maple', title: '메이플 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple&divpage=18` },
      { group: 'reboot', title: '리부트 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&category=5` },
      { group: 'world', title: '해외 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&category=1` },
      { group: 'mobile', title: '모바일 메이플', url: `${INSOYA_HOST}zboard.php?id=maple_mobile&divpage=1` },
    ],
  },
  { icon: 'users', title: '인소야 포럼', group: 'job', url: `${INSOYA_HOST}zboard.php?id=talkfree&divpage=8`, component: PostList },
  { icon: 'archive', title: '정보', component: Info },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#FAFAFA',
  },
});

class Router extends Component {
  constructor() {
    super();
    this._handlers = [];
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    SplashScreen.hide();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const { navigator } = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  render() {
    return(
      <View style={ styles.container }>
        <View style={ styles.statusBar }>
          <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content"/>
        </View>
        <Navigator
          ref="navigator"
          style={ styles.container }
          configureScene={
            (route) => {
              if (Platform.OS === 'android') {
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
              } else {
                return Navigator.SceneConfigs.FloatFromRight;
              }
            }
          }
          initialRoute={ { name: 'home' } }
          renderScene={ this.renderScene }
        />
        <Menu menus={ MENUS } index={ 0 } />
      </View>
    );
  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component { ...route.passProps } route={ route } navigator={ navigator } />;
  }
}

export default connect(
  (store) => ({
  })
)(Router);
