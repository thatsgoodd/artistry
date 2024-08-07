// SearchAndPostList.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import PostList from './PostList';

// 임시 데이터
const initialPosts = Array.from({ length: 10 }, (_, index) => ({
  id: String(index),
  image: `https://via.placeholder.com/150?text=Image+${index + 1}`,
  title: `글 제목 ${index + 1}`,
  content: `글 내용 ${index + 1} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  authorProfile: `https://via.placeholder.com/50?text=Author+${index + 1}`,
  authorName: `작성자 ${index + 1}`,
  likes: Math.floor(Math.random() * 1000),
  bookmarks: Math.floor(Math.random() * 500),
  uploadTime: `${index + 1} 시간 전`,
}));

const SearchAndPostList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(initialPosts);

  // 검색어에 따른 필터링
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchQuery} />
      <PostList posts={filteredPosts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchAndPostList;
