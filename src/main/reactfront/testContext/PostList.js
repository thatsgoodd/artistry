import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePost } from './PostContext';

const PostList = () => {
  const navigation = useNavigation();
  const { likes, bookmarks, toggleLike, toggleBookmark } = usePost();

  const posts = [
    { id: '1', title: 'First Post', content: 'This is the content of the first post.' },
    { id: '2', title: 'Second Post', content: 'This is the content of the second post.' },
    // 더 많은 게시글 데이터 추가 가능
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Text style={styles.actionText}>
            {likes[item.id] ? `❤️ ${likes[item.id]}` : '🤍 0'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
          <Text style={styles.actionText}>
            {bookmarks[item.id] ? `🔖 ${bookmarks[item.id]}` : '➕ 0'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionText: {
    marginRight: 20,
    fontSize: 18,
  },
});

export default PostList;
