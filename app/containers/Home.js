import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import MapleTalk from '../components/MapleTalk';
import JobTalk from '../components/JobTalk';
import Menu from '../components/Menu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
  { icon: 'question-circle', label: '질문답변', name: 'QnA' },
  { icon: 'fire', label: '인기 게시물', name: 'popular' },
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
          showing && <View style={ styles.modal }>
              <ActivityIndicator
                animating={ true }
                style={ { height: 80 } }
                size="large"
              />
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
