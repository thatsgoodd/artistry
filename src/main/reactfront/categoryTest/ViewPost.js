// ViewPost.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usePosts } from './postContext'; // 파일 경로 조정 필요
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ViewPost = () => {
  const [posts, setPosts] = usePosts();
  const route = useRoute();
  const navigation = useNavigation();
  const { post } = route.params;

  // 게시물 좋아요 상태를 관리하는 상태 변수
  const [liked, setLiked] = useState(post.liked || false);
  const [bookmarked, setBookmarked] = useState(post.bookmarked || false);

  const handleLikeToggle = () => {
    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, liked: !liked, likes: liked ? p.likes - 1 : p.likes + 1 } : p
    );
    setPosts(updatedPosts);
    setLiked(!liked);
  };

  const handleBookmarkToggle = () => {
    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, bookmarked: !bookmarked } : p
    );
    setPosts(updatedPosts);
    setBookmarked(!bookmarked);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.uploadTime}>{post.uploadTime}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLikeToggle} style={styles.actionButton}>
          <AntDesign
            name={liked ? "like2" : "like1"}
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookmarkToggle} style={styles.actionButton}>
          <FontAwesome
            name={bookmarked ? "bookmark" : "bookmark-o"}
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  uploadTime: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    marginRight: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#2b4872',
  },
});

export default ViewPost;
