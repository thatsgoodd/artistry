import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import SearchBar from '../Search/SearchContainer';
import shopData from './data/shops.json'; // 상점 데이터 불러오기

const MaterialSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!searchText) {
      Alert.alert('입력 오류', '검색어를 입력해주세요.');
      return;
    }

    const matchedResults = [];
    for (const city in shopData) {
      shopData[city].forEach(district => {
        district.shops.forEach(shop => {
          shop.materials.forEach(material => {
            if (material.name.includes(searchText)) {
              matchedResults.push({
                shopName: shop.name,
                shopLogo: shop.logo,
                materialName: material.name,
                materialImage: material.image,
                materialStock: material.stock,
              });
            }
          });
        });
      });
    }

    if (matchedResults.length > 0) {
      setResults(matchedResults);
    } else {
      Alert.alert('검색 결과 없음', '해당 재료를 취급하는 상점을 찾을 수 없습니다.');
      setResults([]);
    }
  };

  const renderResultItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Image source={{ uri: item.shopLogo }} style={styles.shopLogo} />
      <View style={styles.resultDetails}>
        <Text style={styles.shopName}>{item.shopName}</Text>
        <Text style={styles.materialName}>{item.materialName}</Text>
        <Text style={styles.materialStock}>재고: {item.materialStock}</Text>
      </View>
      <Image source={{ uri: item.materialImage }} style={styles.materialImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  shopLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  resultDetails: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  materialName: {
    fontSize: 14,
    color: '#555',
  },
  materialStock: {
    fontSize: 14,
    color: '#777',
  },
  materialImage: {
    width: 50,
    height: 50,
  },
});

export default MaterialSearchScreen;
