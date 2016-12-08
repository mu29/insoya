'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Application from './Application';

export default class InsoyaApp extends React.Component {
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

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={ this.state.store }>
        <Application />
      </Provider>
    );
  }
}
