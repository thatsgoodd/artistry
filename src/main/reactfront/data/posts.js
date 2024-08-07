import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import PostItem from '../postItem'; // 경로에 맞게 수정

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150?text=Image+1',
      title: 'gra 디자인 작업',
      content: '글 내용 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+1',
      authorName: 'jhonroden',
      likes: 345,
      bookmarks: 123,
      uploadTime: '1 시간 전',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '회화 작업',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'ronicollmone',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/150?text=Image+3',
      title: '무대디자인 작업물',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'howlcnmsf',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '건축디자인 작업물',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'hoesefkns',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '깔끔한 그래픽 디자인 작업',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'yeahbutty',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '6',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '모션그래픽 동영상',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'yeabgheudf',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '7',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: 'ui/ux 예시 이미지',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'galbijjim',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '8',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '초보자가 참고하기 좋은 예시 디자인들',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'bosuksuk',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '9',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '초보자가 올리는 그래픽 작업물',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'shuengnce',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
    {
      id: '10',
      image: 'https://via.placeholder.com/150?text=Image+2',
      title: '예시 이미지 1',
      content: '글 내용 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorProfile: 'https://via.placeholder.com/50?text=Author+2',
      authorName: 'gescweffg',
      likes: 678,
      bookmarks: 456,
      uploadTime: '2 시간 전',
    },
  
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <Image source={{ uri: selectedPost.authorProfile }} style={styles.profileImage} />
        <Text style={styles.authorName}>{selectedPost.authorName}</Text>
        <Text style={styles.title}>{selectedPost.title}</Text>
        <Text style={styles.content}>{selectedPost.content}</Text>
        {/* 필요한 경우 추가 이미지 표시 */}
        {/* <View style={styles.imagesContainer}>
          {selectedPost.images && selectedPost.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </View> */}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem post={item} onPress={() => handlePostClick(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    fontSize: 14,
    marginVertical: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default Posts;
