'use strict';

import React, { Component } from 'react';
import AppState from 'AppState';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SessionActions from './modules/Session';
import Router from './Router';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Application extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState == 'active') {
      // resume 될때 할 일 (토큰 가져오거나~)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  (store) => ({
    isLoggedIn: store.Session.token !== '',
  }),
  (dispatch) => ({
    sessionActions: bindActionCreators(SessionActions, dispatch),
  })
)(Application);
