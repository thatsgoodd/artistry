import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
import { useWorkSharingPosts } from './WorkSharingContext';
import { Ionicons } from '@expo/vector-icons';

// 카테고리 데이터
const categories = [
  { id: '건축', name: '건축', image: 'https://images.unsplash.com/photo-1661856182999-267be6e4a698?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '그래픽디자인', name: '그래픽 디자인', image: 'https://images.unsplash.com/photo-1635939412822-8f3ee593d147?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '회화', name: '회화', image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '조각', name: '조각', image: 'https://images.unsplash.com/photo-1541618016834-667715db6e8d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '판화', name: '판화', image: 'https://images.unsplash.com/photo-1713117222867-df4f430ee979?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '드로잉', name: '드로잉', image: 'https://plus.unsplash.com/premium_photo-1673514503544-1b8c10dd8019?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '사진', name: '사진', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '비디오아트', name: '비디오아트', image: 'https://plus.unsplash.com/premium_photo-1673356713438-c32280e68669?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '산업디자인', name: '산업디자인', image: 'https://images.unsplash.com/photo-1614528770565-79a97bf632ff?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D' }
];

const WorkSharingScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { posts } = useWorkSharingPosts(); // 게시물 데이터 가져오기

  if (!Array.isArray(posts)) {
    return <Text>Loading...</Text>; // posts가 배열이 아니면 로딩 상태를 표시
  }
  
  // 카테고리에 따라 게시물 필터링
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categoryId === selectedCategory)
    : posts;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const CategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          styles.categoryImage,
          { tintColor: selectedCategory === item.id ? '#718bae' : null }
        ]}
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const PostItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <View style={styles.postContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.photos[0] }} style={styles.mainImage} />
          <View style={styles.subImagesContainer}>
            <Image source={{ uri: item.photos[1] }} style={styles.subImage} />
            <View style={styles.thirdImageWrapper}>
              <Image source={{ uri: item.photos[2] }} style={styles.subImage} />
              {item.photos.length > 3 && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>+{item.photos.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="bookmark" size={16} color="#2b4872" />
              <Text style={styles.bookmarkLikes}>{item.bookmarkCount}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="thumbs-up" size={16} color="#2b4872" style={{ marginLeft: 15, marginRight: 5 }} />
              <Text style={styles.bookmarkLikes}>{item.likes}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#009688']}
            tintColor="#009688"
          />
        }
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>작업 공유</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notice')}>
              <Ionicons name="notifications-outline" size={24} color="#2B4872" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search-outline" size={24} color="#2B4872" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="menu-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            data={categories}
            renderItem={CategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContainer}
          />
          <View style={styles.contentWriteButton}>
            <Text style={styles.selectedCategoryText}>
              {selectedCategory ? categories.find(c => c.id === selectedCategory).name : '모든 게시물'}
            </Text>
            <TouchableOpacity
              style={styles.writeButton}
              onPress={() => navigation.navigate('WorkSharingWritePost')}
            >
              <Text style={styles.writeButtonText}>작성하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostItem key={post.id} item={post} />
          ))
        ) : (
          <Text style={styles.noPostsText}>게시물이 없습니다.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
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
  categoryScrollContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginRight: 16,
    width: 134,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
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
  selectedCategoryText: {
    fontSize: 16,
    color: '#2b4872',
    marginBottom: 16,
  },
  contentWriteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  writeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
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
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    width: Dimensions.get('window').width,
    height: 320,
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
  statsContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 310,
    top: 15,
  },
  bookmarkLikes: {
    color: '#2b4872',
    fontSize: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 242,
  },
  mainImage: {
    width: '60%',
    height: '100%',
    marginRight: 5,
    borderRadius: 10,
  },
  subImagesContainer: {
    width: '35%',
    justifyContent: 'space-between',
  },
  subImage: {
    width: '100%',
    height: '49%',
    marginBottom: 5,
    paddingLeft: 5,
    borderRadius: 10,
  },
  thirdImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '49%',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 1,
  },
  overlayText: {
    color: '#fff',
    fontSize: 13,
  },
  noPostsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#2b4872',
  },
});

export default WorkSharingScreen;
