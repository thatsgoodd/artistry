import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingWritingButton from '../components/FloatingWritingButton';
import FloatingLocationButton from '../components/FloatingLocationButton';
import { useNavigation } from '@react-navigation/native';
import { TradeLocationProvider } from './TradeLocationContext';

const postsData = {
  seoul: [
    {
      id: '1',
      image: 'https://example.com/image1.jpg',
      title: '서울 인기 협업 제목 1',
      description: '서울 협업 내용 일부 1',
      author: '작성자1',
      time: '1시간 전',
      profileImage: 'https://example.com/profile1.jpg',
    },
    // 추가 데이터...
  ],
  busan: [
    {
      id: '2',
      image: 'https://example.com/image2.jpg',
      title: '부산 인기 협업 제목 1',
      description: '부산 협업 내용 일부 1',
      author: '작성자2',
      time: '2시간 전',
      profileImage: 'https://example.com/profile2.jpg',
    },
    // 추가 데이터...
  ],
};

const interestData = [
  {
    id: '1',
    image: 'https://example.com/interest1.jpg',
    title: '관심 거래 제목 1',
    description: '관심 거래 내용 일부 1',
    author: '관심 작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
  },
  // 추가 데이터...
];

const purchaseData = [
  {
    id: '1',
    image: 'https://example.com/purchase1.jpg',
    title: '구매 내역 제목 1',
    description: '구매 내역 내용 일부 1',
    author: '구매자1',
    time: '어제',
    profileImage: 'https://example.com/profile5.jpg',
  },
  // 추가 데이터...
];

const saleData = [
  {
    id: '1',
    image: 'https://example.com/sale1.jpg',
    title: '판매 내역 제목 1',
    description: '판매 내역 내용 일부 1',
    author: '판매자1',
    time: '오늘',
    profileImage: 'https://example.com/profile9.jpg',
  },
  // 추가 데이터...
];

const TradeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('location');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    // 더 많은 지역 추가
  ]);

  const navigation = useNavigation();

  const posts = value ? postsData[value] : [];

  const handlePressAddPost = () => {
    navigation.navigate('AddTradePost');
  };

  const handleLocation = () => {
    navigation.navigate('SetTradeLocation');
  };

  const handlePostPress = (postId) => {
    navigation.navigate('TradePostDetail', { postId });
  };

  const renderContent = () => {
    const renderPostItem = ({ item }) => (
      <TouchableOpacity style={styles.postContainer} onPress={() => handlePostPress(item.id)}>
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
      </TouchableOpacity>
    );

    switch (selectedTab) {
      case 'location':
        return (
          <FlatList
            data={posts} // 지역별 글 표시
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        );

      case 'interest':
        return (
          <FlatList
            data={interestData} // 관심 거래 데이터 표시
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        );

      case 'purchase':
        return (
          <FlatList
            data={purchaseData} // 구매 내역 데이터 표시
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        );

      case 'sale':
        return (
          <FlatList
            data={saleData} // 판매 내역 데이터 표시
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        );

      default:
        return null;
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>중고 거래</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('TradeSearch')}>
            <Ionicons name="search-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('TradeChat')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'location' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('location')}
        >
          <Text style={styles.tabButtonText}>지역별</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'interest' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('interest')}
        >
          <Text style={styles.tabButtonText}>관심 거래</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'purchase' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('purchase')}
        >
          <Text style={styles.tabButtonText}>구매 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'sale' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('sale')}
        >
          <Text style={styles.tabButtonText}>판매 내역</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}

      <FloatingWritingButton onPress={handlePressAddPost} />
      <FloatingLocationButton onPress={handleLocation} />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B4872',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  iconButton: {
    marginLeft: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#2B4872',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#2B4872',
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  postContent: {
    flex: 1,
    marginLeft: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDescription: {
    color: '#555',
  },
  postTime: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
});

export default TradeScreen;
