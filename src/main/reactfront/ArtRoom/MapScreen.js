import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert, FlatList, Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import shopData from './data/shops.json'; // 초기 shops 데이터
import siGunguData from './data/siGungu.json'; // 시군구 데이터 불러오기
import AntDesign from '@expo/vector-icons/AntDesign';
import SearchBar from '../Search/SearchContainer';
import ShopInfo from './ShopInfo'; // ShopInfo 컴포넌트 가져오기
import MaterialInfo from './MaterialInfo';
import { useNavigation } from 'expo-router';

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
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]); // 검색된 상점들 저장
  const [searchType, setSearchType] = useState('shop');
  const navigation = useNavigation(); // Navigation hook

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
    if (selectedDistrict && selectedCity) {
      fetchShopsData(selectedCity, selectedDistrict);
    }
  }, [selectedDistrict, selectedCity]);

  const fetchShopsData = async (city, district) => {
    try {
      console.log("Fetching data for city:", city, "and district:", district);

      const cityData = shopData[city];
      if (!cityData) {
        console.error("No data found for city:", city);
        return;
      }

      const districtData = cityData.find(d => d.district === district);
      if (!districtData) {
        console.error("No data found for district:", district);
        return;
      }

      setShops(districtData.shops);
      setRegion({
        latitude: districtData.center.latitude,
        longitude: districtData.center.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

    } catch (error) {
      console.error('Failed to fetch shop data:', error);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getAllShops = () => {
    let allShops = [];
    for (const city in shopData) {
      shopData[city].forEach(district => {
        allShops = allShops.concat(district.shops);
      });
    }
    return allShops;
  };

  const handleSearch = () => {
    const allShops = getAllShops();

    // 상점 이름으로 검색
    const matchedShops = allShops.filter(shop =>
      shop.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // 재료 이름으로 검색
    let materialResults = [];

    allShops.forEach(shop => {
      const matchingMaterials = shop.materials.filter(material =>
        material.name.toLowerCase().includes(searchText.toLowerCase())
      );

      if (matchingMaterials.length > 0) {
        materialResults.push({
          shop,
          materials: matchingMaterials,
        });
      }
    });

    // 검색 결과 설정
    setSelectedShops(matchedShops);
    setSearchResults(materialResults);

    // 지도 위치 설정
    if (matchedShops.length > 0) {
      setRegion({
        latitude: matchedShops[0].location.latitude,
        longitude: matchedShops[0].location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else if (materialResults.length > 0) {
      setRegion({
        latitude: materialResults[0].shop.location.latitude,
        longitude: materialResults[0].shop.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Alert.alert('검색 결과 없음', '해당 이름의 상점 또는 재료를 찾을 수 없습니다.');
    }
  };

  const handleMaterialPress = (material, shop) => {
    navigation.navigate('MaterialDetailScreen', { material, shop });
  };

  const renderShopItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ShopDetailScreen', { shop: item })}>
      <ShopInfo shop={item} />
    </TouchableOpacity>
  );

  const renderMaterialItem = ({ item }) => (
    <View style={styles.resultItem}>
      {item.materials.map(material => (
        <TouchableOpacity key={material.name} onPress={() => handleMaterialPress(material, item.shop)}>
          <MaterialInfo shop={item.shop} material={material} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchText={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
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
        {selectedShops.map((shop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: shop.location.latitude,
              longitude: shop.location.longitude,
            }}
            title={shop.name}
          />
        ))}
      </MapView>

      <View style={styles.resultContainer}>
        <FlatList
          data={selectedShops}
          renderItem={renderShopItem}
          keyExtractor={(item) => item.name}
          style={styles.flatList}
        />

        <FlatList
          data={searchResults}
          renderItem={renderMaterialItem}
          keyExtractor={(item, index) => item.shop.name + index}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: -15
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginBottom: 15,
    // resizeMode: 'cover',
  },
 
  map: {
    width: '100%',
    height: 245,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
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
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000,
    maxHeight: '70%',
    flexDirection: 'row',
  },
  leftColumn: {
    width: 118,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  rightColumn: {
    width: 314,
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
    height: 60,
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  resultList: {
    flexGrow: 1,
  },
  resultItem: {
    marginBottom: 20,
    padding: 10,
    //borderBottomWidth: 1,
    borderColor: '#ccc',
    //alignItems:'center'
  },
  shopName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    bottom: 5
  },
  shopAddress: {
    fontSize: 16,
    color: '#555',
  },
  shopPhone: {
    fontSize: 14,
    color: '#777',
  },
  shopHours: {
    fontSize: 14,
    color: '#777',
  },
  materialItem: {
    //marginTop: 10,
    // padding: 5,
    //borderTopWidth: 1,
    //borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  materialStock: {
    fontSize: 13,
    color: '#2b4872',
  },
  materialImage: {
    width: 139,
    height: 76,
    marginTop: 5,
    // borderWidth: 1
  },
});

export default MapScreen;
