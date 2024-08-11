import React from 'react';
import {
  View, Text, Image, TextInput, StyleSheet,
  ScrollView, TouchableOpacity, Modal, SafeAreaView,
  KeyboardAvoidingView, Platform
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useCommentedPosts } from './CommentedPostsContext';

const CommentSection = ({
  comments, setComments, newComment, setNewComment,
  handleAddComment, modalVisible, setModalVisible, post
}) => {
  const commentAuthor = {
    name: "John Doe",
    profileImage: 'https://plus.unsplash.com/premium_photo-1668447592220-9845a3c0e768?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const { addCommentedPost } = useCommentedPosts();

  const handleLikeDislike = (comment, setComment, isLiked, setIsLiked) => {
    setComment({
      ...comment,
      likes: comment.likes + (isLiked ? -1 : 1),
      liked: !isLiked
    });
    setIsLiked(!isLiked);
  };

  const handleAddCommentAndTrack = () => {
    handleAddComment();
    addCommentedPost(post); // 댓글을 추가할 때 게시물을 추적
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>댓글 {comments.length}</Text>
            <View style={{ width: 24 }} />
          </View>
          <KeyboardAvoidingView
            style={styles.modalContent}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <ScrollView contentContainerStyle={styles.commentsContainer}>
              {comments.map(comment => (
                <View key={comment.id} style={styles.comment}>
                  <Image source={{ uri: comment.author.profileImage }} style={styles.commentProfileImage} />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{comment.author.name}</Text>
                    <Text>{comment.text}</Text>
                    <View style={styles.flexDirection}>
                      <TouchableOpacity onPress={() => handleLikeDislike(comment, setComments, comment.liked, (newLiked) => {
                        const newComments = comments.map(c => c.id === comment.id ? { ...c, liked: newLiked, likes: c.likes + (newLiked ? 1 : -1) } : c);
                        setComments(newComments);
                      })} style={styles.likeButton}>
                        {comment.liked ? (
                          <Entypo name="thumbs-up" size={12} color="#2b4872" />
                        ) : (
                          <Feather name="thumbs-up" size={12} color="#2b4872" />
                        )}
                        <Text style={{ marginLeft: 10, marginRight: 15 }}>{comment.likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleLikeDislike(comment, setComments, comment.disliked, (newDisliked) => {
                        const newComments = comments.map(c => c.id === comment.id ? { ...c, disliked: newDisliked, dislikes: c.dislikes + (newDisliked ? 1 : -1) } : c);
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
            </ScrollView>
            <View style={styles.addCommentSection}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: commentAuthor.profileImage }} style={styles.commentProfileImage} />
                <TextInput
                  style={styles.commentInput}
                  placeholder="댓글 작성하기"
                  value={newComment}
                  onChangeText={setNewComment}
                  onSubmitEditing={handleAddCommentAndTrack} // 댓글 작성 시 추가된 함수 호출
                  returnKeyType="send"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  addCommentSection: {
    padding: 10,
    backgroundColor: '#fff',
  },
  commentsTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: '#2b4872',
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomColor: '#ccc',
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginRight: 10,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
  },
  commentsContainer: {
    padding: 20,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CommentSection;
