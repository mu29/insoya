import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { INSOYA_HOST } from '../config';
import PostList from '../components/Post/PostList';
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
  { icon: 'bell', title: '새소식', group: 'news', url: `${INSOYA_HOST}zboard.php?id=bbs11&divpage=1`, component: PostList },
  { icon: 'comments', title: '메이플 토크', group: 'maple', url: `${INSOYA_HOST}zboard.php?id=talkmaple&divpage=18`, component: PostList },
  { icon: 'users', title: '직업별 토크', group: 'job', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=8`, component: PostList },
  { icon: 'globe', title: '월드 토크', group: 'world', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&divpage=1`, component: PostList },
  { icon: 'archive', title: '정보', component: Info },
];

class Home extends Component {
  constructor() {
    super();
    this.state = { index: 1 };
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
          <Component route={ route } navigator={ navigator } { ...MENUS[index] } />
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
