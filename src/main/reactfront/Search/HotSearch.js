import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';

// 사용할 화면 크기
const { width } = Dimensions.get('window');

// 더미 데이터 예시 (실제로는 API에서 가져와야 함)
const dummyPosts = [
  { id: '1', photo: 'https://example.com/photo1.jpg', views: 5000 },
  { id: '2', photo: 'https://example.com/photo2.jpg', views: 10000 },
  { id: '3', photo: 'https://example.com/photo3.jpg', views: 7500 },
  // 더 많은 더미 데이터 추가 가능
];

// 조회수 기준으로 게시물 정렬 함수
const sortPostsByViews = (posts) => {
  return posts.sort((a, b) => b.views - a.views);
};

// HotSearch 컴포넌트
const HotSearch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // API 호출 및 데이터 설정
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 실제 API 호출 예시 (주석 처리된 코드)
        // const response = await fetch('https://api.example.com/posts');
        // const data = await response.json();
        // setPosts(sortPostsByViews(data));

        // 더미 데이터 사용
        setPosts(sortPostsByViews(dummyPosts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
        )}
        numColumns={2} // 2열로 구성된 그리드 레이아웃
      />
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: width / 2 - 15, // 2열의 경우, 화면 너비를 2로 나눈 값에서 간격을 빼줍니다.
    height: 150, // 고정된 높이
    borderRadius: 10,
  },
});

export default HotSearch;
