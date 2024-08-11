import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import data from './data/siGungu.json'; // JSON 파일 경로에 맞게 수정

const LocationSelector = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    // 시 데이터 초기화
    const cities = data.map(area => ({
      label: area.name,
      value: area.name,
    }));
    setCityOptions(cities);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // 선택된 시에 따른 군/구 데이터 초기화
      const cityData = data.find(area => area.name === selectedCity);
      if (cityData) {
        setDistrictOptions(cityData.subArea.map(district => ({
          label: district,
          value: district,
        })));
      }
    } else {
      // 시가 선택되지 않았을 경우 군/구 데이터 비워두기
      setDistrictOptions([]);
    }
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.selectedText}>
          {selectedDistrict ? selectedDistrict : '선택된 구 없음'}
        </Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.columnContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>시.도</Text>
            <View style={styles.line} />
          </View>
          <ScrollView style={styles.leftColumn} contentContainerStyle={styles.columnContent}>
            {cityOptions.map(city => (
              <TouchableOpacity
                key={city.value}
                style={styles.item}
                onPress={() => handleCitySelect(city.value)}
              >
                <Text style={styles.itemText}>{city.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.columnContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>시.군.구</Text>
            <View style={styles.line} />
          </View>
          <ScrollView style={styles.rightColumn} contentContainerStyle={styles.columnContent}>
            {districtOptions.map(district => (
              <TouchableOpacity
                key={district.value}
                style={styles.item}
                onPress={() => handleDistrictSelect(district.value)}
              >
                <Text style={styles.itemText}>{district.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
    padding: 10,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  selectedText: {
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  leftColumn: {
    width: '100%',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  rightColumn: {
    width: '100%',
  },
  columnContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  labelContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
});

export default LocationSelector;
