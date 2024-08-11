import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const regions = [
  { label: '대구', value: 'daegu' },
  { label: '인천', value: 'incheon' },
  // 추가 지역...
];

const RegionSelectionScreen = ({ navigation, route }) => {
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleRegionSelect = (region) => {
    if (!selectedRegions.includes(region)) {
      const updatedRegions = [...selectedRegions, region].slice(-4);
      setSelectedRegions(updatedRegions);
      route.params.onRegionSelect(updatedRegions); // 선택한 지역을 이전 화면으로 전달
      navigation.goBack(); // 이전 화면으로 돌아가기
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지역 선택</Text>
      <FlatList
        data={regions}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.regionButton} onPress={() => handleRegionSelect(item)}>
            <Text style={styles.regionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  regionButton: { padding: 15, backgroundColor: '#f0f0f0', marginVertical: 5, borderRadius: 10 },
  regionText: { fontSize: 16 },
});

export default RegionSelectionScreen;
