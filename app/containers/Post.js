import React, { Component, PropTypes } from 'react';
import { Platform, View, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Picker from 'react-native-picker';
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
  constructor({ menus }) {
    super();
    this.state = {
      index: 0,
    };
    this.initPicker = this.initPicker.bind(this);
    this.onClickTitle = this.onClickTitle.bind(this);
  }

  componentDidMount() {
    this.initPicker(this.props.menus);
  }

  componentWillReceiveProps({ menus }) {
    this.initPicker(menus);
  }

  initPicker(menus) {
    Picker.init({
      pickerConfirmBtnText: '확인',
      pickerCancelBtnText: '취소',
      pickerTitleText: '메뉴를 선택해주세요',
      pickerConfirmBtnColor: [250, 93, 99, 1],
      pickerCancelBtnColor: [250, 93, 99, 1],
      pickerBg: [250, 250, 250, 1],
      pickerData: menus.map(m => m.title),
      selectedValue: [menus.map(m => m.title)[0]],
      onPickerConfirm: data => {
        this.setState({ index: menus.findIndex(m => m.title === data[0]) });
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {}
    });
    Picker.hide();
    this.setState({ index: 0 });
  }

  onClickTitle() {
    Picker.toggle();
  }

  render() {
    const { index } = this.state;
    const { title, menus, route, navigator } = this.props;

    return (
      <View style={ styles.container }>
        <View style={ styles.statusBar }>
          <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content"/>
        </View>
        <Header title={ title } subtitle={ menus[index].title } menus={ menus } onClick={ this.onClickTitle } />
        <PostList route={ route } navigator={ navigator } { ...menus[index] } />
      </View>
    );
  }
}
