import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  Modal,
  Platform,
  Dimensions,
  Alert,
  Clipboard, // Clipboard를 'react-native'로 가져옴
} from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

const ChattingScreen = () => {
  const { chatId, chatType = 'collaboration', userName = 'Guest' } = useLocalSearchParams();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const actionSheetRef = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const currentUserId = 1; // 현재 사용자 ID (예제에서는 하드코딩)

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
        _id: uuid.v4(),
        createdAt: new Date(),
        user: {
          _id: currentUserId,
          name: userName,
          avatar: 'https://via.placeholder.com/150',
        },
        image: selectedImage,
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage));
      setSelectedImage(null);
    } else {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }
  }, [selectedImage]);

  // 메시지 꾹 눌렀을 때 액션 시트 표시
  const handleLongPress = (context, message) => {
    setSelectedMessage(message);
    actionSheetRef.current?.show();
  };

  const handleActionSheetPress = (index) => {
    if (selectedMessage) {
      if (selectedMessage.user._id === currentUserId) {
        // 본인 메시지
        if (index === 0) {
          // 삭제하기 선택됨
          setMessages(previousMessages => previousMessages.filter(msg => msg._id !== selectedMessage._id));
        } else if (index === 1) {
          // 복사하기 선택됨
          Clipboard.setString(selectedMessage.text);
          Alert.alert('복사 완료', '메시지가 클립보드에 복사되었습니다.');
        }
      } else {
        // 타인 메시지
        if (index === 0) {
          // 신고하기 선택됨
          Alert.alert('신고', `메시지를 신고합니다: ${selectedMessage.text}`);
        } else if (index === 1) {
          // 복사하기 선택됨
          Clipboard.setString(selectedMessage.text);
          Alert.alert('복사 완료', '메시지가 클립보드에 복사되었습니다.');
        }
      }
      setSelectedMessage(null);
    }
  };

  // 뒤로가기 버튼 동작 설정
  const handleGoBack = () => {
    if (chatType === 'collaboration') {
      navigation.navigate('CollaborationChat');
    } else if (chatType === 'trading') {
      navigation.navigate('TradeChat');
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
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" style={styles.backButtonText} size={24} color="#2B4872" />
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
              <Ionicons name="close" style={styles.closePreviewButtonText} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}

      {/* 채팅 UI */}
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: currentUserId,
          name: userName,
          avatar: 'https://via.placeholder.com/150',
        }}
        renderActions={() => (
          <TouchableOpacity onPress={handleUploadButtonPress} style={styles.uploadButton}>
            <Ionicons name='camera-outline' style={styles.uploadButtonText} />
          </TouchableOpacity>
        )}
        renderSend={(props) => {
          const { text, onSend, user } = props;

          return (
            <TouchableOpacity
              onPress={() => {
                if (text.trim().length > 0 || selectedImage) {
                  if (onSend) {
                    let message = {
                      _id: uuid.v4(),
                      text: text.trim(),
                      user,
                      createdAt: new Date(),
                    };
                    onSend([message], true);
                  }
                }
              }}
              style={styles.sendButton}
            >
              <Ionicons name='send-outline' style={styles.sendButtonText} />
            </TouchableOpacity>
          );
        }}
        bottomOffset={Platform.OS === 'ios' ? 40 : 0}
        minInputToolbarHeight={50}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#faf3d0',
              },
              right: {
                backgroundColor: '#718BAE',
              },
            }}
            textStyle={{
              left: {
                color: '#000',
              },
              right: {
                color: '#fff',
              },
            }}
          />
        )}
        onLongPress={(context, message) => handleLongPress(context, message)}
      />

      {/* 이미지 확대 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalVisible(false)}>
            <Ionicons name="close" size={30} style={styles.ModalclosePreviewButton} />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>

      {/* 액션 시트 */}
      <ActionSheet
        ref={actionSheetRef}
        options={
          selectedMessage && selectedMessage.user._id === currentUserId
            ? ['삭제하기', '복사하기', '취소']
            : ['신고하기', '복사하기', '취소']
        }
        cancelButtonIndex={selectedMessage && selectedMessage.user._id === currentUserId ? 2 : 2}
        onPress={handleActionSheetPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingRight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
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
    right: 10,
    borderRadius: 15,
    padding: 5,
  },
  ModalclosePreviewButton: {
    color: 'white',
  },
  closePreviewButtonText: {
    color: '#000',
    fontSize: 20,
  },
  uploadButton: {
    paddingHorizontal: 10,
  },
  uploadButtonText: {
    fontSize: 24,
    paddingBottom: 10,
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 10,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 20,
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
