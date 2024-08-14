import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { usePost } from './PostContext'; // 경로는 파일 위치에 따라 다를 수 있음
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const PostItem = ({ postId, title, content }) => {
  const { likedPosts, bookmarkedPosts, toggleLike, toggleBookmark } = usePost();

  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      <Text>{content}</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={() => toggleLike(postId)} style={{ marginRight: 20 }}>
          <AntDesign name="heart" size={24} color={likedPosts[postId] ? 'red' : 'gray'} />
          <Text>{likedPosts[postId] || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleBookmark(postId)}>
          <Feather name="bookmark"size={24} color={bookmarkedPosts[postId] ? 'blue' : 'gray'} />
          <Text>{bookmarkedPosts[postId] || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;
