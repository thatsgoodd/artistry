import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity
} from 'react-native';

const Notification = ({ type, profilePic, username, postTitle, comment, reply, timestamp, read, onPress }) => {
  let message;

  // type에 따른 메시지 설정
  switch (type) {
    case 'like':
      message = `${username}님이 "${postTitle}"에 좋아요를 눌렀습니다.`;
      break;
    case 'comment':
      message = `${username}님이 "${postTitle}"에 댓글을 남겼습니다: "${comment}"`;
      break;
    case 'reply':
      message = `${username}님이 "${postTitle}"에 답글을 남겼습니다: "${reply}"`;
      break;
    case 'follow':
      message = `${username}님이 회원님을 팔로우했습니다.`;
      break;
    default:
      message = '새로운 알림이 있습니다.';
  }

  return (
    <TouchableOpacity
      style={[
        styles.notificationContainer,
        { backgroundColor: read ? '#e0e0e0' : '#ffffff' }, // 읽음 상태에 따른 배경색 변경
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
      <View style={styles.infoContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default Notification;
