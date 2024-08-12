import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuBar = () => {
  const [isCenterPressed, setIsCenterPressed] = useState(false);
  const navigation = useNavigation();

  const handleCenterPress = () => {
    setIsCenterPressed(!isCenterPressed);
  };

  const handleLinkPress = (screenName) => {
    setIsCenterPressed(false);
    navigation.navigate(screenName); // 변경된 부분
  };

  return (
    <View style={styles.menuBar}>
      <TouchableOpacity onPress={() => handleLinkPress('Home')} style={styles.iconContainer}>
        <Ionicons name="home-outline" size={30} color="#2B4872" />
        <Text style={styles.iconLabel}>홈</Text>
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={handleCenterPress} style={styles.iconContainer}>
          <Ionicons name={isCenterPressed ? "close-outline" : "ellipsis-horizontal-outline"} size={30} color="#2B4872" />
        </TouchableOpacity>
        {isCenterPressed && (
          <View style={styles.selectionContainer}>
            <TouchableOpacity onPress={() => handleLinkPress('WorkSharingScreen')} style={styles.selectionIcon}>
              <View style={styles.circle}>
                <Ionicons name="color-palette-outline" size={24} color="#2B4872" />
              </View>
              <Text style={styles.circleLabel}>작업 공유</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress('Trade')} style={styles.selectionIcon}>
              <View style={styles.circle}>
                <Ionicons name="basket-outline" size={24} color="#2B4872" />
              </View>
              <Text style={styles.circleLabel}>중고 거래</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress('Collaboration')} style={styles.selectionIcon}>
              <View style={styles.circle}>
                <Ionicons name="people-outline" size={24} color="#2B4872" />
              </View>
              <Text style={styles.circleLabel}>협업 모집</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress('Freeboard')} style={styles.selectionIcon}>
              <View style={styles.circle}>
                <Ionicons name="clipboard-outline" size={24} color="#2B4872" />
              </View>
              <Text style={styles.circleLabel}>자유게시판</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress('ArtStore')} style={styles.selectionIcon}>
              <View style={styles.circle}>
                <Ionicons name="cart-outline" size={24} color="#2B4872" />
              </View>
              <Text style={styles.circleLabel}>화방</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => handleLinkPress('MyPage')} style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={30} color="#2B4872" />
        <Text style={styles.iconLabel}>My Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuBar;

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    shadowRadius: 10,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 0,
  },
  iconContainer: {
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 50,
  },
  centerContainer: {
    alignItems: 'center',
    left: 9,
  },
  selectionContainer: {
    position: 'absolute',
    top: -100,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  selectionIcon: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  iconLabel: {
    fontSize: 12,
    color: '#2B4872',
    marginTop: 4,
  },
  circleLabel: {
    fontSize: 12,
    color: '#2B4872',
    marginTop: 6,
  },
});
