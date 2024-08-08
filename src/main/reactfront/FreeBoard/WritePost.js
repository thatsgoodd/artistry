// WritePost.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Alert, TouchableWithoutFeedback } from 'react-native';
import { usePosts } from './PostContext';
import * as ImagePicker from 'expo-image-picker';

const WritePost = ({ navigation }) => {
  const [posts, setPosts] = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 오류', '미디어 라이브러리 접근 권한이 필요합니다.');
    }
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 오류', '카메라 접근 권한이 필요합니다.');
    }
  };

  const handleCameraLaunch = async () => {
    await requestCameraPermissions();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto({ uri: result.assets[0].uri });
      console.log(result.assets[0].uri);
    } else {
      Alert.alert('사진 촬영 취소');
    }
  };

  const handleImageLibraryLaunch = async () => {
    await requestPermissions();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto({ uri: result.assets[0].uri });
      console.log(result.assets[0].uri);
    } else {
      Alert.alert('이미지 선택 취소');
    }
  };

  const handleSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('입력 오류', '제목과 내용을 모두 입력해 주세요.');
      return;
    }

    const formatDate = (date) =>{
      const hours =date.getHours().toString().padStart(2,'0');
      const minutes =date.getMinutes().toString().padStart(2,'0');
       return `${hours}:${minutes}`;
    }
    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      uploadTime: formatDate(new Date()),
      likes: 0,
      comments: 0,
      photo: photo ? photo.uri : null,
    };

    setPosts(prevPosts => [...prevPosts, newPost]);
    Alert.alert('게시물 작성 완료', '게시물이 성공적으로 작성되었습니다.', [
      { text: '확인', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
      />
      <Text style={styles.label}>내용</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="내용을 입력하세요"
        multiline
        numberOfLines={5}
      />
      <View style={styles.overlay}>
        <Text> </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop:10}}>
        <TouchableOpacity style={styles.photoButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.photoButtonText}>사진</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.image} />
          )}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal:5,
  },
  image: {
    height: 100,
    width: 100,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    zIndex:2
  },
  overlay: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    elevation: 10,
    shadowOffset: { height: 5, width: 0 },
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    zIndex:2
  },
  photoButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
    width: 59,
    height: 31,
    borderColor: '#d3dfee',
    borderWidth: 1
  },
  photoButtonText: {
    fontSize: 15,
    color: '#2b4872'
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
  submitButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 59,
    height: 31,
    borderColor: '#d3dfee',
    borderWidth: 1
  },
  submitButtonText: {
    color: '#2b4872',
    fontSize: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16
  },
  modalOverlay: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3dfee',
    width: 188,
    height: 120,
    top:350,
    justifyContent: 'center',
    alignItems: 'center',
    margin:5
  },
});

export default WritePost;
