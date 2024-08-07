// PostItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ post }) => {
  const navigation = useNavigation(); // useNavigation 훅 사용

  const handlePress = () => {
    // 게시물 클릭 시 상세 화면으로 이동
    navigation.navigate('PostDetail', { post });
  };

  const images = post.images || [];

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.authorProfile }} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.authorName}>{post.authorName}</Text>
        </View>
      </View>
      <Text style={styles.message}>{post.content}</Text>
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    marginBottom: 10,
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

export default PostItem;
