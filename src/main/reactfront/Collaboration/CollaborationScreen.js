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

const collaborationsData = [
  {
    title: '관심 분야 협업 제목 1',
    content: '관심 분야 협업 내용 일부 1',
    time: '3시간 전',
    profileImage: 'https://example.com/profile3.jpg',
    author: '작성자3',
  },
  {
    title: '관심 분야 협업 제목 2',
    content: '관심 분야 협업 내용 일부 2',
    time: '4시간 전',
    profileImage: 'https://example.com/profile4.jpg',
    author: '작성자4',
  },
  {
    title: '관심 분야 협업 제목 3',
    content: '관심 분야 협업 내용 일부 3',
    time: '5시간 전',
    profileImage: 'https://example.com/profile5.jpg',
    author: '작성자5',
  },
  {
    title: '관심 분야 협업 제목 4',
    content: '관심 분야 협업 내용 일부 4',
    time: '6시간 전',
    profileImage: 'https://example.com/profile6.jpg',
    author: '작성자6',
  },
  // 추가 데이터...
];

const Collaboration = () => {
  const [selectedTab, setSelectedTab] = useState('collaborations');
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

  const renderContent = () => {
    switch (selectedTab) {
      case 'collaborations':
        return (
          <FlatList
            data={[
              { type: 'popularity', data: posts.slice(0, 1), key: 'popularity' },
              { type: 'interest', data: collaborationsData.slice(0, 4), key: 'interest' },
              { type: 'all', data: collaborationsData.slice(0, 4), key: 'all' },
            ]}
            renderItem={({ item }) => {
              switch (item.type) {
                case 'popularity':
                  return (
                    <>
                      <Text style={styles.sectionTitle}>인기 협업</Text>
                      <FlatList
                        data={item.data}
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
                        numColumns={1}
                      />
                    </>
                  );
        
                case 'interest':
                  return (
                    <>
                      <Text style={styles.sectionTitle}>관심 분야 협업</Text>
                      <FlatList
                        data={item.data}
                        renderItem={({ item }) => (
                          <View style={styles.postsContainer}>
                            <View style={styles.postContainer}>
                              {item.profileImage ? (
                                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                              ) : null}
                              <View style={styles.textContainer}>
                                <Text style={styles.postTitle}>{item.title}</Text>
                                <Text style={styles.postContent}>{item.content}</Text>
                                <Text style={styles.postTime}>{item.time}</Text>
                              </View>
                            </View>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                      />
                    </>
                  );
        
                case 'all':
                  return (
                    <>
                      <Text style={styles.sectionTitle}>전체 글</Text>
                      <FlatList
                        data={item.data}
                        renderItem={({ item }) => (
                          <View style={styles.postsContainer}>
                            <View style={styles.postContainer}>
                              {item.profileImage ? (
                                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                              ) : null}
                              <View style={styles.textContainer}>
                                <Text style={styles.postTitle}>{item.title}</Text>
                                <Text style={styles.postContent}>{item.content}</Text>
                                <Text style={styles.postTime}>{item.time}</Text>
                              </View>
                            </View>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                      />
                    </>
                  );
                  
                default:
                  return null;
              }
            }}
            keyExtractor={(item) => item.key}
          />
        );

      case 'scrap':
        return (
          <>
            <Text style={styles.sectionTitle}>스크랩 글</Text>
            <FlatList
              data={collaborationsData.slice(0, 4)}  // 스크랩된 글 4개 표시
              renderItem={({ item }) => (
                <View style={styles.postsContainer}>
                  <View style={styles.postContainer}>
                    {item.profileImage ? (
                      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                    ) : null}
                    <View style={styles.textContainer}>
                      <Text style={styles.postTitle}>{item.title}</Text>
                      <Text style={styles.postContent}>{item.content}</Text>
                      <Text style={styles.postTime}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              )}
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
          style={[styles.tabButton, selectedTab === 'collaborations' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('collaborations')}
        >
          <Text style={styles.tabButtonText}>협업</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'scrap' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('scrap')}
        >
          <Text style={styles.tabButtonText}>스크랩</Text>
        </TouchableOpacity>
      </View>

      {/* 드롭다운이 탭 바 아래에 위치하도록 함 */}
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

      {renderContent()}

      <FloatingWritingButton onPress={handlePressAddPost} />
    </SafeAreaView>
  );
};

const CollaborationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Collaboration />
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

export default CollaborationScreen;