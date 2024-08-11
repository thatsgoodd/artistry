import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, Image, Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { usePhotoPicker } from '../PhotoPicker'; // PhotoPicker 가져오기
import { usePosts } from './PostContext'; // PostContext 가져오기

const EditPost = ({ route, navigation }) => {
  const { post } = route.params; // 부모 컴포넌트로부터 전달받은 게시글 데이터
  const [posts, setPosts] = usePosts(); // PostContext에서 setPost 함수 가져오기

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [photo, setPhoto] = useState(post.photo);
  const [previewPhoto, setPreviewPhoto] = useState(post.photo); // 사진 미리보기 상태
  const [modalVisible, setModalVisible] = useState(false);

  // PhotoPicker 훅 사용
  const { handleCameraLaunch, handleImageLibraryLaunch } = usePhotoPicker(setPhoto);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setPhoto(post.photo);
    setPreviewPhoto(post.photo); // 게시글 변경 시 미리보기 사진도 설정
  }, [post]);

  const handleSave = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedPost = {
      ...post,
      title,
      content
    };
    if (!Array.isArray(posts)) {
      console.error('Posts state is not an array');
      return;
    }
    
    const updatedPosts = posts.map(p => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPosts); // 상태 업데이트

    Alert.alert('Success', 'Post updated successfully');
    navigation.goBack(); // 수정 후 이전 화면으로 돌아가기
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TextInput
          style={styles.textInput}
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder="내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity style={styles.photoButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.photoButtonText}>사진</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {previewPhoto ? (
              <Image source={{ uri: previewPhoto }} style={styles.image} />
            ) : (
              <Text style={styles.noPhotoText}>No photo selected</Text>
            )}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>등록</Text>
          </TouchableOpacity>
        </View>

        {/* 카메라 및 갤러리 버튼 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleCameraLaunch}>
                    <Text style={styles.modalButtonText}>카메라로 촬영하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleImageLibraryLaunch}>
                    <Text style={styles.modalButtonText}>앨범에서 선택하기</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 15,
    flex: 1,
  },
  textInput: {
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#2b4872',
    borderRadius: 4,
    padding: 10,
    flex: 1,
    margin: 5,
  },
  saveButton: {
    backgroundColor: '#2b4872',
    borderRadius: 4,
    padding: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    height: 100,
    width: 100,
    marginVertical: 30,
  },
  noPhotoText: {
    textAlign: 'center',
    color: '#ccc',
    marginVertical: 20,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3dfee',
    width: 188,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  modalButtonText: {
    color: '#2b4872',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  photoButton: {
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
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
    color: '#2b4872',
    fontSize: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default EditPost;
