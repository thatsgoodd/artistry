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
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const TradePostDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Mock fetch function - replace with your actual data fetching logic
    const fetchPost = async () => {
      // Replace this with your actual fetch logic
      const fetchedPost = {
        id: '1',
        title: 'Sample Post',
        description: 'This is a sample post.',
        image: 'https://example.com/sample.jpg',
        author: 'Author Name',
        comments: [
          { id: '1', text: 'Nice post!' },
          { id: '2', text: 'Thanks for sharing!' },
        ], // Example comments
      };

      if (fetchedPost.id === postId) {
        setPost(fetchedPost);
        setComments(fetchedPost.comments || []);
      } else {
        // Handle case where postId does not match
        console.error('Post not found');
      }
    };

    fetchPost();
  }, [postId]);

  const handleScrap = () => {
    Alert.alert('스크랩', '이 포스트를 스크랩했습니다.');
    // Implement actual scrap functionality
  };

  const handleChat = () => {
    navigation.navigate('ChatScreen', { postId }); // Navigate to chat screen with postId
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.postContainer}>
          {post.image ? (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          ) : null}
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
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
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
        </View>
      </ScrollView>
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

export default TradePostDetail;
