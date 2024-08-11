import React ,{useState}from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Button // 추가
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import ImageViewer from 'react-native-image-zoom-viewer';
import CommentSection from '../Comments/CommentSection';
import WorkSharingWritePost from './WorkSharingWritePost';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const PostDetail = ({ userId }) => {
  const route = useRoute();
  const { post } = route.params;
  const [isImageViewerVisible, setImageViewerVisible] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [newComment, setNewComment] = React.useState('');
  const [comments, setComments] = React.useState(post.comments || []);
  const [likes, setLikes] = React.useState(post.likes);
  const [bookmarks, setBookmarks] = React.useState(post.bookmarkCount);
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false); // 모달 상태
  const [contentModalVisible, setContentModalVisible] = useState(false);
  const navigation = useNavigation();
  const images = post.photos.map(photo => ({ url: photo }));

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setImageViewerVisible(true);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        author: {
          name: 'John Doe',
          profileImage: 'https://plus.unsplash.com/premium_photo-1668447592220-9845a3c0e768?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        text: newComment,
        likes: 0,
        dislikes: 0,
        liked: false,
        disliked: false
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
     // setModalVisible(false); // 모달 닫기
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleBookmark = () => {
    if (!bookmarked) {
      setBookmarks(bookmarks + 1);
      setBookmarked(true);
    } else {
      setBookmarks(bookmarks - 1);
      setBookmarked(false);
    }
  };

  const renderProfile = () => (
    <View style={styles.profileContainer}>
      <Image source={{ uri: post.profile }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{post.name}</Text>
        {post.userId === userId ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('WorkSharingWritePost', { postId: post.id })}
          >
            <Text style={styles.editButtonText}>수정하기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>팔로우</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* 프로필 사진, 이름, 팔로우/수정 버튼 */}
        {renderProfile()}

        {/* 이미지 및 기타 내용 */}
        <View style={styles.imageContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          {post.photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(index)}
              activeOpacity={1}
            >
              <Image source={{ uri: photo }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButtonContainer} onPress={handleLike}>
            <Feather name="thumbs-up" size={19} color="#2b4872" />
            <Text style={styles.actionCount}>{likes}</Text>
          </TouchableOpacity>
          <Text style={styles.actionName}>좋아요</Text>
          <TouchableOpacity style={styles.actionButtonContainer} onPress={handleBookmark}>
            <Feather name="bookmark" size={23} color="#2b4872" />
            <Text style={styles.actionCount}>{bookmarks}</Text>
          </TouchableOpacity>
          <Text style={styles.actionName}>스크랩</Text>
        </View>
        {/* 댓글 섹션 */}

        {/* 댓글 작성하기 버튼 */}
        <TouchableOpacity
          style={styles.addCommentButton}
          onPress={() => setModalVisible(true)} // 모달 열기
        >
          <Text style={styles.addCommentButtonText}>댓글 작성하기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 댓글 작성 모달 */}
      <CommentSection
            comments={comments}
            setComments={setComments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

      {/* 이미지 뷰어 모달 */}
      <Modal visible={isImageViewerVisible} transparent={true} onRequestClose={() => setImageViewerVisible(false)}>
        <ImageViewer imageUrls={images} index={selectedImageIndex} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  postContent: {
    fontSize: 16,
    color: '#474545',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight:'bold',
    color: '#474545',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButton: {
    backgroundColor: '#d3dfee',
    borderRadius: 4,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  followButtonText: {
    color: '#2b4872',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#d3dfee',
    borderRadius: 4,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    left:240,
    position:'absolute'
  },
  editButtonText: {
    color: '#2b4872',
    fontSize: 12,
  },
  imageContainer: {
    width: width,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 5,
    borderRadius: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20, // Padding 추가
  },
  actionButtonContainer: {
    width: 61,
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 30.5,
    borderColor: '#2b4872',
    backgroundColor: '#fff',
    elevation: 10,
  },
  actionCount: {
    position: 'absolute',
    bottom: 5,
    fontSize: 12,
    color: '#2b4872',
  },
  actionName: {
    fontSize: 10,
    color: '#2b4872',
    textAlign: 'center',
    marginTop: 5, // 버튼과 텍스트 사이에 여백 추가
    top:60,
    right:55
  },
  commentSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  commentsContainer: {
    maxHeight: 200, // 제한 높이
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
  addCommentButton: {
    backgroundColor: '#d3dfee',
    borderRadius: 4,
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  addCommentButtonText: {
    color: '#2b4872',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default PostDetail;
