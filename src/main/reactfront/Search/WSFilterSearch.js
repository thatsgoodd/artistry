import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { sortPosts } from './filterCondition'; // 필터 및 정렬 로직을 가져옵니다.

const FilterSearch = ({ posts = [], onFilterChange }) => { // posts의 기본값을 빈 배열로 설정합니다.
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPopularity, setSelectedPopularity] = useState('');

  const [isPeriodVisible, setIsPeriodVisible] = useState(false);
  const [isTypeVisible, setIsTypeVisible] = useState(false);
  const [isPopularityVisible, setIsPopularityVisible] = useState(false);

  const handlePeriodSelect = (value) => {
    setSelectedPeriod(value);
    setIsPeriodVisible(false);
    const sortedPosts = sortPosts(posts, value, selectedType, selectedPopularity);
    onFilterChange(sortedPosts);
  };

  const handleTypeSelect = (value) => {
    setSelectedType(value);
    setIsTypeVisible(false);
    const sortedPosts = sortPosts(posts, selectedPeriod, value, selectedPopularity);
    onFilterChange(sortedPosts);
  };

  const handlePopularitySelect = (value) => {
    setSelectedPopularity(value);
    setIsPopularityVisible(false);
    const sortedPosts = sortPosts(posts, selectedPeriod, selectedType, value);
    onFilterChange(sortedPosts);
  };

  return (
    <View style={styles.container}>
      {/* 기간별 필터 */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsPeriodVisible(!isPeriodVisible)}
        >
          <AntDesign name="down" size={15} color="#2b4872" style={styles.icon} />
          <Text style={styles.dropdownText}>{selectedPeriod || '기간별'}</Text>
        </TouchableOpacity>
        {isPeriodVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={[styles.menuItem, styles.borderBottomWidth]}
              onPress={() => handlePeriodSelect('최신순')}
            >
              <Text style={styles.menuText}>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handlePeriodSelect('오래된순')}
            >
              <Text style={styles.menuText}>오래된순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 작업 유형 필터 */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsTypeVisible(!isTypeVisible)}
        >
          <AntDesign name="down" size={15} color="#2b4872" style={styles.icon} />
          <Text style={styles.dropdownText}>{selectedType || '작업 유형'}</Text>
        </TouchableOpacity>
        {isTypeVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={[styles.menuItem, styles.borderBottomWidth]}
              onPress={() => handleTypeSelect('모든 작업')}
            >
              <Text style={styles.menuText}>모든 작업</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuItem, styles.borderBottomWidth]}
              onPress={() => handleTypeSelect('동영상')}
            >
              <Text style={styles.menuText}>동영상</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleTypeSelect('사진')}
            >
              <Text style={styles.menuText}>사진</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 인기순 필터 */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsPopularityVisible(!isPopularityVisible)}
        >
          <AntDesign name="down" size={14} color="#2b4872" style={styles.icon} />
          <Text style={styles.dropdownText}>{selectedPopularity || '인기순'}</Text>
        </TouchableOpacity>
        {isPopularityVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={[styles.menuItem, styles.borderBottomWidth]}
              onPress={() => handlePopularitySelect('좋아요 많은순')}
            >
              <Text style={styles.menuText}>좋아요 많은순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handlePopularitySelect('스크랩 많은순')}
            >
              <Text style={styles.menuText}>스크랩 많은순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffffff'
  },
  dropdownContainer: {
    position: 'relative',
    flex: 1,
    marginHorizontal: 2,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 29,
    borderColor: '#d3dfee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure icon and text are spaced
  },
  icon: {
    marginRight: 10,
  },
  dropdownText: {
    textAlign: 'center',
    color: '#2b4872',
    fontSize: 12,
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 42, // 드롭다운 버튼 바로 아래에 위치시킵니다.
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3dfee',
    borderRadius: 14,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15, // Ensure padding is sufficient for click
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#2b4872',
  },
  borderBottomWidth: {
    borderBottomWidth: 1,
    borderColor: '#d3dfee',
  },
});

export default FilterSearch;
