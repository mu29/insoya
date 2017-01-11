import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MENUS from  '../constants/Menus';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class Home extends Component {
  render() {
    const { showing, route, navigator, menuIndex } = this.props;
    let Component = MENUS[menuIndex].component;

    return (
      <View style={ styles.container }>
        <Component route={ route } navigator={ navigator } { ...MENUS[menuIndex] } />
      </View>
    );
  }
}

export default connect(
  ({ Menu }) => ({
    menuIndex: Menu.index,
  })
)(Home);
