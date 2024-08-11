import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Alert, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AppTradePost = ({ navigation }) => {
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
    } else {
      Alert.alert('이미지 선택 취소');
    }
  };

  const handleSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('입력 오류', '제목과 내용을 모두 입력해 주세요.');
      return;
    }

    const formatDate = (date) => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      uploadTime: formatDate(new Date()),
      likes: 0,
      comments: 0,
      photo: photo ? photo.uri : null,
    };

    // You would typically add `newPost` to your state or context here
    Alert.alert('게시물 작성 완료', '게시물이 성공적으로 작성되었습니다.', [
      { text: '확인', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>글 작성</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="내용"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <View style={styles.imageContainer}>
          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.image} />
          )}
        </View>
        <TouchableOpacity style={styles.photoButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.photoButtonText}>사진 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postButtonText}>작성하기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={handleCameraLaunch}>
              <Text style={styles.modalButtonText}>카메라로 촬영하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleImageLibraryLaunch}>
              <Text style={styles.modalButtonText}>앨범에서 선택하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    height: 100,
    width: 100,
    marginVertical: 16,
  },
  photoButton: {
    backgroundColor: '#2B4872',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#2B4872',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  modalButton: {
    marginVertical: 5,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#2B4872',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppTradePost;
