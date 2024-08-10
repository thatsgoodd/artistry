import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns';

const Chat = ({ route }) => {
  const { chatId, category = 'collaboration', userName = 'Guest' } = route.params;
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [messagesList, setMessagesList] = useState([]);

  // 이미지 선택 기능
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: String(messagesList.length + 1),
      user: userName,
      profileImage: 'https://via.placeholder.com/40',
      content: message,
      time: new Date(),
    };

    setMessagesList([...messagesList, newMessage]);
    setMessage('');
  };

  // 메시지 항목 렌더링
  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.messageBubble}>
        <Text style={styles.messageUser}>{item.user}</Text>
        <Text style={styles.messageContent}>{item.content}</Text>
        <Text style={styles.messageTime}>{format(item.time, 'HH:mm')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category === 'collaboration' ? '협업 채팅' : '중고 거래 채팅'}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

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
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>📷</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="메시지를 입력하세요..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>

      {/* 선택한 이미지 표시 */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  userName: {
    fontSize: 16,
    color: '#888',
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageBubble: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  messageUser: {
    fontWeight: 'bold',
    marginBottom: 4,
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
  },
  sendButton: {
    paddingHorizontal: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default Chat;
