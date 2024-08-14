// ViewPost.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { usePosts } from './PostContext'; // Context import

const ViewPost = ({ route, navigation }) => {
  const { post: initialPost } = route.params;
  const { posts } = usePosts();

  // Find the post from the context based on the ID
  const post = posts.find(p => p.id === initialPost.id);

  const handleEdit = () => {
    navigation.navigate('EditPost', { post });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.content}</Text>
      <Text>Uploaded at: {post.uploadTime}</Text>
      <Button title="Edit Post" onPress={handleEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
});

export default ViewPost;
