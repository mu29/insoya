import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MENUS from  '../constants/Menus';
import MenuBar from '../components/MenuBar';

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

export default class Home extends Component {
  constructor() {
    super();
    this.state = { index: 1 };
    this.onSelectMenu = this.onSelectMenu.bind(this);
  }

  onSelectMenu(index) {
    this.setState({ index: index });
  }

  render() {
    const { index } = this.state;
    const { showing, route, navigator, menuIndex } = this.props;
    let Component = MENUS[index].component;

    return (
      <View style={ styles.container }>
        <Component route={ route } navigator={ navigator } { ...MENUS[index] } />
        <MenuBar menus={ MENUS } onSelectMenu={ this.onSelectMenu } index={ index } />
      </View>
    );
  }
}
