import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

// 임시 데이터
const categories = [
  { id: '1', name: '건축', image: 'https://images.unsplash.com/photo-1661856182999-267be6e4a698?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '2', name: '그래픽디자인', image: 'https://images.unsplash.com/photo-1635939412822-8f3ee593d147?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '3', name: '회화', image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '4', name: '조각', image: 'https://images.unsplash.com/photo-1541618016834-667715db6e8d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '5', name: '판화', image: 'https://images.unsplash.com/photo-1713117222867-df4f430ee979?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '6', name: '드로잉', image: 'https://plus.unsplash.com/premium_photo-1673514503544-1b8c10dd8019?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '7', name: '사진', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '8', name: '비디오아트', image: 'https://plus.unsplash.com/premium_photo-1673356713438-c32280e68669?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '9', name: '산업디자인', image: 'https://images.unsplash.com/photo-1614528770565-79a97bf632ff?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' }
];

const posts = [
  {
    id: '1',
    categoryId: '1',
    title: '건축 프로젝트 A',
    name: '홍길동',
    content: '이 프로젝트는 현대 건축의 혁신적인 접근 방식을 다루고 있습니다.',
    photos: [
      'https://plus.unsplash.com/premium_photo-1661954525357-c4b79d333720?q=80&w=771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1556594472-e9b933db923c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1571843439991-dd2b8e051966?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://example.com/artist-profile.jpg',
    bookmarkCount: 15,
    likes: 30,
  },
  {
    id: '2',
    categoryId: '2',
    title: '그래픽 디자인 B',
    name: '김철수',
    content: '이 디자인 프로젝트는 최신 그래픽 디자인 트렌드를 반영하고 있습니다.',
    photos: [
      'https://images.unsplash.com/photo-1626654386409-180d8880fca5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1652804961521-c9fbc7a3f0f1?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://example.com/designer-profile.jpg',
    bookmarkCount: 10,
    likes: 25,
  },
  {
    id: '3',
    categoryId: '3',
    title: '회화 작품 C',
    name: '이영희',
    content: '이 작품은 전통 회화 기법과 현대적 감각을 융합한 작품입니다.',
    photos: [
      'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1491245338813-c6832976196e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1609189184127-04652523de91?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://example.com/artist-profile-c.jpg',
    bookmarkCount: 20,
    likes: 40,
  },
  // 추가 게시물...
];

const ArtBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // 게시물 필터링 함수
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categoryId === selectedCategory)
    : posts;

  // 새로고침 기능
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      // 실제로는 데이터를 새로고침하는 로직이 들어가야 함
      setRefreshing(false);
    }, 2000);
  }, []);

  // 카테고리 항목 컴포넌트
  const CategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={[styles.categoryImage,
        { tintColor: selectedCategory === item.id ? '#718bae' : null }
        ]}
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // 게시물 항목 컴포넌트
  const PostItem = ({ item }) => (
    <View style={styles.postContainer}>

      <View style={styles.postContent}>

        <View style={styles.photosContainer}>
          {item.photos.length > 0 && (
            <Image source={{ uri: item.photos[0] }} style={styles.mainPhoto} />
          )}
          {item.photos.length > 1 && (
            <View style={styles.additionalPhotosContainer}>
              {item.photos.length === 2 ? (
                <Image source={{ uri: item.photos[1] }} style={styles.additionalPhoto} />
              ) : (
                <View style={styles.additionalPhotosRow}>
                  <Image source={{ uri: item.photos[1] }} style={styles.additionalPhotoHalf} />
                  {item.photos.length > 2 && (
                    <Image source={{ uri: item.photos[2] }} style={styles.additionalPhotoQuarter} />
                  )}
                  {item.photos.length > 3 && (
                    <View style={styles.morePhotosOverlay}>
                      <Text style={styles.morePhotosText}>+{item.photos.length - 2}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: item.profile }} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>{item.name}</Text>
              <Text style={styles.message}>
              {item.content.length > 20 ? item.content.slice(0, 20) : item.content}
                </Text>
            </View>
          </View>
        
        <View style={styles.statsContainer}>

          <Feather name="bookmark" size={16} color="#2b4872" />
          <Text style={styles.bookmarkLikes}>{item.bookmarkCount}</Text>
          <Feather name="thumbs-up" size={16} color="#2b4872"
            style={{ marginLeft: 10 }} />
          <Text style={styles.bookmarkLikes}>{item.likes}</Text>
        </View>
      </View>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header and category selection */}
      <View style={styles.headerContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollContainer}
        >
          <FlatList
            data={categories}
            renderItem={CategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>

      {/* Selected category and post list */}
      <View style={styles.selectedCategoryContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.selectedCategoryText}>
            {selectedCategory ? categories.find(c => c.id === selectedCategory).name : '모든 게시물'}
          </Text>
          <TouchableOpacity
            style={styles.writeButton}
            onPress={() => console.log('게시물 작성하기')}
          >
            <Text style={styles.writeButtonText}>작성하기</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredPosts}
          renderItem={PostItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#009688']}
              tintColor="#009688"
            />
          }
          style={styles.postList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryScrollContainer: {
    flexDirection: 'row',
  },
  categoryContainer: {
    marginRight: 16,
    width: 134,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  categoryName: {
    color: '#ffffff',
    fontSize: 13,
  },
  selectedCategoryContainer: {
    flex: 1,
    padding: 16,
  },
  selectedCategoryText: {
    fontSize: 16,
    color: '#2b4872',
    marginBottom: 16,
  },
  writeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: 96,
    height: 27,
    borderWidth: 1,
    borderColor: '#718bae',
  },
  writeButtonText: {
    color: '#2b4872',
    fontSize: 13,
  },
  postList: {
    flex: 1,
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  profileImage: {
    width: 29,
    height: 29,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  postContent: {
    padding: 8,
  },
  message: {
    fontSize: 10,
    marginBottom: 8,
  },
  photosContainer: {
    flexDirection: 'row',
    marginTop: 8,
    height: 312,
    width: 420
    //borderRadius:8
  },
  mainPhoto: {
    width: '60%',
    height: 242,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 5
  },
  additionalPhotosContainer: {
    width: '40%',
  },
  additionalPhotosRow: {
    // flexDirection: 'row',
    height: 200,
  },
  additionalPhotoHalf: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  additionalPhotoQuarter: {
    width: 139,
    height: 119,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  morePhotosOverlay: {
    position: 'absolute',
    width: 139,
    height: 119,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    top: 0,
    left: 0,
  },
  morePhotosText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position:'absolute',
    left:280,
    top:10
  },
  bookmarkLikes: {
    color: '#2b4872',
    fontSize: 10
  }
});

export default ArtBoard;
