import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // 올바른 패키지에서 Picker를 가져옵니다.
import { usePosts } from './postContext'; // 파일 경로 조정 필요
import PostItem from './postItem'; // 파일 경로 조정 필요
import initialPosts from './posts'; // 예시 초기 게시물 데이터
import { useNavigation } from '@react-navigation/native';

const categories = ['만화', '영화', '사진', '드라마'];

const FreeBoard = () => {
  const [posts, setPosts] = usePosts();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(initialPosts);
    }
  }, [posts, setPosts]);

  const filteredPosts = posts.filter(post => post.category === selectedCategory);

  const handlePostPress = (post) => {
    navigation.navigate('ViewPost', { post });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)}>
      <PostItem
        title={item.title}
        content={item.content}
        uploadTime={item.uploadTime}
        likes={item.likes}
        comments={item.comments}
      />
    </TouchableOpacity>
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(prevPosts => [...prevPosts, ...initialPosts]); // 예시: 초기 게시물 추가
      setRefreshing(false);
    }, 2000);
  }, [setPosts]);

  return (
    <View style={styles.container}>
      <View style={[styles.flexDirection, { paddingHorizontal: 16, justifyContent: 'space-between' }]}>
        <Text style={styles.headerTitle}>지금 뜨는 글</Text>
        <TouchableOpacity
          style={styles.writeButton}
          onPress={() => navigation.navigate('WritePost', { setPosts })}
        >
          <Text style={styles.writeButtonText}>작성하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryPickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#009688']}
            tintColor="#009688"
          />
        }
        ItemSeparatorComponent={<View style={{ height: 5 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  writeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    alignItems: 'center',
    width: 96,
    height: 31,
    borderColor: '#d3dfee',
    borderWidth: 1,
    justifyContent: 'center',
  },
  writeButtonText: {
    color: '#2b4872',
    fontSize: 12,
  },
  categoryPickerContainer: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  headerTitle: {
    fontSize: 15,
    marginBottom: 8,
    color: '#2b4872',
    marginTop: 10,
  },
  flexDirection: {
    flexDirection: 'row',
  },
});

export default FreeBoard;
