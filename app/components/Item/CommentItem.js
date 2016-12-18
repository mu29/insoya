import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    margin: 4,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#FFF',
  },
  additional: {
    marginLeft: 36,
  },
  author: {
    fontSize: 12,
    color: '#999999',
  },
  content: {
    color: '#000',
    fontSize: 14,
    marginBottom: -4,
  },
  image: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#999999',
    marginBottom: 16,
    width: undefined,
    height: 150,
  },
});

export default class CommentItem extends Component {
  render() {
    const { author, content, date, additional, images } = this.props.comment;
    return (
      <View style={ [styles.container, additional && styles.additional] }>
        {
          images && images.map((image, i) => (
            <TouchableHighlight
              key={ i }
              underlayColor={ 'transparent' }
              onPress={ () => this.props.showImage(image) }
            >
              <Image style={ styles.image } source={ { uri: image } } />
            </TouchableHighlight>
          ))
        }
        { content && <Text style={ styles.content }>{ content }</Text> }
        <Text style={ styles.author }>{ `${author} | ${date}` }</Text>
      </View>
    );
  }
}
