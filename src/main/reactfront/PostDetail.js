// PostDetail.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PostDetail = () => {
  const route = useRoute();
  const { post } = route.params || {};

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>게시물이 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.authorProfile }} style={styles.profileImage} />
      <Text style={styles.authorName}>{post.authorName}</Text>
      <Text style={styles.message}>{post.content}</Text>
      {post.images && post.images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default PostDetail;
