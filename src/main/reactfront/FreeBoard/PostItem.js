import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <Text key={index} style={styles.highlight}>{part}</Text>
    ) : (
      <Text key={index}>{part}</Text>
    )
  );
};

const PostItem = ({ title, content, uploadTime, likes, comments, searchTerm }) => (
  <View style={styles.postContainer}>
    <Text style={styles.title}>{highlightText(title, searchTerm)}</Text>
    <Text style={styles.content}>{highlightText(content, searchTerm)}</Text>
    <View style={styles.infoContainer}>
      <Text style={styles.uploadTime}>{uploadTime}</Text>
      <View style={styles.likesComments}>
        <Image source={require('../assets/images/useReactfront/thumbs-up.png')} style={{ height: 9, width: 9 }} />
        <Text style={styles.likes}>{likes}</Text>
        <Image source={require('../assets/images/useReactfront/Chat.png')} style={{ height: 9, width: 9 }} />
        <Text style={styles.comments}>{comments}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 15,
  },
  content: {
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadTime: {
    fontSize: 10,
    color: '#888',
  },
  likesComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    fontSize: 9,
    color: '#2b4872',
    marginRight: 10,
    marginLeft: 5,
  },
  comments: {
    fontSize: 9,
    color: '#2b4872',
    marginLeft: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#2b4872',
  },
});

export default PostItem;
