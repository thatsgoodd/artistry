import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, SafeAreaView,
  TouchableOpacity, Modal, Keyboard
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import CommentSection from '../Comments/CommentSection';  // CommentSection 컴포넌트 가져오기
import { usePosts } from './PostContext';
import { useRoute } from '@react-navigation/native';

const ViewPost = ({navigation }) => {
  const route = useRoute();
  const { post: initialPost } = route.params; // 변수 이름을 initialPost로 변경
  const { posts, setPosts, toggleLike, addComment, deletePost } = usePosts();
  
  const post = posts.find(p => p.id === initialPost.id); // initialPost를 사용하여 post 찾기

  if (!post) {
    console.log('Post not found');
    return <Text style={styles.errorText}>Post not found</Text>;
  } else {
    console.log('Post comments:', Array.isArray(post.comments), post.comments);
  }

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.liked || false);
  const [comments, setComments] = useState(post.comments || []); // 초기 comments 설정
  const [newComment, setNewComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [contentModalVisible, setContentModalVisible] = useState(false);

  useEffect(() => {
    setLikes(post.likes);
    setLiked(post.liked || false); 
    setComments(post.comments || []); // comments 배열 설정
  }, [post]);

  const handleLikeDislike = () => {
    toggleLike(post.id); // 전역 상태의 좋아요 관리
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: (comments.length + 1).toString(),
        text: newComment,
        likes: 0,
        liked: false,
        dislikes: 0,
        disliked: false,
        author: {
          name: 'User',
          profileImage: 'https://placekitten.com/200/200',
        }
      };
      const updatedComments = [...comments, newCommentObj];
      console.log('Updated Comments:', updatedComments); // 상태 업데이트 확인
      setComments(updatedComments);
      setNewComment('');
      Keyboard.dismiss();
    }
  };

  const openContentModal = () => {
    setContentModalVisible(true);
  };

  const closeContentModal = () => {
    setContentModalVisible(false);
  };

  const handleEdit = () => {
    navigation.navigate('EditPost', { post });
  };

  const handleDelete = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    navigation.goBack(); // 삭제 후 이전 화면으로 돌아가기
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fixedHeader}>
            <View style={styles.userInfoContainer}>
              {post.profile && (
                <Image
                  source={{ uri: post.profile }}
                  style={styles.profileImage}
                  onError={(error) => console.error('이미지 로드 실패:', error)}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.profileText}>{post.name}</Text>
            </View>
            <TouchableOpacity onPress={openContentModal}>
              <Entypo name="dots-three-vertical" size={12} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.fixedTitle}>
            <Text style={styles.title}>{post.title}</Text>
          </View>

          <View style={styles.fixedContent}>
            <Text style={styles.content}>{post.content}</Text>
            {post.photo && (
              <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                <Image source={{ uri: post.photo }} style={styles.image} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.fixedFooter}>
            <Text style={styles.uploadTime}>{post.uploadTime}</Text>
            <View style={styles.actionIcons}>
              <TouchableOpacity onPress={handleLikeDislike} style={styles.iconButton}>
                {liked ? (
                  <AntDesign name="like1" size={18} color="#2b4872" />
                ) : (
                  <AntDesign name="like2" size={18} color="#2b4872" />
                )}
                <Text style={styles.iconText}>{likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                <Ionicons name="chatbubble-ellipses" size={20} color="#718BAE" />
                <Text style={styles.iconText}>{comments.length}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={imageModalVisible}
            transparent={true}
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Image source={{ uri: post.photo }} style={styles.fullScreenImage} />
            </View>
          </Modal>

          <CommentSection
            comments={comments}
            setComments={setComments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            post={post}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={contentModalVisible}
            onRequestClose={closeContentModal}
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={closeContentModal}>
              <View style={styles.contentModalView}>
                <TouchableOpacity onPress={handleEdit}>
                  <Text
                    style={[
                      styles.contentModalButtonText,
                      {
                        borderBottomWidth: 1,
                        marginTop: 8,
                        paddingBottom: 8,
                        borderColor: '#d3dfee',
                        width: 120,
                        textAlign: 'center',
                      },
                    ]}
                  >
                    수정하기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(post.id);
                    closeContentModal();
                  }}
                >
                  <Text style={styles.contentModalButtonText}>삭제하기</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333333',
  },
  fixedTitle: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    color: '#474545',
  },
  fixedContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  content: {
    fontSize: 12,
    color: '#474545',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  fixedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  uploadTime: {
    fontSize: 12,
    color: '#6a6565',
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  iconText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#6a6565',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  contentModalView: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#d3dfee'
  },
  contentModalButtonText: {
    fontSize: 16,
    color: '#2b4872',
    marginVertical: 10,
  },
  
});

export default ViewPost;
