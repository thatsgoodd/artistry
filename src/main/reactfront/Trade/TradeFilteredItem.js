import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocation } from './TradeLocationContext'; // Context import

const items = [
  { id: '1', title: 'Item 1', province: '서울', district: '강남구' },
  { id: '2', title: 'Item 2', province: '경기', district: '수원시' },
  // 추가 아이템들...
];

const FilteredItems = () => {
  const { selectedLocation } = useLocation();

  const filteredItems = items.filter(item => 
    (selectedLocation.province ? item.province === selectedLocation.province : true) &&
    (selectedLocation.district ? item.district === selectedLocation.district : true)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default FilteredItems;
