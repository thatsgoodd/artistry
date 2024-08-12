import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  Modal,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const ChattingScreen = () => {
  const { chatId, chatType = 'collaboration', userName = 'Guest' } = useLocalSearchParams();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 이미지 선택 핸들러
  const handleUploadButtonPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 메시지 전송 핸들러
  const onSend = useCallback((newMessages = []) => {
    if (selectedImage) {
      const imageMessage = {
        ...newMessages[0],
        image: selectedImage,
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage));
      setSelectedImage(null);
    } else {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }
  }, [selectedImage]);

  // 뒤로가기 버튼 동작 설정
  const handleGoBack = () => {
    if (chatType === 'collaboration') {
      navigation.navigate('CollaborationChat'); // 협업 채팅 홈 화면
    } else if (chatType === 'trading') {
      navigation.navigate('TradeChat'); // 중고 거래 홈 화면
    }
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

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

        {/* 선택된 이미지 미리보기 */}
        {selectedImage && (
          <View style={styles.previewContainer}>
            <TouchableOpacity
              style={styles.previewImageWrapper}
              onPress={() => setIsModalVisible(true)}
            >
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              <TouchableOpacity style={styles.closePreviewButton} onPress={() => setSelectedImage(null)}>
                <Text style={styles.closePreviewButtonText}>✖</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}

        {/* 채팅 UI */}
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 1,
            name: userName,
            avatar: 'https://via.placeholder.com/150',
          }}
          renderActions={() => (
            <TouchableOpacity onPress={handleUploadButtonPress} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>📷</Text>
            </TouchableOpacity>
          )}
          renderSend={(props) => (
            <Send {...props}>
              <View style={styles.sendButton}>
                <Text style={styles.sendButtonText}>전송</Text>
              </View>
            </Send>
          )}
        />
      </KeyboardAvoidingView>

      {/* 이미지 확대 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalCloseButtonText}>✖</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
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
  previewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  previewImageWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  closePreviewButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  closePreviewButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  uploadButton: {
    paddingHorizontal: 10,
  },
  uploadButtonText: {
    fontSize: 24,
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
  sendButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  modalImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
    resizeMode: 'contain',
  },
});

export default ChattingScreen;
