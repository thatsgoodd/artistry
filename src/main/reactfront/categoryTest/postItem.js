// PostItem.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// 검색어 하이라이트 함수
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

// PostItem 컴포넌트 정의
const PostItem = ({ title, content, uploadTime, likes, comments, searchTerm }) => (
  <View style={styles.postContainer}>
    <Text style={styles.title}>{highlightText(title, searchTerm)}</Text>
    <Text style={styles.content}>{highlightText(content, searchTerm)}</Text>
    <View style={styles.infoContainer}>
      <Text style={styles.uploadTime}>{uploadTime}</Text>
      <View style={styles.likesComments}>
      <FontAwesome name="bookmark-o" size={24} color="black" style={{ height: 9, width: 9 }}/> 
        <Text style={styles.likes}>{likes}</Text>
        <Ionicons name="chatbubble-ellipses" size={24} color="black" style={{ height: 9, width: 9 }}/>
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
