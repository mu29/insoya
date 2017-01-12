import React, { Component } from 'react';
import { View, Alert, TextInput, Text, TouchableHighlight, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login, logout, closeLoginAlert } from '../modules/Session';
import { showProgress } from '../modules/Progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  content: {
    textAlign: 'center',
    color: '#999999',
    marginBottom: 4,
  },
  line: {
    margin: 36,
    width: 100,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  icon: {
    color: '#FA5D63',
    marginBottom: 8,
  },
  textIcon: {
    color: '#898989',
    padding: 2,
    marginRight: 4,
    marginBottom: 8,
  },
  rightSpace: {
    marginRight: 8,
  },
  sessionWrapper: {
    flexDirection: 'column',
  },
  input: {
    padding: 2,
    fontSize: 12,
    width: 160,
    height: 20,
  },
  loginButton: {
    width: 160,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA5D63',
    borderColor: '#FA5D63',
    borderRadius: 4,
  },
  loginText: {
    fontSize: 12,
    color: '#FAFAFA',
  },
  underline: {
    marginTop: 4,
    marginBottom: 8,
    width: 160,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
});

class Info extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      password: '',
    };
  }

  componentWillReceiveProps({ message }) {
    if (message !== '') {
      Alert.alert(
        '알림',
        message,
        [{ text: '확인', onPress: this.props.closeLoginAlert }],
      );
    }
  }

  render() {
    const { id, progress, showProgress, login } = this.props;

    return (
      <View style={ styles.container }>
        {
          progress &&
          <ActivityIndicator animating={ true } style={ { marginTop: 8, padding: 8 } } size="small" color="#fa5d63"/> ||
          <Icon name="user" style={ styles.icon } size={ 36 } />
        }
        {
          id &&
          <View style={ styles.sessionWrapper }>
            <Text style={ [styles.content, { marginBottom: 8 }] }>{ id }</Text>
            <TouchableHighlight
              underlayColor={ 'transparent' }
              onPress={ this.props.logout }
            >
              <View style={ styles.loginButton }>
                <Text style={ styles.loginText }>로그아웃</Text>
              </View>
            </TouchableHighlight>
          </View> ||
          <View style={ styles.sessionWrapper }>
            <TextInput
              style={ styles.input }
              placeholder="아이디"
              onChangeText={ (text) => this.setState({ id: text }) }
              autoCorrect={false}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={ styles.underline } />
            <TextInput
              style={ styles.input }
              secureTextEntry= { true }
              placeholder="비밀번호"
              onChangeText={ (text) => this.setState({ password: text }) }
              autoCorrect={false}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <View style={ styles.underline } />
            <TouchableHighlight
              underlayColor={ 'transparent' }
              onPress={
                () => {
                  showProgress();
                  login(this.state.id, this.state.password);
                }
              }
            >
              <View style={ styles.loginButton }>
                <Text style={ styles.loginText }>로그인</Text>
              </View>
            </TouchableHighlight>
          </View>
        }
        <View style={ styles.line } />
        <Icon name="envelope" style={ styles.icon } size={ 36 } />
        <Text style={ styles.content }>적류@베라</Text>
        <Text style={ styles.content }>mu29@yeoubi.net</Text>
      </View>
    );
  }
}

export default connect(
  ({ Session, Progress }) => ({
    id: Session.id,
    message: Session.message,
    progress: Progress.showing,
  }),
  { login, logout, closeLoginAlert, showProgress },
)(Info);