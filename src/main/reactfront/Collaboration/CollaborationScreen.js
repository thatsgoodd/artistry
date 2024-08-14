import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingWritingButton from '../components/FloatingWritingButton';
import FloatingLocationButton from '../components/FloatingLocationButton';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';

// 초기 데이터 (임시)
const initialPostsData = [
  {
    id: '1',
    image: 'https://example.com/image1.jpg',
    title: '협업 제목 1',
    description: '협업 내용 일부 1',
    author: '작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
    location: '서울',
    category: '디자인',
    likes: 10,
    comments: 5,  // 댓글 수
    isScrapped: false,
  },
  {
    id: '2',
    image: 'https://example.com/image2.jpg',
    title: '협업 제목 2',
    description: '협업 내용 일부 2',
    author: '작성자2',
    time: '2시간 전',
    profileImage: 'https://example.com/profile2.jpg',
    location: '부산',
    category: '개발',
    likes: 5,
    comments: 2,  // 댓글 수
    isScrapped: true,
  },
  // 더 많은 데이터...
];

const CollaborationScreen = () => {
  const [postsData, setPostsData] = useState(initialPostsData);
  const [selectedTab, setSelectedTab] = useState('location');
  const [value, setValue] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState(null); // 카테고리 필터링

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused) {
      const selectedLocation = route.params?.selectedLocation || '전체';
      setValue(selectedLocation);
    }
  }, [isFocused, route.params]);

  const handlePressAddPost = () => {
    navigation.navigate('AddCollaborationPost');
  };

  const handleLocation = () => {
    navigation.navigate('SetCollaborationLocation');
  };

  const handlePostPress = (postId) => {
    console.log('Pressed Post ID:', postId); // 로그 추가
    const post = postsData.find(post => post.id === postId);
    if (post) {
      navigation.navigate('CollaborationPostDetail', { postId });
    } else {
      Alert.alert('오류', '게시글을 찾을 수 없습니다.');
    }
  };

  const filterPosts = (selectedTab, filterValue) => {
    if (selectedTab === 'location') {
      if (filterValue === '전체') {
        return postsData;
      } else {
        return postsData.filter(post => post.location === filterValue);
      }
    }
  
    if (selectedTab === 'interest') {
      if (selectedCategory) {
        return postsData.filter(post => post.category === selectedCategory);
      }
      return postsData;
    }
  
    if (selectedTab === 'popular') {
      return [...postsData].sort((a, b) => b.comments - a.comments);
    }
  
    if (selectedTab === 'scrap') {
      return postsData.filter(post => post.isScrapped);
    }
  
    return postsData;
  };

  const renderContent = () => {
    const filteredPosts = filterPosts(selectedTab, value);
    console.log('Filtered Posts:', filteredPosts);
  
    const renderPostItem = ({ item }) => (
      <TouchableOpacity style={styles.postContainer} onPress={() => handlePostPress(item.id)}>
        {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDescription}>{item.description}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
          <View style={styles.profileContainer}>
            {item.profileImage && <Image source={{ uri: item.profileImage }} style={styles.profileImage} />}
            <Text style={styles.postAuthor}>{item.author}</Text>
          </View>
          <View style={styles.metaInfoContainer}>
            <TouchableOpacity onPress={() => toggleScrap(item.id)}>
              <Ionicons name={item.isScrapped ? 'bookmark' : 'bookmark-outline'} size={15} color="#2B4872" />
            </TouchableOpacity>
            <Text style={styles.commentsCount}>댓글 {item.comments}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>협업 모집</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CollaborationSearch')}>
                  <Ionicons name="search-outline" size={24} color="#2B4872" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CollaborationChat')}>
                  <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2B4872" />
                </TouchableOpacity>
              </View>
            </View>
  
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'location' && styles.tabButtonSelected]}
                onPress={() => setSelectedTab('location')}
              >
                <Text style={styles.tabButtonText}>지역별</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'interest' && styles.tabButtonSelected]}
                onPress={() => setSelectedTab('interest')}
              >
                <Text style={styles.tabButtonText}>분야별</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'popular' && styles.tabButtonSelected]}
                onPress={() => setSelectedTab('popular')}
              >
                <Text style={styles.tabButtonText}>인기 협업</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'scrap' && styles.tabButtonSelected]}
                onPress={() => setSelectedTab('scrap')}
              >
                <Text style={styles.tabButtonText}>스크랩</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
      <FloatingWritingButton onPress={handlePressAddPost} />
      <FloatingLocationButton onPress={handleLocation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  iconButton: {
    marginLeft: 15,
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDescription: {
    color: '#555',
  },
  postTime: {
    color: '#888',
    fontSize: 12,
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  metaInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentsCount: {
    color: '#555',
    fontSize: 12,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    paddingVertical: 10,
    width: '25%',
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#2B4872',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#2B4872',
  },
});

export default CollaborationScreen;
