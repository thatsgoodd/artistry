import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, SafeAreaView,
  TouchableOpacity, Modal, Keyboard
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import CommentSection from './CommentSection';  // Import the new component
import { useNavigation } from '@react-navigation/native';


const ViewPost = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [contentModalVisible, setContentModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false); 
  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>게시물을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const handleLikeDislike = (item, setItem, itemLikedDisliked, setItemLikedDisliked) => {
    setItem(item + (itemLikedDisliked ? -1 : 1));
    setItemLikedDisliked(!itemLikedDisliked);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, {
        id: (comments.length + 1).toString(),
        text: newComment,
        likes: 0,
        liked: false,
        dislikes: 0,
        disliked: false,
        author: {
          name: 'User',
          profileImage: 'https://placekitten.com/200/200', // Replace with dynamic profile image
        }
      }]);
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
    navigation.navigate('EditPost', {
      post,
      onSave: updatedPost => {
        // Handle the update logic here (e.g., update post in the state or API)
        console.log('Post updated:', updatedPost);
      }
    });
  };

  const handleDelete = (postId) => {
    // Handle the delete logic here (e.g., delete post from the state or API)
    console.log('Post deleted:', postId);
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
          keyboardShouldPersistTaps="handled">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {post.profile ? (
              <Image
                source={{ uri: post.profile }}
                style={styles.profileImage}
                onError={() => console.log('이미지 로드 실패')}
                resizeMode="contain"
              />
            ) : null}
            <Text style={styles.profileText}>{post.name}</Text>
            <TouchableOpacity onPress={() => setContentModalVisible(true)}>
              <Entypo name="dots-three-vertical" size={10} color="black" style={{ left: 250 }} />
            </TouchableOpacity>
          </View>
          <Modal
            animationType='fade'
            transparent={true}
            visible={contentModalVisible}
            onRequestClose={() => setContentModalVisible(!contentModalVisible)}
          >
            <TouchableOpacity style={styles.contentModalView} onPress={() => setContentModalVisible(false)}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={[styles.contentModalButtonText, { paddingBottom: 5 }]}>수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDelete(post.id);
                  closeContentModal();
                }}>
                <Text style={[styles.contentModalButtonText, styles.borderTopWidth]}>삭제하기</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          {post.photo && (
            <TouchableOpacity onPress={() => setImageModalVisible(true)}>
              <Image source={{ uri: post.photo }} style={styles.image} />
            </TouchableOpacity>
          )}
          <Modal
            visible={imageModalVisible}
            transparent={true}
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Image source={{ uri: post.photo }} style={styles.fullScreenImage} />
            </View>
          </Modal>

          <View style={[styles.flexDirection, styles.spaceBetween, styles.timeLikesComments]}>
            <Text style={styles.uploadTime}>{post.uploadTime}</Text>
            <View style={styles.flexDirection}>
              <TouchableOpacity onPress={() => handleLikeDislike(likes, setLikes, liked, setLiked)} style={styles.likeButton}>
                {liked ? (
                  <FontAwesome name="thumbs-up" size={18} color="#2b4872" />
                ) : (
                  <Feather name="thumbs-up" size={18} color="#2b4872" />
                )}
                <Text style={{ marginLeft: 8 }}>{likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.likeButton}>
                <Ionicons name="chatbubble-ellipses" size={18} color="#718BAE" style={{ marginLeft: 8 }} />
                <Text style={{ marginLeft: 8 }}>{comments.length}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.commentsContainer}>
            {comments.map(comment => (
              <View key={comment.id} style={styles.comment}>
                <Image source={{ uri: comment.author.profileImage }} style={styles.commentProfileImage} />
                <View style={styles.commentContent}>
                  <Text style={styles.commentAuthor}>{comment.author.name}</Text>
                  <Text>{comment.text}</Text>
                  <View style={styles.flexDirection}>
                    <TouchableOpacity onPress={() => handleLikeDislike(comment.likes, (newLikes) => {
                      const newComments = [...comments];
                      const index = newComments.findIndex(c => c.id === comment.id);
                      newComments[index].likes = newLikes;
                      setComments(newComments);
                    }, comment.liked, (newLiked) => {
                      const newComments = [...comments];
                      const index = newComments.findIndex(c => c.id === comment.id);
                      newComments[index].liked = newLiked;
                      setComments(newComments);
                    })} style={styles.likeButton}>
                      {comment.liked ? (
                        <Entypo name="thumbs-up" size={12} color="#2b4872" />
                      ) : (
                        <Feather name="thumbs-up" size={12} color="#2b4872" />
                      )}
                      <Text style={{ marginLeft: 10, marginRight: 15 }}>{comment.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLikeDislike(comment.dislikes, (newDislikes) => {
                      const newComments = [...comments];
                      const index = newComments.findIndex(c => c.id === comment.id);
                      newComments[index].dislikes = newDislikes;
                      setComments(newComments);
                    }, comment.disliked, (newDisliked) => {
                      const newComments = [...comments];
                      const index = newComments.findIndex(c => c.id === comment.id);
                      newComments[index].disliked = newDisliked;
                      setComments(newComments);
                    })} style={styles.likeButton}>
                      {comment.disliked ? (
                        <Entypo name="thumbs-down" size={12} color="#2b4872" />
                      ) : (
                        <Feather name="thumbs-down" size={12} color="#2b4872" />
                      )}
                      <Text style={{ marginHorizontal: 10 }}>{comment.dislikes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
        {/* CommentSection modal */}
        <CommentSection
          comments={comments}
          setComments={setComments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

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
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profileText: {
    fontSize: 20,
    marginLeft: 10,
    bottom: 10,
  },
  timeLikesComments: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  uploadTime: {
    fontSize: 10,
    color: '#6a6565',
    marginBottom: 20,
  },
  profileImage: {
    width: 49,
    height: 49,
    marginBottom: 20,
    borderRadius: 30,
  },
  content: {
    fontSize: 12,
    color: '#474545',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  contentModalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3dfee',
    width: 163,
    height: 78,
    top: 120,
    left: 220,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  borderTopWidth: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderColor: '#d3dfee',
    width: 130
  },
  contentModalButtonText: {
    fontSize: 16,
    color: '#2b4872',
    textAlign: 'center'
  },
});

export default ViewPost;
