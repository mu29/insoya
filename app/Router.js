'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  BackAndroid,
  Navigator,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

class Router extends Component {
  constructor() {
    super();
    this._handlers = [];
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
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
        initialRoute={ {} }
        renderScene={ this.renderScene }
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <Text>
        Welcome to React Native!
      </Text>
    );
  }
}

Router.childContextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  (store) => ({
  })
)(Router);
