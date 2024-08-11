import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import initialPosts from './posts'; // posts.js에서 initialPosts 데이터를 가져옵니다.
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 가져오기
import SearchContainer from '../Search/SearchContainer';

const App = () => {
  const navigation = useNavigation(); // 네비게이션 훅 사용
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState(initialPosts);

  const handleSearch = () => {
    // 검색 버튼을 눌렀을 때 posts 상태를 업데이트하여 리렌더링을 유도합니다.
    setPosts([...posts]);
  };

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
    navigation.navigate('ViewPost', { post });
  };

  return (
    <View style={styles.container}>
      <SearchContainer
        searchText={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />


      <ScrollView style={styles.postsContainer}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} onPress={() => handlePostPress(post)}>
            <View style={styles.post}>
              <Text style={styles.title}>{highlightText(post.title, searchText)}</Text>
              <Text style={styles.content}>{highlightText(post.content, searchText)}</Text>
              <View style={[styles.flexDirection, { justifyContent: 'space-between' }]}>
                <Text style={styles.uploadTime}>{post.uploadTime}</Text>
                <View style={[styles.flexDirection,{justifyContent:'center',alignItems:'center'}]}>
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
  searchInput: {
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    height: 35,
    paddingLeft: 20,
    marginLeft: 10,
    borderColor: '#d3dfee',
  },
  searchBar: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
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
    fontWeight: 'bold'
  },
  flexDirection: {
    flexDirection: 'row'
  }
});

export default App;
