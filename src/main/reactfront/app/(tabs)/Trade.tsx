import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import FloatingWritingButton from '../../components/FloatingWritingButton';
import { useNavigation } from '@react-navigation/native';

const postsData = {
  seoul: [
    {
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
    image: 'https://example.com/interest1.jpg',
    title: '관심 거래 제목 1',
    description: '관심 거래 내용 일부 1',
    author: '관심 작성자1',
    time: '1시간 전',
    profileImage: 'https://example.com/profile1.jpg',
  },
  {
    image: 'https://example.com/interest2.jpg',
    title: '관심 거래 제목 2',
    description: '관심 거래 내용 일부 2',
    author: '관심 작성자2',
    time: '2시간 전',
    profileImage: 'https://example.com/profile2.jpg',
  },
  {
    image: 'https://example.com/interest3.jpg',
    title: '관심 거래 제목 3',
    description: '관심 거래 내용 일부 3',
    author: '관심 작성자3',
    time: '3시간 전',
    profileImage: 'https://example.com/profile3.jpg',
  },
  {
    image: 'https://example.com/interest4.jpg',
    title: '관심 거래 제목 4',
    description: '관심 거래 내용 일부 4',
    author: '관심 작성자4',
    time: '4시간 전',
    profileImage: 'https://example.com/profile4.jpg',
  },
];
const purchaseData = [
  {
    image: 'https://example.com/purchase1.jpg',
    title: '구매 내역 제목 1',
    description: '구매 내역 내용 일부 1',
    author: '구매자1',
    time: '어제',
    profileImage: 'https://example.com/profile5.jpg',
  },
  {
    image: 'https://example.com/purchase2.jpg',
    title: '구매 내역 제목 2',
    description: '구매 내역 내용 일부 2',
    author: '구매자2',
    time: '2일 전',
    profileImage: 'https://example.com/profile6.jpg',
  },
  {
    image: 'https://example.com/purchase3.jpg',
    title: '구매 내역 제목 3',
    description: '구매 내역 내용 일부 3',
    author: '구매자3',
    time: '3일 전',
    profileImage: 'https://example.com/profile7.jpg',
  },
  {
    image: 'https://example.com/purchase4.jpg',
    title: '구매 내역 제목 4',
    description: '구매 내역 내용 일부 4',
    author: '구매자4',
    time: '4일 전',
    profileImage: 'https://example.com/profile8.jpg',
  },
];
const saleData = [
  {
    image: 'https://example.com/sale1.jpg',
    title: '판매 내역 제목 1',
    description: '판매 내역 내용 일부 1',
    author: '판매자1',
    time: '오늘',
    profileImage: 'https://example.com/profile9.jpg',
  },
  {
    image: 'https://example.com/sale2.jpg',
    title: '판매 내역 제목 2',
    description: '판매 내역 내용 일부 2',
    author: '판매자2',
    time: '2시간 전',
    profileImage: 'https://example.com/profile10.jpg',
  },
  {
    image: 'https://example.com/sale3.jpg',
    title: '판매 내역 제목 3',
    description: '판매 내역 내용 일부 3',
    author: '판매자3',
    time: '5시간 전',
    profileImage: 'https://example.com/profile11.jpg',
  },
  {
    image: 'https://example.com/sale4.jpg',
    title: '판매 내역 제목 4',
    description: '판매 내역 내용 일부 4',
    author: '판매자4',
    time: '어제',
    profileImage: 'https://example.com/profile12.jpg',
  },
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
    navigation.navigate('AddTradePost');
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
          <>
            <Text style={styles.sectionTitle}>지역별</Text>
            <FlatList
              data={posts} // 지역별 글 표시
              renderItem={renderPostItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
            />
          </>
        );
  
      case 'interest':
        return (
          <>
            <Text style={styles.sectionTitle}>관심 거래</Text>
            <FlatList
              data={interestData} // 지역별 글 표시
              renderItem={renderPostItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
            />
          </>
        );
  
      case 'purchase':
        return (
          <>
            <Text style={styles.sectionTitle}>구매 내역</Text>
            <FlatList
              data={purchaseData} // 구매 내역 데이터 표시
              renderItem={renderPostItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
            />
          </>
        );
  
      case 'sale':
        return (
          <>
            <Text style={styles.sectionTitle}>판매 내역</Text>
            <FlatList
              data={saleData} // 판매 내역 데이터 표시
              renderItem={renderPostItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
            />
          </>
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

      {/* 드롭다운이 지역별 탭에만 나타나도록 조건을 추가 */}
      {selectedTab === 'location' && (
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
      )}

      {renderContent()}

      <FloatingWritingButton onPress={handlePressAddPost} />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CollaborationScreen />
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
  dropDownPicker: {
    width: '22%',
    minHeight: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: '3%',
    marginVertical: 10,
    zIndex: 10,

  },
  dropDownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    width: '22%',
    minHeight: 30,
    marginHorizontal: '3%',
    zIndex: 10,
  },
  dropDownText: {
    textAlign: 'center',
    fontSize: 11,
    zIndex: 10,
  },
  dropDownPlaceholder: {
    fontSize: 10,
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#2B4872",
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
    zIndex: 1,
  },
  postsContainer: {
    paddingHorizontal: 10,
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
  textContainer: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    color: '#555',
    flexShrink: 1,
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

export default App;
