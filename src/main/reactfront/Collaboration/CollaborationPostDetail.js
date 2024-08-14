import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const CollaborationPostDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setPost(null); // 상태 초기화
      const fetchedPost = {
        id: '1',
        title: 'Sample Post',
        description: 'This is a sample post.',
        image: 'https://example.com/sample.jpg',
        author: 'Author Name',
        comments: [
          { id: '1', text: 'Nice post!' },
          { id: '2', text: 'Thanks for sharing!' },
        ],
      };
  
      if (String(fetchedPost.id) === String(postId)) {
        setPost(fetchedPost);
        setComments(fetchedPost.comments || []);
      } else {
        console.error('Post not found');
      }
    };
    
    fetchPost();
  }, [postId]);

  const handleScrap = () => {
    Alert.alert('스크랩', '이 포스트를 스크랩했습니다.');
  };

  const handleChat = () => {
    navigation.navigate('ChatScreen', { postId });
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { id: Date.now().toString(), text: comment }]);
      setComment('');
    }
  };

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.postContainer}>
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={handleScrap}>
                <Ionicons name="bookmark-outline" size={24} color="#2B4872" />
                <Text style={styles.actionText}>스크랩</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
                <Ionicons name="chatbubble-outline" size={24} color="#2B4872" />
                <Text style={styles.actionText}>채팅</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              placeholder="댓글을 입력하세요"
            />
            <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
              <Text style={styles.commentButtonText}>전송</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#2B4872',
  },
  commentContainer: {
    paddingVertical: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  commentButton: {
    backgroundColor: '#2B4872',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CollaborationPostDetail;
