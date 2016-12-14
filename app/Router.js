import React, { Component, PropTypes } from 'react';
import { BackAndroid, Platform, Navigator, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Home from './containers/Home';
import PostView from './containers/PostView';

const ROUTES = {
  home: Home,
  view: PostView,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
