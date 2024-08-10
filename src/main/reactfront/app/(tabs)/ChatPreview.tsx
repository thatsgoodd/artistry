import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const staticCollaborativeChats = [
  { id: '1', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 A', content: '팀원들이 필요한 기능을 논의하는 채팅입니다.', time: '2시간 전', unreadCount: 2 },
  { id: '2', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 B', content: '디자인 리뷰와 관련된 채팅입니다.', time: '5시간 전', unreadCount: 0 },
  { id: '3', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 C', content: '회의 결과를 논의하는 채팅입니다.', time: '8시간 전', unreadCount: 1 },
];

const staticTradeChats = [
  { id: '1', profileImage: 'https://via.placeholder.com/50', title: '중고 물건 A', content: '중고 물건에 대한 거래 채팅입니다.', time: '1일 전', unreadCount: 1 },
  { id: '2', profileImage: 'https://via.placeholder.com/50', title: '중고 물건 B', content: '상세한 제품 설명을 포함한 채팅입니다.', time: '3일 전', unreadCount: 3 },
  { id: '3', profileImage: 'https://via.placeholder.com/50', title: '중고 물건 C', content: '추가적인 질문과 답변이 포함된 채팅입니다.', time: '5일 전', unreadCount: 0 },
];

const ChatPreview = () => {
  const router = useRouter();

  const handleChatPress = (chatId, type) => {
    // 경로 확인 및 수정
    router.push(`/chat/${type}/${chatId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>채팅</Text>
      </View>

      {/* Collaborative Chats Container */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>협업 모집</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/Chat/CollaborationChat')}>
            <Ionicons name="add-outline" size={20} color="#2B4872" />
          </TouchableOpacity>
        </View>
        {staticCollaborativeChats.slice(0, 3).map((chat, index) => (
          <React.Fragment key={chat.id}>
            <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(chat.id, 'collaboration')}>
              <Image source={{ uri: chat.profileImage }} style={styles.profileImage} />
              <View style={styles.chatContent}>
                <Text style={styles.chatTitle}>{chat.title}</Text>
                <Text style={styles.chatText} numberOfLines={2} ellipsizeMode="tail">{chat.content}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              {chat.unreadCount > 0 && (
                <View style={styles.unreadCount}>
                  <Text style={styles.unreadCountText}>{chat.unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            {index < staticCollaborativeChats.slice(0, 3).length - 1 && <DottedDivider />}
          </React.Fragment>
        ))}
      </View>

      {/* Trade Chats Container */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>중고 거래</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/Chat/TradeChat')}>
            <Ionicons name="add-outline" size={20} color="#2B4872" />
          </TouchableOpacity>
        </View>
        {staticTradeChats.slice(0, 3).map((chat, index) => (
          <React.Fragment key={chat.id}>
            <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(chat.id, 'trade')}>
              <Image source={{ uri: chat.profileImage }} style={styles.profileImage} />
              <View style={styles.chatContent}>
                <Text style={styles.chatTitle}>{chat.title}</Text>
                <Text style={styles.chatText} numberOfLines={2} ellipsizeMode="tail">{chat.content}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              {chat.unreadCount > 0 && (
                <View style={styles.unreadCount}>
                  <Text style={styles.unreadCountText}>{chat.unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            {index < staticTradeChats.slice(0, 3).length - 1 && <DottedDivider />}
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

const DottedDivider = () => (
  <View style={styles.dottedContainer}>
    {Array.from({ length: 60 }).map((_, index) => (
      <View key={index} style={styles.dot} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  header: {
    paddingBottom: 10,
  },
  headerTitle: {
    left: 7,
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4872',
    marginHorizontal: 20,
  },
  sectionContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: 20,
    height: 330,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 5,
  },
  sectionHeader: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  addButton: {
    padding: 5,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatText: {
    color: '#555',
  },
  chatTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  unreadCount: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCountText: {
    color: '#fff',
    fontSize: 14,
  },
  dottedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  dot: {
    width: 3,
    height: 1,
    backgroundColor: '#D3DFEE',
  },
});

export default ChatPreview;
