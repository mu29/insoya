'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { AppState, Platform, View, Navigator, StyleSheet } from 'react-native';
import configureStore from './store/configureStore';
import Router from './Router';

export default class Application extends React.Component {
  state: {
    isLoading: boolean;
    store: any;
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

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
    if (this.state.isLoading) {
      return null;
    }
    return(
      <Provider store={ this.state.store }>
        <Router />
      </Provider>
    );
  }
}
