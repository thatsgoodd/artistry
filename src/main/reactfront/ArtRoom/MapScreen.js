import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import shopData from './data/shops.json'; // shops 데이터 불러오기
import siGunguData from './data/siGungu.json'; // 시군구 데이터 불러오기
import AntDesign from '@expo/vector-icons/AntDesign';
import SearchBar from '../Search/SearchContainer';
const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [region, setRegion] = useState(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [searchText, setSearchText] = useState(''); // 검색어 상태 추가
  

  
  useEffect(() => {
    const cities = siGunguData.map(area => ({
      label: area.name,
      value: area.name,
    }));
    setCityOptions(cities);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const cityData = siGunguData.find(area => area.name === selectedCity);
      if (cityData) {
        setDistrictOptions(cityData.subArea.map(district => ({
          label: district,
          value: district,
        })));
      }
    } else {
      setDistrictOptions([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      setLocationGranted(true);
      const location = await Location.getCurrentPositionAsync();
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  useEffect(() => {
    if (selectedDistrict && selectedCity && shopData[selectedCity]) {
      const districtData = shopData[selectedCity].find(district => district.district === selectedDistrict);
      if (districtData) {
        setRegion({
          latitude: districtData.center.latitude,
          longitude: districtData.center.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    }
  }, [selectedDistrict, selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null); // 시가 바뀔 때 군/구 초기화
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setShowDropdown(false); // 드롭다운 닫기
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // 드롭다운 토글
  };

  const getAllShops = () => {
    let allShops = [];
    for (const city in shopData) { // shopData로 수정
      shopData[city].forEach(district => {
        allShops = allShops.concat(district.shops);
      });
    }
    return allShops;
  };


  const handleSearch = () => {
    const allShops = getAllShops();
    const matchedShop = allShops.find(shop => shop.name.includes(searchText));

    if (matchedShop) {
      setRegion({
        latitude: matchedShop.location.latitude,
        longitude: matchedShop.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Alert.alert('검색 결과 없음', '해당 이름의 화방을 찾을 수 없습니다.');
    }
  };

  const shops = getAllShops();

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchText={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} />
      </View>

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.selectedText}>
            {selectedDistrict ? selectedDistrict : '선택'}
          </Text>
          <TouchableOpacity onPress={toggleDropdown}>
            <Text style={styles.dropdownToggle}>
              <AntDesign name="down" size={12} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDropdown && (
        <View style={styles.dropdownContainer}>
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
              <Text style={[styles.label, { right: 30 }]}>시.군.구</Text>
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
      )}

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {shops.map(shop => (
          <Marker
            key={shop.id}
            coordinate={shop.location}
            title={shop.name}
            description={shop.address}
          >
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{shop.name}</Text>
                <Text style={styles.calloutText}>{shop.address}</Text>
                {shop.image && (
                  <Image source={{ uri: shop.image }} style={styles.calloutImage} />
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    
    margin:-20
  },
  map: {
    width: 420,
    height: 245,
   // right: 15,
    margin:0,
    padding:0
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
  },
  dropdownToggle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    right: 270,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: 100, // 헤더 바로 아래에 위치
    left: 0,
    right: 0,
    zIndex: 1000,
    maxHeight: '70%', // 드롭다운의 최대 높이 설정
    flexDirection: 'row'
  },
  leftColumn: {
    width: 118,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  rightColumn: {
    width: 314,
    right: 30
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
    fontSize: 20,
    color: '#2b4872',
    top: 20,
    height: 60
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
  calloutContainer: {
    width: 209,
    height: 136,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 5,
  },
  calloutImage: {
    width: 100,
    height: 50,
  },
});

export default MapScreen;
