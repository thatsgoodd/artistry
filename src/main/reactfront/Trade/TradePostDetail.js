import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TradePostDetail = () => {
  const route = useRoute();
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Mock fetch function - replace with your actual data fetching logic
    const fetchPost = async () => {
      // Replace this with your actual fetch logic
      const fetchedPost = {
        id: '1',
        title: 'Sample Post',
        description: 'This is a sample post.',
        comments: [], // Ensure this is initialized as an array
        // other properties...
      };

      if (fetchedPost.id === postId) {
        setPost(fetchedPost);
      } else {
        // Handle case where postId does not match
        console.error('Post not found');
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.description}</Text>
        <FlatList
          data={post.comments} // Ensure post.comments is always an array
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  commentContainer: {
    paddingVertical: 5,
  },
});

export default TradePostDetail;
