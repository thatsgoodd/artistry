import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ChattingScreen = () => {
  const { chatId, chatType = 'collaboration', userName = 'Guest' } = useLocalSearchParams();
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // 사진 선택
  const handleUploadButtonPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets);
      setShowImagePreview(true);
    }
  };

  // 사진 미리보기 닫기
  const handleCloseImagePreview = () => {
    setSelectedImage([]);
    setShowImagePreview(false);
  };

  // 선택한 사진 제거
  const handleRemoveImage = (uri) => {
    setSelectedImage(selectedImage.filter(img => img.uri !== uri));
  };

  // 메시지 전송
  const sendMessage = () => {
    if (message.trim() === '' && selectedImage.length === 0) return;

    const newMessage = {
      id: String(messagesList.length + 1),
      user: userName,
      profileImage: 'https://via.placeholder.com/40',
      content: message,
      images: selectedImage,
      time: new Date(),
    };

    setMessagesList([...messagesList, newMessage]);
    setMessage('');
    setSelectedImage([]);
    setShowImagePreview(false); // 전송 후 미리보기 닫기
  };

  // 사진 미리보기 및 선택한 사진 렌더링
  const renderImagePreview = () => (
    <ScrollView horizontal contentContainerStyle={styles.imagePreviewContainer}>
      {selectedImage.map((image) => (
        <View key={image.uri} style={styles.previewImageContainer}>
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => handleRemoveImage(image.uri)}
          >
            <Text style={styles.removeImageButtonText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  // 메시지 항목 렌더링
  const renderItem = ({ item }) => {
    const isUserMessage = item.user === userName;

    return (
      <View style={[styles.messageContainer, isUserMessage ? styles.userMessageContainer : styles.otherMessageContainer]}>
        {!isUserMessage && <Image source={{ uri: item.profileImage }} style={styles.profileImage} />}
        <View style={[styles.messageBubble, isUserMessage ? styles.userMessageBubble : styles.otherMessageBubble]}>
          <Text style={[styles.messageUser, isUserMessage ? styles.userMessageUser : styles.otherMessageUser]}>
            {item.user}
          </Text>
          {item.images.length > 0 && (
            <ScrollView horizontal contentContainerStyle={styles.messageImagesContainer}>
              {item.images.map((img, index) => (
                <Image key={index} source={{ uri: img.uri }} style={styles.messageImage} />
              ))}
            </ScrollView>
          )}
          <Text style={styles.messageContent}>{item.content}</Text>
          <Text style={styles.messageTime}>{format(item.time, 'HH:mm')}</Text>
        </View>
        {isUserMessage && <Image source={{ uri: item.profileImage }} style={styles.profileImage} />}
      </View>
    );
  };

  // 뒤로가기 버튼 동작 설정
  const handleGoBack = () => {
    if (chatType === 'collaboration') {
      navigation.navigate('CollaborationChat'); // 협업 채팅 홈 화면
    } else if (chatType === 'trading') {
      navigation.navigate('TradeChat'); // 중고 거래 홈 화면
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{chatType === 'collaboration' ? '협업 채팅' : '중고 거래 채팅'}</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>

        {/* 선택한 이미지 미리보기 */}
        {selectedImage.length > 0 && (
          <View style={styles.selectedImagesContainer}>
            {renderImagePreview()}
            <TouchableOpacity style={styles.closePreviewButton} onPress={handleCloseImagePreview}>
              <Text style={styles.closePreviewButtonText}>✖</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 채팅 메시지 영역 */}
        <FlatList
          data={messagesList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          ListHeaderComponent={
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{format(new Date(), 'yyyy-MM-dd (E)')}</Text>
            </View>
          }
        />

        {/* 입력 및 파일 업로드 영역 */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadButtonPress}>
            <Text style={styles.uploadButtonText}>📷</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="메시지를 입력하세요..."
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007bff',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  userName: {
    fontSize: 14,
    color: '#888',
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
  },
  previewImageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  removeImageButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  closePreviewButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 10,
  },
  closePreviewButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  messagesList: {
    paddingBottom: 16,
  },
  dateHeader: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  messageBubble: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  otherMessageBubble: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userMessageUser: {
    color: '#fff',
  },
  otherMessageUser: {
    color: '#000',
  },
  messageContent: {
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  uploadButton: {
    paddingHorizontal: 10,
  },
  uploadButtonText: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  sendButton: {
    paddingHorizontal: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default ChattingScreen;
