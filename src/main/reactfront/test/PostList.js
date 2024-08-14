// PostList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { usePosts } from './PostContext';

const PostList = ({ navigation }) => {
  const { posts } = usePosts();

  const handleEdit = (post) => {
    navigation.navigate('ViewPost', { post });
  };

  const handleWritePost = () => {
    navigation.navigate('WritePost');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.post}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>Uploaded at: {item.uploadTime}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleWritePost}>
        <Text style={styles.buttonText}>글 작성하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  post: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostList;
