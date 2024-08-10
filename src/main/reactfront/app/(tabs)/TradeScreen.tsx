// TradeScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';

// 데이터
const postsData = {
  seoul: [
    {
      image: 'https://example.com/image1.jpg',
      title: '서울 인기 게시글 제목 1',
      description: '서울 게시글 내용 일부 1',
      author: '작성자1',
      time: '1시간 전',
      profileImage: 'https://example.com/profile1.jpg',
    },
    // 추가 데이터...
  ],
  busan: [
    {
      image: 'https://example.com/image2.jpg',
      title: '부산 인기 게시글 제목 1',
      description: '부산 게시글 내용 일부 1',
      author: '작성자2',
      time: '2시간 전',
      profileImage: 'https://example.com/profile2.jpg',
    },
    // 추가 데이터...
  ],
};

// 화면 컴포넌트들
const TradePosts = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    // 더 많은 지역 추가
  ]);

  const posts = value ? postsData[value] : [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>중고거래</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
        </View>
      </View>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropDownPicker}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.dropDownText}
        placeholderStyle={styles.dropDownPlaceholder}
        placeholder="지역 선택"
      />

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            ) : null}
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
              <View style={styles.profileContainer}>
                {item.profileImage ? (
                  <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                ) : null}
                <Text style={styles.postAuthor}>{item.author}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // 두 열로 나눠서 보여주기
      />
    </SafeAreaView>
  );
};

const InterestScreen = () => (
  <View style={styles.screen}>
    <Text>관심 내역</Text>
  </View>
);

const BuyHistoryScreen = () => (
  <View style={styles.screen}>
    <Text>구매 내역</Text>
  </View>
);

const SellHistoryScreen = () => (
  <View style={styles.screen}>
    <Text>판매 내역</Text>
  </View>
);

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="TradePosts"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen name="TradePosts" component={TradePosts} options={{ tabBarLabel: '거래' }} />
      <Tab.Screen name="Interests" component={InterestScreen} options={{ tabBarLabel: '관심 내역' }} />
      <Tab.Screen name="BuyHistory" component={BuyHistoryScreen} options={{ tabBarLabel: '구매 내역' }} />
      <Tab.Screen name="SellHistory" component={SellHistoryScreen} options={{ tabBarLabel: '판매 내역' }} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  dropDownPicker: {
    width: '22%',
    minHeight: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    marginLeft: '3%',
  },
  dropDownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    width: '22%',
    minHeight: 30,
    marginLeft: '3%',
  },
  dropDownText: {
    textAlign: 'center',
    fontSize: 11,
  },
  dropDownPlaceholder: {
    fontSize: 10,
  },
  postContainer: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  postContent: {
    padding: 10,
  },
  postTitle: {
    fontWeight: 'bold',
  },
  postDescription: {
    marginTop: 5,
    color: '#666',
  },
  postTime: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
