import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 더미 데이터
const favoritePosts = [
  {
    image: 'https://example.com/image1.jpg',
    title: '판매 게시글 제목 1',
    description: '판매 게시글 내용 일부 1',
    author: '작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
  },
  {
    image: 'https://example.com/image2.jpg',
    title: '판매 게시글 제목 2',
    description: '판매 게시글 내용 일부 2',
    author: '작성자2',
    time: '2시간 전',
    profileImage: 'https://example.com/profile2.jpg',
  },
  // 추가 데이터...
];

const SellHistory = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2B4872" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>판매 내역</Text>
      </View>

      <FlatList
        data={favoritePosts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            ) : null}
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
              <View style={styles.profileContainer}>
                {item.profileImage ? (
                  <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                ) : null}
                <Text style={styles.postAuthor}>{item.author}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // 두 열로 나눠서 보여주기
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 16,
    marginVertical: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    height: '100%',
  },
  postImage: {
    width: '50%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  postContent: {
    width: '50%',
    paddingLeft: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  postTime: {
    fontSize: 12,
    color: '#999',
    marginVertical: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SellHistory;
