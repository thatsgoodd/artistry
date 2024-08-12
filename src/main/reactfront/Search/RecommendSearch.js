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

// 예시로 사용할 관심 분야 데이터 (이 데이터를 실제로는 API를 통해 가져와야 합니다)
const userInterests = ['nature', 'technology', 'art']; // 예시 관심 분야
const dummyPosts = [
  { id: '1', category: 'nature', photo: 'https://example.com/nature1.jpg' },
  { id: '2', category: 'technology', photo: 'https://example.com/tech1.jpg' },
  { id: '3', category: 'art', photo: 'https://example.com/art1.jpg' },
  // 더 많은 더미 데이터 추가 가능
];

// 관심 분야에 해당하는 게시물 필터링 함수
const filterPostsByInterests = (posts, interests) => {
  return posts.filter(post => interests.includes(post.category));
};

// RecommendationSearch 컴포넌트
const RecommendSearch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // API 호출 및 데이터 설정
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 실제 API 호출 예시 (주석 처리된 코드)
        // const response = await fetch('https://api.example.com/posts');
        // const data = await response.json();
        // setPosts(data);

        // 더미 데이터 사용
        setPosts(dummyPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 사용자 관심 분야에 해당하는 게시물 필터링
  const filteredPosts = filterPostsByInterests(posts, userInterests);

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
        data={filteredPosts}
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

export default RecommendSearch;
