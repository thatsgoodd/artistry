import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCommentedPosts } from './CommentedPostsContext';
import PostItem from '../FreeBoard/PostItem';
import { useNavigation } from '@react-navigation/native';

const MyCommentedPosts = () => {
  const { commentedPosts, user } = useCommentedPosts();
  const navigation = useNavigation();
  
  const handlePostPress = (post) => {
    navigation.navigate('ViewPost', { post });
  };

  const renderPostItem = ({ item }) => {
    if (!item) return null;

    // 사용자가 작성한 댓글 필터링
    const userComments = item.comments ? item.comments.filter(comment => comment.authorId === user.id):[];

    return (
      <TouchableOpacity onPress={() => handlePostPress(item)}>
        <PostItem
          title={item.title}
          content={item.content}
          uploadTime={item.uploadTime}
          likes={item.likes}
          comments={item.comments}
        />
        {/* 사용자가 작성한 댓글을 렌더링 */}
        {userComments.length > 0 && (
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>내 댓글:</Text>
            {userComments.map(comment => (
              <Text key={comment.id} style={{ marginVertical: 5 }}>
                {comment.text}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };
  console.log(commentedPosts);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>내가 댓글을 단 게시물</Text>
      <FlatList
        data={commentedPosts}
        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
        renderItem={renderPostItem}
        ListEmptyComponent={<Text>댓글을 단 게시물이 없습니다.</Text>}
      />
    </View>
  );
};

export default MyCommentedPosts;
