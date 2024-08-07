// PostList.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const PostItem = ({ item }) => (
  <View style={styles.postContainer}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.detailsContainer}>
      <Image source={{ uri: item.authorProfile }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>좋아요: {item.likes}</Text>
          <Text style={styles.infoText}>북마크: {item.bookmarks}</Text>
          <Text style={styles.infoText}>{item.uploadTime}</Text>
        </View>
      </View>
    </View>
  </View>
);

const PostList = ({ posts }) => (
  <FlatList
    data={posts}
    renderItem={PostItem}
    keyExtractor={(item) => item.id}
  />
);

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3dfee',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginVertical: 5,
    color: '#555',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
  },
});

export default PostList;
