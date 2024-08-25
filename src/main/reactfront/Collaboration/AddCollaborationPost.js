import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Modal, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useWorkSharingPosts } from '../WorkSharing/WorkSharingContext'; // 게시글 관리 훅
import { usePhotoPicker } from '../PhotoPicker'; // 사진 선택 훅

const AddTradePost = ({ route, navigation }) => {
  const { posts, setPosts } = useWorkSharingPosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // 모달의 가시성 상태 추가
  const [categoryModalVisible, setCategoryModalVisible] = useState(false); // 카테고리 모달 상태 추가

  const { handleCameraLaunch, handleImageLibraryLaunch } = usePhotoPicker((uri) => {
    setImageUrls([...imageUrls, uri]);
  });

  // 게시글 수정인지 작성인지 확인
  const { postId } = route.params || {}; // route.params에서 postId를 받아옴
  const isEditMode = !!postId; // postId가 있으면 수정 모드로 간주

  useEffect(() => {
    if (isEditMode) {
      const postToEdit = posts.find(post => post.id === postId);
      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setCategoryId(postToEdit.categoryId.split(', '));
        setImageUrls(postToEdit.photos);
        setSelectedLocation(postToEdit.location || null);
      }
    }
  }, [isEditMode, postId, posts]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const location = route.params?.selectedLocation;
      if (location) {
        console.log('Updated Location:', location); // 디버깅 로그
        handleLocationUpdate(location);
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertModalVisible(true);
    setTimeout(() => {
      setAlertModalVisible(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!title || !content || categoryId.length === 0 || !selectedLocation) {
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
      categoryId: categoryId.join(', '),
      photos: imageUrls,
      location: selectedLocation,
      profile: 'https://example.com/default-profile.png',
      name: '작성자 이름',
      bookmarkCount: 0,
      likes: 0,
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

  const handleCategorySelect = (category) => {
    setCategoryId(prev => prev.includes(category)
      ? prev.filter(id => id !== category)
      : [...prev, category]
    );
  };

  const handleRemoveImage = (uri) => {
    setImageUrls(imageUrls.filter(image => image !== uri));
  };

  const navigateToLocationSelect = () => {
    console.log('Navigating to SetCollaborationPostLocation with:', selectedLocation); // 디버깅 로그
    navigation.navigate('SetCollaborationPostLocation', { selectedLocation });
  };

  const handleLocationUpdate = (location) => {
    console.log('Updating Location:', location); // 디버깅 로그
    setSelectedLocation(location);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
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

        <TouchableOpacity style={styles.categoryButton} onPress={navigateToLocationSelect}>
          <Text style={styles.categoryButtonText}>
            {selectedLocation ? `${selectedLocation.province} - ${selectedLocation.district || '전체'}` : '지역을 선택하세요'}
          </Text>
        </TouchableOpacity>

        {/* 선택된 지역을 화면에 표시 */}
        {selectedLocation && (
          <View style={styles.locationDisplay}>
            <Text style={styles.locationText}>
              선택된 지역: {selectedLocation.province} {selectedLocation.district ? `- ${selectedLocation.district}` : ''}
            </Text>
          </View>
        )}

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

        <View style={styles.selectedCategoriesContainer}>
          <ScrollView horizontal contentContainerStyle={styles.selectedCategories}>
            {categoryId.map((category, index) => (
              <View key={index} style={styles.selectedCategory}>
                <Text style={styles.selectedCategoryText}>{category}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryButtonText}>작업 카테고리 선택</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
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
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={categoryModalVisible}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.categoryModalView}>
              <View style={styles.categoryColumn}>
                {['건축', '그래픽 디자인', '회화', '조각', '판화'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryModalButton,
                      categoryId.includes(category) && styles.selectedCategoryModalButton,
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text
                      style={[
                        styles.categoryModalButtonText,
                        categoryId.includes(category) && styles.selectedCategoryModalButtonText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={alertModalVisible}
          onRequestClose={() => setAlertModalVisible(false)}
        >
          <View style={styles.alertOverlay}>
            <View style={styles.alertModalView}>
              <Text style={styles.alertText}>{alertMessage}</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
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
  categoryButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3dfee',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#2b4872',
    textAlign: 'center',
  },
  locationDisplay: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#d3dfee',
    borderWidth: 1,
  },
  locationText: {
    fontSize: 16,
    color: '#474545',
  },
  selectedCategoriesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCategories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 8,
    marginRight: 5,
  },
  selectedCategoryText: {
    color: '#474545',
    fontSize: 14,
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
  categoryModalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryModalButton: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3dfee',
  },
  selectedCategoryModalButton: {
    backgroundColor: '#2b4872',
  },
  categoryModalButtonText: {
    fontSize: 16,
    color: '#2b4872',
  },
  selectedCategoryModalButtonText: {
    color: '#ffffff',
  },
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  alertModalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    color: '#2b4872',
  },
});

export default AddTradePost;
