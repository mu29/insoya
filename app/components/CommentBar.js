import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Alert, Text, TextInput, TouchableHighlight, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createComment, clearMessage } from '../modules/Comment';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderTopColor: '#AAAAAA',
    borderTopWidth: 0.5,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    height: 40,
  },
  button: {
    marginRight: 12,
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA5D63',
    borderColor: '#FA5D63',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 14,
    color: '#FAFAFA',
  },
});

class CommentBar extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps({ message }) {
    if (message === '정상적으로 작성되었습니다.') {
      this.setState({ content: '' });
    } else if (message !== '') {
      Alert.alert(
        '알림',
        message,
        [{ text: '확인', onPress: this.props.clearMessage }],
      );
    }
  }

  onSubmit() {
    const { content } = this.state;
    const { id, password, referer, createComment } = this.props;
    createComment(id, password, referer, content);
  }

  render() {
    const { progress, message } = this.props;
    return (
      <KeyboardAvoidingView behavior="position">
        <View style={ styles.container }>
          <TextInput
            style={ styles.input }
            onChangeText={ (text) => this.setState({ content: text }) }
            value={ this.state.content }
            placeholder="댓글 쓰기..."
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          {
            progress &&
            <ActivityIndicator animating={ true } style={ { marginRight: 16, padding: 8 } } size="small" color="#fa5d63"/> ||
            <TouchableHighlight
              underlayColor={ 'transparent' }
              onPress={ this.onSubmit }
            >
              <View style={ styles.button }>
                <Text style={ styles.buttonText }>입력</Text>
              </View>
            </TouchableHighlight>
          }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  ({ Session, Comment }) => ({
    id: Session.id,
    password: Session.password,
    message: Comment.message,
    progress: Comment.progress,
  }),
  { createComment, clearMessage },
)(CommentBar)