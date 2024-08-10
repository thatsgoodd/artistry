import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';

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

const TradeScreen = () => {
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

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" style={styles.page}><TradeScreen /></View>
        <View key="2" style={styles.page}><InterestScreen /></View>
        <View key="3" style={styles.page}><BuyHistoryScreen /></View>
        <View key="4" style={styles.page}><SellHistoryScreen /></View>
      </PagerView>

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu-outline" size={24} color="#2B4872" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
