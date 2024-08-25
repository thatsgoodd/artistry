import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { usePosts } from './PostContext'; // PostContext 가져오기
import SearchContainer from '../Search/SearchContainer';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const { posts } = usePosts(); // PostContext에서 게시물 가져오기
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const navigation = useNavigation();
  // 검색어 또는 게시물 목록이 변경될 때 필터링
  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.content.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered); // 필터링된 결과로 상태 업데이트
  }, [searchText, posts]); // searchText 또는 posts가 변경될 때마다 실행

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlight}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  const handlePostPress = (post) => {
    console.log('Navigating to ViewPost with post:', post);
    navigation.navigate('ViewPost', { post });
  };

  return (
    <View style={styles.container}>
      <SearchContainer
        searchText={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => {}} // 검색 버튼 처리
      />

      <ScrollView style={styles.postsContainer}>
        {filteredPosts.map((post) => (
          <TouchableOpacity key={post.id} onPress={() => handlePostPress(post)}>
            <View style={styles.post}>
              <Text style={styles.title}>{highlightText(post.title, searchText)}</Text>
              <Text style={styles.content}>{highlightText(post.content, searchText)}</Text>
              <View style={[styles.flexDirection, { justifyContent: 'space-between' }]}>
                <Text style={styles.uploadTime}>{post.uploadTime}</Text>
                <View style={[styles.flexDirection, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Image source={require('../assets/images/useReactfront/thumbs-up.png')} style={styles.likeImage} />
                  <Text style={styles.likes}>{post.likes}</Text>
                  <Image source={require('../assets/images/useReactfront/Chat.png')} style={{ height: 9, width: 9, marginHorizontal: 5 }} />
                  <Text style={styles.comments}>{post.comments}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  postsContainer: {
    marginTop: 10,
  },
  post: {
    padding: 15,
    borderColor: '#d3dfee',
    borderBottomWidth: 1,
    borderStyle: 'dotted'
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
  uploadTime: {
    fontSize: 10,
    color: '#6a6565',
  },
  likes: {
    fontSize: 10,
    color: '#2b4872',
  },
  likeImage: {
    height: 9,
    width: 9,
    marginRight: 5,
  },
  comments: {
    fontSize: 10,
    color: '#2b4872',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#000000', // 강조된 텍스트 색상 설정
  },
  flexDirection: {
    flexDirection: 'row'
  }
});

export default App;
