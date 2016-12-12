'use strict';

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Main extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text>인소야는 소야소야해</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
