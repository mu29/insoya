'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import {
  AppState,
  Platform,
  Navigator,
  StyleSheet,
} from 'react-native';
import configureStore from './store/configureStore';
import Main from './components/Main';
 
const ROUTES = {
  main: Main
};

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

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return(
      <Provider store={ this.state.store }>
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
          initialRoute={ { name: 'main' } }
          renderScene={ this.renderScene }
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
