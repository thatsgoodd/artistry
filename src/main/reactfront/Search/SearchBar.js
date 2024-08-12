import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 가져오기
import posts from '../WorkSharing/posts'; // default로 내보낸 posts 가져오기
import FilterSearch from './WSFilterSearch'; // FilterSearch 컴포넌트 가져오기
import SearchContainer from '../Search/SearchContainer';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
import RecommendSearch from './RecommendSearch';
import HotSearch from './HotSearch';
const SEARCH_HISTORY_KEY = 'SEARCH_HISTORY'; // AsyncStorage에서 사용할 키
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// PostItem 컴포넌트 정의
const PostItem = ({ post }) => {

  const navigation= useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: post })}>
      <View style={styles.postItemContainer}>
        {/* 왼쪽: 첫 번째 사진 */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.photos[0] }} style={styles.mainImage} />
        </View>

        {/* 오른쪽: 텍스트와 기타 정보 */}
        <View style={styles.detailsContainer}>
          {/* 글 제목 */}
          <Text style={styles.title}>{post.title}</Text>

          {/* 글 내용 */}
          <Text style={styles.content}>{post.content}</Text>

          {/* 작성자 프로필사진과 작성자 이름 */}
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.authorContainer}>
              <Image source={{ uri: post.profile }} style={styles.profileImage} />
              <Text style={styles.authorName}>{post.name}</Text>
            </View>

            {/* 좋아요 및 북마크 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Feather name="thumbs-up" size={16} color="#2b4872"
                  style={styles.statIcon} />
                <Text style={styles.statText}>{post.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <Feather name="bookmark" size={16} color="#2b4872" style={styles.statIcon} />
                <Text style={styles.statText}>{post.bookmarkCount}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function SearchBar() {
  const [search, setSearch] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false); // 검색 완료 상태 추가

  // 필터 상태를 FilterSearch에서 관리할 수 있도록 상태를 설정합니다.
  const [filters, setFilters] = useState({
    selectedPeriod: '',
    selectedType: '',
    selectedPopularity: '',
  });

  // posts 데이터 확인용
  useEffect(() => {
    console.log('Initial Posts:', posts);
  }, []);

  // 검색어에 따른 필터링
  const filteredPosts = posts ? posts.filter(post => {
    const matchesSearchQuery = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesPeriod = filters.selectedPeriod ? post.period === filters.selectedPeriod : true;
    const matchesType = filters.selectedType ? post.categoryId === filters.selectedType : true;
    const matchesPopularity = filters.selectedPopularity ? post.bookmarkCount === filters.selectedPopularity : true;

    return matchesSearchQuery && matchesPeriod && matchesType && matchesPopularity;
  }) : [];

  useEffect(() => {
    // 컴포넌트가 마운트될 때 검색 기록을 불러옴
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading search history', error);
      }
    };

    loadSearchHistory();
  }, []);

  useEffect(() => {
    // 검색어가 비어 있지 않을 때 검색 상태를 true로 설정, 검색 완료 상태를 false로 설정
    if (search.trim() !== '') {
      setIsSearching(true);
      setIsSearchComplete(false); // 검색 완료 상태 초기화
    } else {
      setIsSearching(false);
    }
  }, [search]);

  const handleSearch = async () => {
    if (search.trim() !== '' && !searchHistory.includes(search)) {
      const newHistory = [...searchHistory, search];
      setSearchHistory(newHistory);
      try {
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving search history', error);
      }
    }
    setIsSearchComplete(true); // 검색 완료 상태로 설정
    setIsSearching(false); // 검색 완료 시 검색 상태 false로 설정
  };


  const removeItem = async (item) => {
    const newHistory = searchHistory.filter(history => history !== item);
    setSearchHistory(newHistory);
    try {
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error updating search history', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SearchContainer
          searchText={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
      </View>
      {/* 검색어 입력 중일 때만 최근 검색 기록 표시 */}
      {isSearching && (
        <>
          <FlatList
            data={searchHistory}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <TouchableOpacity onPress={() => removeItem(item)} style={styles.removeButton}>
                  <Image source={require('../assets/images/useReactfront/rotate-cw.png')} style={styles.removeIcon} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10 }}>{item}</Text>
              </View>
            )}
            keyExtractor={(item) => item}
          />
        </>
      )}

      {/* 검색 완료 후 필터 및 필터링된 게시물 표시 */}
      {isSearchComplete && (
        <>
          <View style={{ zIndex: 200, paddingHorizontal: 20 }}>
            <FilterSearch onFilterChange={handleFilterChange} />
          </View>
          <FlatList
            data={filteredPosts}
            renderItem={({ item }) => <PostItem post={item} />}
            keyExtractor={(item) => item.id.toString()} // assuming `id` is unique for each post
            refreshControl={
              <RefreshControl
                refreshing={false} // Set this to a state variable for actual refresh functionality
                onRefresh={() => { }}
              />
            }
          />
        </>
      )}

      {/* 검색어가 비어 있을 때만 추천 검색 및 인기 검색 표시 */}
      {!isSearching && !isSearchComplete && search.trim() === '' && (
        <View style={styles.bottomContainer}>
          <Text style={styles.color}>추천 검색</Text>
          <View style={{ flexDirection: 'row' }}>
            <RecommendSearch/>
          </View>
          <Text style={styles.color}>인기 검색</Text>
          <View style={{ flexDirection: 'row' }}>
           <HotSearch/>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  color: {
    color: '#2b4872',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  textInput: {
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    height: 35,
    paddingLeft: 20,
    marginLeft: 10,
    borderColor: '#d3dfee',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  removeButton: {
    padding: 5,
  },
  removeIcon: {
    width: 17,
    height: 17,
  },
  bottomContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  pic: {
    width: 190,
    height: 160,
  },

  postItemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    //padding: 20,
    backgroundColor: '#f9f9f9',
    marginHorizontal: -20,
    elevation: 10,
    height: 154

  },
  imageContainer: {
    flex: 1,
    marginRight: 10,
  },
  mainImage: {
    width: 214,
    height: 154,
    marginRight: 5

  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    top: 20
  },
  content: {
    fontSize: 11,
    color: '#333',
    marginBottom: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  authorName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    left: 50,
    bottom: 5
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 18,
    height: 20,
    marginHorizontal: 8,
    right: 20

  },
  statText: {
    fontSize: 10,
    color: '#2b4872',
    alignItems: 'center',
    justifyContent: 'center',
    right: 25
  },
});

export default SearchBar;
