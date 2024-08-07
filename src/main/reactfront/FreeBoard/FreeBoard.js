import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { usePosts } from './PostContext'; // 파일 경로 조정 필요
import PostItem from './PostItem'; // 파일 경로 조정 필요
import initialPosts from './posts';
import { useNavigation } from '@react-navigation/native';

const FreeBoard = () => {
  const [posts, setPosts] = usePosts();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(initialPosts);
    }
  }, [posts, setPosts]);

  // 현재 뜨는 글 필터링
  const currentPosts = posts.filter(post => post.likes >= 10);

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

  return (
    <View style={styles.container}>
      <View style={[styles.flexDirection, {
        paddingHorizontal: 16,
        justifyContent: 'space-between'
      }]}>
        <Text style={styles.headerTitle}>지금 뜨는 글</Text>
        <TouchableOpacity
          style={styles.writeButton}
          onPress={() => navigation.navigate('WritePost', { setPosts })}
        >
          <Text style={styles.writeButtonText}>작성하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.currentPostsHeader}>
        <FlatList
          data={currentPosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.currentPostsList}
          scrollEnabled={false}
          ItemSeparatorComponent={<View style={{ height: 10 }} />}
        />
      </View>
      <View style={styles.overlay}>
          <Text> </Text>
        
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View style={{ height: 5 }} />}
      />
    </View>
  );
};

export default FreeBoard;

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
  }, overlay: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    elevation: 10,
    shadowOffset: { height: 5, width: 0 },
  },
  writeButtonText: {
    color: '#2b4872',
    fontSize: 12,
  },
  currentPostsHeader: {
    marginTop: 16,
    height: 200,
    zIndex: 2,
    top: 5,
  },
  headerTitle: {
    fontSize: 15,
    marginBottom: 8,
    color: '#2b4872',
    marginTop: 10,
  },
  currentPostsList: {
    marginBottom: 16,
  },
  flexDirection: {
    flexDirection: 'row',
  },
});
