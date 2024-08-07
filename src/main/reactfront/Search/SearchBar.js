import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import PostItem from '../postItem'; // PostItem 컴포넌트 가져오기
import { posts as initialPosts } from '../data/posts'; // 데이터 파일에서 가져오기

function SearchBar() {
  const [search, setSearch] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [filter, setFilter] = useState('모든작업');
  const [sortOrder, setSortOrder] = useState('최신순');
  const [popularity, setPopularity] = useState('좋아요많은순');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOrderOptions, setShowSortOrderOptions] = useState(false);
  const [showPopularityOptions, setShowPopularityOptions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // 검색어에 따른 필터링
  const filteredPosts = initialPosts ? initialPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.message.toLowerCase().includes(search.toLowerCase())
  ) : [];
  

  const handleSearch = () => {
    if (search.trim() !== '' && !searchHistory.includes(search)) {
      setSearchHistory([...searchHistory, search]);
    }
    setIsSearching(true);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const removeItem = (item) => {
    setSearchHistory(searchHistory.filter(history => history !== item));
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
    setShowSortOrderOptions(false);
    setShowPopularityOptions(false);
  };

  const toggleSortOrderOptions = () => {
    setShowSortOrderOptions(!showSortOrderOptions);
    setShowFilterOptions(false);
    setShowPopularityOptions(false);
  };

  const togglePopularityOptions = () => {
    setShowPopularityOptions(!showPopularityOptions);
    setShowFilterOptions(false);
    setShowSortOrderOptions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={require('../assets/images/useReactfront/search.png')} />
        <TextInput
          placeholder="검색"
          onChangeText={(text) => {
            setSearch(text);
            setIsSearching(text.trim() !== '');
          }}
          value={search}
          style={styles.textInput}
          onSubmitEditing={handleSearch}
        />

      </View>

      {isSearching && (
        <>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={toggleSortOrderOptions} style={styles.dropdownLabelContainer}>
                <Text style={styles.dropdownLabel}>▼</Text>
                <Text style={styles.dropdownText}>{sortOrder}</Text>
              </TouchableOpacity>
              {showSortOrderOptions && (
                <View style={styles.optionsContainer}>
                  <TouchableOpacity onPress={() => { setSortOrder('최신순'); setShowSortOrderOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>최신순</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity onPress={() => { setSortOrder('오래된순'); setShowSortOrderOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>오래된순</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.dropdown}>
              <TouchableOpacity onPress={toggleFilterOptions} style={styles.dropdownLabelContainer}>
                <Text style={styles.dropdownLabel}>▼</Text>
                <Text style={styles.dropdownText}>{filter}</Text>
              </TouchableOpacity>
              {showFilterOptions && (
                <View style={styles.optionsContainer}>
                  <TouchableOpacity onPress={() => { setFilter('모든작업'); setShowFilterOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>모든작업</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity onPress={() => { setFilter('동영상'); setShowFilterOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>동영상</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity onPress={() => { setFilter('사진'); setShowFilterOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>사진</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.dropdown}>
              <TouchableOpacity onPress={togglePopularityOptions} style={styles.dropdownLabelContainer}>
                <Text style={styles.dropdownLabel}>▼</Text>
                <Text style={styles.dropdownText}>{popularity}</Text>
              </TouchableOpacity>
              {showPopularityOptions && (
                <View style={styles.optionsContainer}>
                  <TouchableOpacity onPress={() => { setPopularity('좋아요많은순'); setShowPopularityOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>좋아요많은순</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity onPress={() => { setPopularity('스크랩많은순'); setShowPopularityOptions(false); }} style={styles.optionContainer}>
                    <Text style={styles.option}>스크랩많은순</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

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

      {!isSearching && (
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
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdownLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d3dfee',
  },
  dropdownLabel: {
    marginRight: 10,
    fontSize: 18,
  },
  dropdownText: {
    flex: 1,
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d3dfee',
    marginTop: 5,
    paddingVertical: 5,
  },
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  option: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#d3dfee',
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
  postContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    marginTop: 5,
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  infoText: {
    marginRight: 10,
    fontSize: 12,
  },
});

export default SearchBar;
