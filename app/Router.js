import React, { Component, PropTypes } from 'react';
import { Platform, Navigator, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
