// components/Header.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import IconButton from './IconButton'; // IconButton 경로 조정

const HomeHeader = ({ router }) => {
  return (
    <View style={styles.container}>
      <Image
                style={{ width: 150, height: 40 }}
                source={require("../assets/images/HomeHeader.png")}
                resizeMode="contain"
              />
      <View style={styles.headerRightContainer}>
        <IconButton
          icon="chatbubble-ellipses-outline"
          color="black"
          onPress={() => router.push("/ChatPreview")}
        />
        <IconButton
          icon="notifications-outline"
          color="black"
          onPress={() => router.push("/Notification")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerImage: {
    width: 150,
    height: 40,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeHeader;
