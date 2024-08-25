import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Modal, ScrollView, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ionicons를 추가
import { useWorkSharingPosts } from '../WorkSharing/WorkSharingContext';  // 기존 게시글 관리 훅
import { usePhotoPicker } from '../PhotoPicker'; // 사진 선택 훅

const AddTradePost = ({ route, navigation }) => {
  const { posts, setPosts } = useWorkSharingPosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [location, setLocation] = useState(''); // 지역 상태 추가

  const { handleCameraLaunch, handleImageLibraryLaunch } = usePhotoPicker((uri) => {
    setImageUrls([...imageUrls, uri]);
  });

  const { postId } = route.params || {}; // route.params에서 postId를 받아옴
  const isEditMode = !!postId; // postId가 있으면 수정 모드로 간주

  useEffect(() => {
    if (isEditMode) {
      const postToEdit = posts.find(post => post.id === postId);
      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setImageUrls(postToEdit.photos);
        setLocation(postToEdit.location || ''); // 지역 정보가 있으면 설정
      }
    }
  }, [isEditMode, postId, posts]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertModalVisible(true);
    setTimeout(() => {
      setAlertModalVisible(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!title || !content) {
      showAlert('모든 필드를 입력해주세요.');
      return;
    }
    if (imageUrls.length === 0) {
      showAlert('한 장 이상의 사진을 업로드 해주세요.');
      return;
    }

    const newPost = {
      id: isEditMode ? postId : (posts.length + 1).toString(),
      title,
      content,
      photos: imageUrls,
      profile: 'https://example.com/default-profile.png',
      name: '작성자 이름',
      bookmarkCount: 0,
      likes: 0,
      location, // 지역 정보 추가
    };

    setPosts(prevPosts => {
      if (isEditMode) {
        return prevPosts.map(post => post.id === postId ? newPost : post);
      } else {
        return [...prevPosts, newPost];
      }
    });

    navigation.goBack();
  };

  const handleRemoveImage = (uri) => {
    setImageUrls(imageUrls.filter(image => image !== uri));
  };

  const handleLocationPress = () => {
    navigation.navigate('SetTradePostLocation', { setLocation }); // 지역 선택 화면으로 이동
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>중고 거래</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('TradeSearch')}>
              <Ionicons name="search-outline" size={24} color="#2B4872" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('TradeChat')}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2B4872" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, { marginBottom: 12 }]}
            placeholder="내용을 입력하세요"
            multiline
            value={content}
            onChangeText={setContent}
          />

          <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
            <Text style={styles.locationText}>{location || '지역을 선택하세요'}</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TouchableOpacity style={styles.photoButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.photoButtonText}>사진</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {imageUrls.length > 0 && (
                <Image source={{ uri: imageUrls[0] }} style={styles.image} />
              )}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{isEditMode ? '수정' : '등록'}</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleCameraLaunch}>
                    <Text style={styles.modalButtonText}>카메라로 촬영하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleImageLibraryLaunch}>
                    <Text style={styles.modalButtonText}>앨범에서 선택하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  iconButton: {
    marginLeft: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d3dfee',
    borderRadius: 8,
    color: '#474545',
  },
  photoButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 59,
    height: 31,
    borderColor: '#d3dfee',
    borderWidth: 1,
  },
  photoButtonText: {
    fontSize: 15,
    color: '#2b4872',
  },
  submitButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 59,
    height: 31,
    borderColor: '#d3dfee',
    borderWidth: 1,
  },
  submitButtonText: {
    fontSize: 15,
    color: '#2b4872',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    borderColor: '#d3dfee',
    borderWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3dfee',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#2b4872',
  },
  locationButton: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d3dfee',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 15,
    color: '#474545',
  },
});

export default AddTradePost;
