import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const staticTradePosts = [
  {
    id: '1',
    profileImage: 'https://via.placeholder.com/50',
    postImage: 'https://via.placeholder.com/200',
    title: '중고거래 제목 1',
    content: '이곳은 중고거래 내용이 들어갑니다.',
    location: '서울',
  },
  {
    id: '2',
    profileImage: 'https://via.placeholder.com/50',
    postImage: 'https://via.placeholder.com/200',
    title: '중고거래 제목 2',
    content: '중고거래 내용이 여기에 들어갑니다.',
    location: '부산',
  },
  // 추가 포스트
];

const TradeSection = ({title, onPostPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {staticTradePosts.slice(0, 5).map((post) => (
          <TouchableOpacity key={post.id} style={styles.postContainer} onPress={() => onPostPress(post.id)}>
            <View style={styles.outerContainer}>
            <Image source={{ uri: post.postImage }} style={styles.postImage} />
            <View style={styles.textContainer}>
              <View style={styles.header}>
                <Image source={{ uri: post.profileImage }} style={styles.profileImage} />
                <Text style={styles.postTitle}>{post.title}</Text>
              </View>
              <Text style={styles.postContent} numberOfLines={1}>{post.content}</Text>
              <Text style={styles.postLocation}>{post.location}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TradeSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    color: '#2B4872',
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 10,
  },
  scrollContainer: {
    paddingLeft: 10,
    
  },
  postContainer: {
    marginRight: 10,
    width: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',

  },
  outerContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  postImage: {
    
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
    
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
    backgroundColor: '#fff', 
    marginTop: -10, 
    zIndex: -1, 
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    color: '#555',
  },
  postLocation: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});
