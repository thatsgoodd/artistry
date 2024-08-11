import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 가져오기
import { posts as initialPosts } from '../WorkSharing/posts'; // 새로운 데이터 소스에서 가져오기
import FilterSearch from './WSFilterSearch'; // FilterSearch 컴포넌트 가져오기
import SearchContainer from '../Search/SearchContainer';

const SEARCH_HISTORY_KEY = 'SEARCH_HISTORY'; // AsyncStorage에서 사용할 키

// PostItem 컴포넌트 정의
const PostItem = ({ post }) => {
  return (
    <View style={styles.postItemContainer}>
      <Image source={{ uri: post.profile }} style={styles.profileImage} />
      <View style={styles.postDetails}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.name}>{post.name}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <View style={styles.photosContainer}>
          {post.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.photo} />
          ))}
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Bookmarks: {post.bookmarkCount}</Text>
          <Text style={styles.statText}>Likes: {post.likes}</Text>
        </View>
      </View>
    </View>
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

  // 검색어에 따른 필터링
  const filteredPosts = initialPosts ? initialPosts.filter(post => {
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

  const clearHistory = async () => {
    setSearchHistory([]);
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search history', error);
    }
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
      <SearchContainer
        searchText={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />

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
          <FilterSearch onFilterChange={handleFilterChange}/>
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
            <Image
              source={require('../assets/images/useReactfront/ex1.jpg')}
              style={styles.pic} />
            <Image
              source={require('../assets/images/useReactfront/ex2.jpg')}
              style={styles.pic} />
          </View>
          <Text style={styles.color}>인기 검색</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../assets/images/useReactfront/ex3.jpg')}
              style={styles.pic} />
            <Image
              source={require('../assets/images/useReactfront/ex4.jpg')}
              style={styles.pic} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postDetails: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  photosContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#555',
  },
});

export default SearchBar;
