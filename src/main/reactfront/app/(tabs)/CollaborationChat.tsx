import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, RefreshControl, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  const handleChatPress = (chatId) => {
    router.push({
      pathname: '/ChattingScreen',
      query: { chatId },
    });
  };

  const handleDelete = (chatId) => {
    Alert.alert('삭제하기', '이 채팅을 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setChats(chats.filter(chat => chat.id !== chatId));
        },
      },
    ]);
  };

  const handleReport = (chatId) => {
    Alert.alert('신고하기', '이 채팅을 신고하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '신고',
        style: 'destructive',
        onPress: () => {
          Alert.alert('신고됨', '채팅이 신고되었습니다.');
        },
      },
    ]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setChats([...initialCollaborativeChats]); // Reset to initial data
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity 
        style={styles.rowFront}
        onPress={() => handleChatPress(item.id)}
        activeOpacity={1} // 눌렀을 때 불투명해지지 않도록 설정
      >
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <View style={styles.chatContent}>
          <Text style={styles.chatTitle}>{item.title}</Text>
          <Text style={styles.chatText} numberOfLines={1} ellipsizeMode="tail">{item.content}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.unreadCount}>
            <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      {index < chats.length - 1 && <DottedDivider />}
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity 
        style={[styles.backButton, styles.reportButton]} 
        onPress={() => handleReport(item.id)}
      >
        <Text style={styles.backButtonText}>신고하기</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.backButton, styles.deleteButton]} 
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.backButtonText}>삭제하기</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2B4872" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>채팅</Text>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>협업 모집</Text>
          </View>

          <SwipeListView
            data={chats}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={150} // Ensure this value allows the full width of the buttons to be visible
            previewRowKey={'0'}
            previewOpenValue={0}
            previewOpenDelay={4000}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    marginHorizontal: 30,
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
    marginBottom: 0,
    height: '100%', // Adjusted to take up the full available space
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
  rowFront: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 0,
    height: 100,
  },
  rowBack: {
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Ensure buttons align to the right
    alignItems: 'center',
    height: 100,
    width: 150, // Ensure this width is enough to show buttons fully
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  reportButton: {
    backgroundColor: 'blue',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginHorizontal: 15,
  },
  dot: {
    width: 3,
    height: 1,
    backgroundColor: '#D3DFEE',
  },
});


export default CollaborationChat;
