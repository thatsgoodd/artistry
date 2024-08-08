import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const staticLatestPosts = [
  {
    id: '1',
    profileImage: 'https://via.placeholder.com/50',
    title: '지역 협업 최신 글 제목',
    content: '이곳은 지역 협업의 최신 글 내용이 들어갑니다. 긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.',
    time: '2시간 전',
    comments: 2,
  },
];

const staticSavedPosts = [
  {
    id: '2',
    profileImage: 'https://via.placeholder.com/50',
    title: '관심 협업 제목 1',
    content: '이곳은 관심 협업의 내용이 들어갑니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.긴 글이 들어갈 수 있습니다.',
    time: '1일 전',
    comments: 2,
  },
  {
    id: '3',
    profileImage: 'https://via.placeholder.com/50',
    title: '관심 협업 제목 2',
    content: '관심 협업 내용이 여기에 들어갑니다.',
    time: '3일 전',
    comments: 7,
  },
  // 추가 포스트
];

const CollaborationPreview = ({ onPostPress }) => {
  return (
    <View style={styles.container}>
      {/* 협업 모집 제목 */}
      <Text style={styles.mainTitle}>협업 모집</Text>

      {/* 지역에 따른 최신 글 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>지역 협업</Text>
        <View style={styles.postsContainer}>
          {staticLatestPosts.length > 0 && (
            <TouchableOpacity onPress={() => onPostPress(staticLatestPosts[0].id)} style={styles.postContainer}>
              <View style={styles.profileContainer}>
                <Image source={{ uri: staticLatestPosts[0].profileImage }} style={styles.profileImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.postTitle}>{staticLatestPosts[0].title}</Text>
                  <Text style={styles.postContent} numberOfLines={2} ellipsizeMode="tail">{staticLatestPosts[0].content}</Text>
                  <Text style={styles.postTime}>{staticLatestPosts[0].time}</Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="chatbubble-outline" color="#718BAE" />
                <Text style={styles.iconText}>{staticLatestPosts[0].comments || 0}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <DottedDivider />

      {/* 자신이 스크랩한 관심 협업 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>관심 협업</Text>
        <View style={styles.postsContainer}>
          {staticSavedPosts.slice(0, 4).map((post, index) => (
            <React.Fragment key={post.id}>
              <TouchableOpacity onPress={() => onPostPress(post.id)} style={styles.postContainer}>
                <View style={styles.profileContainer}>
                  <Image source={{ uri: post.profileImage }} style={styles.profileImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postContent} numberOfLines={2} ellipsizeMode="tail">{post.content}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Ionicons name="chatbubble-outline" color="#718BAE" />
                  <Text style={styles.iconText}>{post.comments || 0}</Text>
                </View>
              </TouchableOpacity>
              {index < staticSavedPosts.slice(0, 4).length - 1 && <DottedDivider />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

const DottedDivider = () => (
  <View style={styles.dottedContainer}>
    {Array.from({ length: 60 }).map((_, index) => (
      <View key={index} style={styles.dot} />
    ))}
  </View>
);

export default CollaborationPreview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 20,
    color: "#2B4872",
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#2B4872",
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
  },
  postsContainer: {
    paddingHorizontal: 10,
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
  textContainer: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    color: '#555',
    flexShrink: 1, 
  },
  postTime: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    marginLeft: 5,
    color: '#888',
  },
  dottedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 12,
  },
  dot: {
    width: 3,
    height: 1,
    backgroundColor: '#D3DFEE',
  },
});
