import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import MapleTalk from '../components/MapleTalk';
import JobTalk from '../components/JobTalk';
import WorldTalk from '../components/WorldTalk';
import Info from '../components/Info';
import Menu from '../components/Menu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: '#FAFAFA',
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const MENUS = [
  { icon: 'comments', label: '메이플토크', component: MapleTalk },
  { icon: 'users', label: '직업별토크', component: JobTalk },
  { icon: 'globe', label: '월드토크', component: WorldTalk },
  { icon: 'archive', label: '정보', component: Info },
];

class Home extends Component {
  constructor() {
    super();
    this.state = { index: 0 };
    this.onSelectMenu = this.onSelectMenu.bind(this);
  }

  onSelectMenu(index) {
    this.setState({ index: index });
  }

  render() {
    const { showing, route, navigator } = this.props;
    const { index } = this.state;
    const visible = { flex: showing ? 0 : 1 };
    let Component = MENUS[index].component;

    return (
      <View style={ styles.container }>
        {
          showing &&
          <View style={ styles.modal }>
            <ActivityIndicator animating={ true } size="large" color="#fa5d63" />
          </View>
        }
        <View style={ visible }>
          <Component route={ route } navigator={ navigator }/>
        </View>
        <Menu menus={ MENUS } index={ index } onSelectMenu={ this.onSelectMenu } />
      </View>
    );
  }
}

export default connect(
  ({ Progress }) => ({
    showing: Progress.showing,
  }),
  null,
)(Home);
