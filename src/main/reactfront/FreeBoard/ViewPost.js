import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ViewPost = ({ route }) => {
  const { post } = route.params;
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const commentAuthor = {
    name: "John Doe",
    profileImage: 'https://images.unsplash.com/photo-1506748686214e9df14f24d4f27d3d2d6b71d8b7ed98f0a'
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>게시물을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length.toString(), text: newComment }]);
      setNewComment('');
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
          </View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          <View style={[styles.flexDirection, styles.spaceBetween, styles.timeLikesComments]}>
            <Text style={styles.uploadTime}>{post.uploadTime}</Text>
            <View style={styles.flexDirection}>
              <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
                {liked ? (
                  <FontAwesome name="thumbs-up" size={24} color="black" />
                ) : (
                  <Feather name="thumbs-up" size={18} color="#2b4872" />
                )}
                <Text style={{ marginLeft: 8 }}>{likes}</Text>
              </TouchableOpacity>
              <Ionicons name="chatbubble-ellipses" size={18} color="#718BAE" style={{ marginLeft: 8 }} />
              <Text style={{ marginLeft: 8 }}>{comments.length}</Text>
            </View>
          </View>
          <Text style={styles.commentsTitle}>댓글 ({comments.length})</Text>
          {comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Image source={{ uri: commentAuthor.profileImage }} style={styles.commentProfileImage} />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{commentAuthor.name}</Text>
                <Text>{comment.text}</Text>
              </View>
            </View>
          ))}
          <View style={styles.addCommentSection}>
            <TextInput
              style={styles.commentInput}
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChangeText={setNewComment}
              onSubmitEditing={handleAddComment}
              returnKeyType="send"
            />
          </View>
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
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default ViewPost;
