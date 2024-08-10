import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chatting = ({ nickname, chatting, time, isMe }) => {
  const [chatNick, setChatNick] = useState('');

  useEffect(() => {
    setChatNick(isMe ? '나' : nickname);
  }, [isMe, nickname]);

  return (
    <View style={isMe ? styles.meContainer : styles.youContainer}>
      {isMe ? (
        <View style={styles.meContent}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={styles.chatContainer}>
            <View style={styles.nicknameContainer}>
              <Text style={styles.nicknameText}>{chatNick}</Text>
            </View>
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>{chatting}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.youContent}>
          <View style={styles.chatContainer}>
            <View style={styles.nicknameContainer}>
              <Text style={styles.nicknameText}>{chatNick}</Text>
            </View>
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>{chatting}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  meContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  youContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  meContent: {
    flexDirection: 'row',
  },
  youContent: {
    flexDirection: 'row',
  },
  timeContainer: {
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
    color: 'black',
  },
  chatContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  nicknameContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  nicknameText: {
    fontSize: 12,
    color: 'white',
  },
  chatBubble: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    maxWidth: '80%',
  },
  chatText: {
    fontSize: 12,
    color: 'black',
  },
});

export default Chatting;
