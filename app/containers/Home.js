import React, { Component } from 'react';
import MapleTalk from '../components/MapleTalk';
import JobTalk from '../components/JobTalk';
import Menu from '../components/Menu';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  component: {
    flex: 1,
  },
});

const MENUS = [
  { icon: 'comments', label: '메이플토크', component: MapleTalk },
  { icon: 'users', label: '직업별토크', component: JobTalk },
  { icon: 'question-circle', label: '질문답변', name: 'qna' },
  { icon: 'fire', label: '인기 게시물', name: 'popular' },
];

export default class Home extends Component {
  constructor() {
    super();
    this.state = { index: 0 };
    this.onSelectMenu = this.onSelectMenu.bind(this);
  }

  onSelectMenu(index) {
    this.setState({ index: index });
  }

  render() {
    const { index } = this.state;
    let Component = MENUS[index].component;

    return (
      <View style={ styles.container }>
        <Component />
        <Menu menus={ MENUS } index={ index } onSelectMenu={ this.onSelectMenu } />
      </View>
    );
  }
}