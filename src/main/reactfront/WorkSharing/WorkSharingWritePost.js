import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, Image, Modal, ScrollView, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { useWorkSharingPosts } from './WorkSharingContext';
import { usePhotoPicker } from '../PhotoPicker';

const WorkSharingWritePost = ({ route, navigation }) => {
  const { posts, setPosts } = useWorkSharingPosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
        setCategoryId(postToEdit.categoryId.split(', ')); // 카테고리 배열로 변환
        setImageUrls(postToEdit.photos);
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
    if (!title || !content || categoryId.length === 0) {
      showAlert('모든 필드를 입력해주세요.');
      return;
    }
    if (imageUrls.length === 0) {
      showAlert('한 장 이상의 사진을 업로드 해주세요.');
      return;
    }

    const newPost = {
      id: isEditMode ? postId : (posts.length + 1).toString(), // 수정 모드일 경우 기존 ID 사용
      title,
      content,
      categoryId: categoryId.join(', '), // 배열을 문자열로 변환하여 저장
      photos: imageUrls,
      profile: 'https://example.com/default-profile.png',
      name: '작성자 이름',
      bookmarkCount: 0,
      likes: 0,
    };

    setPosts(prevPosts => {
      if (isEditMode) {
        // 수정 모드인 경우 기존 게시글을 업데이트
        return prevPosts.map(post => post.id === postId ? newPost : post);
      } else {
        // 작성 모드인 경우 새로운 게시글 추가
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
  const filterPostsByCategory = (selectedCategory) => {
    return posts.filter(post => {
      const categories = post.categoryId.split(', ');
      return categories.includes(selectedCategory);
    });
  };
  
  // 사용 예시
 
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>{isEditMode ? '수정' : '저장'}</Text>
        </TouchableOpacity>

        <View style={styles.photoSection}>
          <ScrollView contentContainerStyle={styles.imagePreviewContainer}>
            {imageUrls.map((uri, index) => (
              <View key={index} style={styles.photoWrapper}>
                <Image source={{ uri }} style={styles.photoPreview} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveImage(uri)}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, { marginBottom: 12 }]}
          placeholder="내용"
          multiline
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryButtonText}>작업 카테고리</Text>
        </TouchableOpacity>

        <View style={styles.selectedCategoriesContainer}>
          <ScrollView horizontal contentContainerStyle={styles.selectedCategories}>
            {categoryId.map((category, index) => (
              <View key={index} style={styles.selectedCategory}>
                <Text style={styles.selectedCategoryText}>{category}</Text>
              </View>
            ))}
          </ScrollView>
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={categoryModalVisible}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setCategoryModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.categoryModalView}>
                <View style={styles.categoryColumn}>
                  {['건축', '그래픽 디자인', '회화', '조각', '판화'].map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryModalButton,
                        categoryId.includes(category) && styles.selectedCategoryModalButton
                      ]}
                      onPress={() => handleCategorySelect(category)}
                    >
                      <Text
                        style={[
                          styles.categoryModalButtonText,
                          categoryId.includes(category) && styles.selectedCategoryModalButtonText
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.categoryColumn} />

                <View style={styles.categoryColumn}>
                  {['드로잉', '사진', '비디오아트', '산업디자인'].map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryModalButton,
                        categoryId.includes(category) && styles.selectedCategoryModalButton
                      ]}
                      onPress={() => handleCategorySelect(category)}
                    >
                      <Text
                        style={[
                          styles.categoryModalButtonText,
                          categoryId.includes(category) && styles.selectedCategoryModalButtonText
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-end'
  }, 
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#2b4872',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
    marginBottom: 12,
    color: '#474545'
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#d3dfee',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 8,
    width: 136,
    height: 51,
    justifyContent: "center"
  },
  categoryButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  selectedCategories: {
    flexDirection: 'row',
  },
  selectedCategory: {
    backgroundColor: '#d3dfee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedCategoriesContainer: {
    width: '100%', // 전체 가로 크기
    height: 47, // 전체 세로 크기
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    padding: 8,
  },
  selectedCategoryText: {
    color: '#000000',
  },
  photoSection: {
    marginVertical: 16,
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: 34,
    height: 34,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d3dfee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    color: '#2b4872',
    fontSize: 15,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  photoPreview: {
    width: 410,
    height: 266,
    borderRadius: 4,
    top: 30
  },
  removeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 15,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  submitButton: {
    backgroundColor: '#ffffff',
    borderColor: '#d3dfee',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    left: 340,
    bottom: 680,
    width: 63,
    height: 23,
    zIndex:50,
    top:5,
    marginBottom:50
  },
  submitButtonText: {
    color: '#2b4872',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 80,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#d3dfee',
    borderWidth: 1,
    width:250,
    height:180,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#474545',
    fontSize: 16,
  },
  categoryModalView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderRadius: 14,
    justifyContent: 'space-between',
    width: 376,
    height: 242,
    borderWidth: 1,
    borderColor: '#d3dfee',
    top: 40
  },
  categoryModalButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: 114,
    height: 40,
    flexDirection: 'row',
    borderColor: '#d3dfee',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  selectedCategoryModalButton: {
    backgroundColor: '#689ce6',
  },
  categoryModalButtonText: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',
    flex: 1
  },
  selectedCategoryModalButtonText: {
  },
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    color: '#333',
    fontSize: 16,
  },
  categoryColumn: {
    flex: 1,
    justifyContent: 'space-evenly', // 버튼들이 공간을 최대한 고르게 분배
  },
});

export default WorkSharingWritePost;
