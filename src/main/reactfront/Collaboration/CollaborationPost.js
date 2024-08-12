// src/components/PostItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CollaborationPost = ({ post }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.author}>{post.author}</Text>
      <Text style={styles.comments}>{post.comments} 댓글</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  author: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  comments: {
    fontSize: 12,
    color: '#999',
  },
});

export default CollaborationPost;