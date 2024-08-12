import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingWritingButton from '../components/FloatingWritingButton';
import FloatingLocationButton from '../components/FloatingLocationButton';
import { useNavigation } from '@react-navigation/native';

// Example data for different sections
const postsData = {
  seoul: [
    {
      image: 'https://example.com/image1.jpg',
      title: '서울 협업 제목 1',
      description: '서울 협업 내용 일부 1',
      author: '작성자1',
      time: '1시간 전',
      profileImage: 'https://example.com/profile1.jpg',
    },
    // 추가 데이터...
  ],
  busan: [
    {
      image: 'https://example.com/image2.jpg',
      title: '부산 협업 제목 1',
      description: '부산 협업 내용 일부 1',
      author: '작성자2',
      time: '2시간 전',
      profileImage: 'https://example.com/profile2.jpg',
    },
    // 추가 데이터...
  ],
};

const popularData = [
  {
    image: 'https://example.com/popular1.jpg',
    title: '인기 협업 제목 1',
    description: '인기 협업 내용 일부 1',
    author: '작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
  },
  // 추가 데이터...
];

const interestData = [
  {
    image: 'https://example.com/interest1.jpg',
    title: '관심 거래 제목 1',
    description: '관심 거래 내용 일부 1',
    author: '관심 작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
  },
  // 추가 데이터...
];

const scrapData = [
  {
    image: 'https://example.com/scrap1.jpg',
    title: '스크랩 거래 제목 1',
    description: '스크랩 거래 내용 일부 1',
    author: '스크랩 작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
  },
  // 추가 데이터...
];

const CollaborationScreen = () => {
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
    navigation.navigate('AddCollaborationPost');
  };

  const handleLocation = () => {
    navigation.navigate('SetLocation');
  };

  const renderContent = () => {
    const renderPostItem = ({ item }) => (
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
    );

    switch (selectedTab) {
      case 'location':
        return (
          <FlatList
            data={posts} // 지역별 글 표시
            renderItem={renderPostItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        );

      case 'popular':
        return (
          <FlatList
            data={popularData} // 인기 데이터 표시
            renderItem={renderPostItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        );

      case 'interest':
        return (
          <FlatList
            data={interestData} // 관심 데이터 표시
            renderItem={renderPostItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        );

      case 'scrap':
        return (
          <FlatList
            data={scrapData} // 스크랩 데이터 표시
            renderItem={renderPostItem}
            keyExtractor={(item, index) => index.toString()}
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
        <Text style={styles.headerTitle}>협업 모집</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}onPress={() => navigation.navigate('CollaborationSearch')}>
            <Ionicons name="search-outline" size={24} color="#2B4872" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CollaborationChat')}>
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
          <Text style={styles.tabButtonText}>분야별</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'popular' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('popular')}
        >
          <Text style={styles.tabButtonText}>인기 협업</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'scrap' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('scrap')}
        >
          <Text style={styles.tabButtonText}>스크랩</Text>
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
    marginRight: 10,
  },
  postContent: {
    flex: 1,
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
});

export default CollaborationScreen;
