import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const initialCollaborativeChats = [
  { id: '1', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 A', content: '팀원들이 필요한 기능을 논의하는 채팅입니다.', time: '2시간 전', unreadCount: 2 },
  { id: '2', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 B', content: '디자인 리뷰와 관련된 채팅입니다.', time: '5시간 전', unreadCount: 0 },
  { id: '3', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 C', content: '회의 결과를 논의하는 채팅입니다.', time: '8시간 전', unreadCount: 1 },
  { id: '4', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 D', content: '개발 진행 상황을 공유하는 채팅입니다.', time: '1일 전', unreadCount: 0 },
  { id: '5', profileImage: 'https://via.placeholder.com/50', title: '팀 프로젝트 E', content: '추가적인 피드백을 논의하는 채팅입니다.', time: '3일 전', unreadCount: 3 },
];

const CollaborationChat = () => {
  const router = useRouter();
  const [chats, setChats] = useState(initialCollaborativeChats);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // 데이터 새로 고침 (여기서는 데이터가 변경되지 않습니다)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const handleChatPress = (chatId) => {
    router.push({
      pathname: `/chat/collaborative/${chatId}`,
      params: { chatId: chatId },  // 여기서 `chatId`를 전달
    });
  };
  
  

  const renderItem = ({ item, index }) => (

      <View>
      <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item.id)}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <View style={styles.chatContent}>
          <Text style={styles.chatTitle}>{item.title}</Text>
          <Text style={styles.chatText} numberOfLines={2} ellipsizeMode="tail">{item.content}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.unreadCount}>
            <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {/* 점선을 마지막 항목 뒤에는 렌더링하지 않음 */}
      {index < chats.length - 1 && <DottedDivider />}
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2B4872" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerTitle}>채팅</Text>
      </View>

      {/* Collaborative Chats Container */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>협업 모집</Text>
        </View>

        {/* FlatList with Pull to Refresh */}
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
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
    backgroundColor: "#fff",
    paddingVertical: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    left: 7,
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B4872",
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
    height: 750,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 5,
  },
  sectionHeader: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B4872",
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
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 3,
    height: 1,
    backgroundColor: '#D3DFEE',
    marginHorizontal: 1,
  },
});

export default CollaborationChat;
