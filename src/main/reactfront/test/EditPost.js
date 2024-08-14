// EditPost.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { usePosts } from './PostContext';

const EditPost = ({ route, navigation }) => {
  const { post } = route.params;
  const { posts, setPosts } = usePosts();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, title, content } : p
    );
    setPosts(updatedPosts); // Ensure setPosts is a function
    navigation.goBack(); // 수정 완료 후 이전 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});

export default EditPost;
