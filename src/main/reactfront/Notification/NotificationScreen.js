import React, { useState } from 'react';
import {
  View, FlatList, StyleSheet
} from 'react-native';
import Notification from './Notification';
import notifications from './data/notification'; // 데이터 파일 불러오기

const NotificationScreen = () => {
  const [notificationData, setNotificationData] = useState(notifications);

  const handleNotificationPress = (id) => {
    setNotificationData((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true } // 눌린 알림의 read 상태를 true로 변경
          : notification
      )
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Notification
        type={item.type}
        profilePic={item.profilePic}
        username={item.username}
        postTitle={item.postTitle}
        comment={item.comment}
        reply={item.reply}
        timestamp={item.timestamp}
        read={item.read} // 읽음 상태 전달
        onPress={() => handleNotificationPress(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default NotificationScreen;
