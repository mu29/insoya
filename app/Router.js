'use strict';

import React, { Component, PropTypes } from 'react';
import { Platform, Navigator, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapleTalk from './components/MapleTalk';
import Menu from './components/Menu';

const ROUTES = {
  mapletalk: MapleTalk
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Router extends Component {
  render() {
    return(
      <View style={ styles.container }>
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
          initialRoute={ { name: 'mapletalk' } }
          renderScene={ this.renderScene }
        />
        <Menu />
      </View>
    );
  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
}

export default connect(
  (store) => ({
  })
)(Router);
