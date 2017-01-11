import React, { Component, PropTypes } from 'react';
import { Platform, View, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PostList from '../components/Post/PostList';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#FAFAFA',
  },
});

export default class Post extends Component {
  render() {
    const { title, menus, route, navigator } = this.props;

    return (
      <View style={ styles.container }>
        <View style={ styles.statusBar }>
          <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content"/>
        </View>
        <Header title={ title } subtitle={ menus[0].title } />
        <PostList route={ route } navigator={ navigator } { ...menus[0] } />
      </View>
    );
  }
}
