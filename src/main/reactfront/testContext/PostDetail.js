import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { usePost } from './PostContext';

const PostDetails = ({ route }) => {
  const { post } = route.params;
  const { likes, bookmarks, toggleLike, toggleBookmark } = usePost();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => toggleLike(post.id)}>
          <Text style={styles.actionText}>
            {likes[post.id] ? `❤️ ${likes[post.id]}` : '🤍 0'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleBookmark(post.id)}>
          <Text style={styles.actionText}>
            {bookmarks[post.id] ? `🔖 ${bookmarks[post.id]}` : '➕ 0'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionText: {
    marginRight: 20,
    fontSize: 18,
  },
});

export default PostDetails;
