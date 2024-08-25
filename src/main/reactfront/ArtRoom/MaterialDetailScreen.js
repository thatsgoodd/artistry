import React ,{useState}from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '@/Search/SearchContainer';
const MaterialDetailScreen = ({ route }) => {
  const { material, shop } = route.params || {};
  const [searchText, setSearchText] = useState('');
  const [shops, setShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]); // 검색된 상점들 저장
  const [region, setRegion] = useState(null);
  
  if (!material || !shop) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>정보가 없습니다.</Text>
      </View>
    );
  }
  const handleSearch = () => {
    const allShops = getAllShops();
    const matchedShops = allShops.filter(shop => shop.name.includes(searchText)); // 이름에 검색어가 포함된 모든 상점 찾기

    if (matchedShops.length > 0) {
      setSelectedShops(matchedShops);
      setRegion({
        latitude: matchedShops[0].location.latitude, // 첫 번째 상점의 위치로 지도 중심 설정
        longitude: matchedShops[0].location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Alert.alert('검색 결과 없음', '해당 이름의 화방을 찾을 수 없습니다.');
      setSelectedShops([]); // 검색 결과가 없으면 선택된 상점 초기화
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.searchBarContainer}>
        <SearchBar
          searchText={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} />
      </View> */}
      <View style={styles.header}>
        {shop.logo && <Image source={{ uri: shop.logo }} style={styles.logo} />}
        <Text style={[styles.shopName, { marginLeft: 20 }]}>{shop.name}</Text>

      </View>
      <View style={styles.materialInfo}>


        {shop.images && shop.images.length > 0 && (
          <View style={styles.imagesContainer}>
            {shop.images.slice(0, 4).map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.shopImage}
                />
              </View>
            ))}
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <Text style={styles.shopAddress}>
            <Text style={styles.fontWeight}>주소: </Text>
            {shop.address}</Text>
          <Text style={styles.shopHours}>
            <Text style={styles.fontWeight}>영업시간: </Text>
            {shop.hours}</Text>
          <Text style={styles.shopPhone}>
            <Text style={styles.fontWeight}>전화번호 </Text>
            {shop.phone}</Text>
        </View>
        <View style={styles.overlay}>
          <Text> </Text>
        </View>
        <Text style={styles.stockContainer}>보유 재고</Text>
        <View style={styles.stockShow}>
          {material.image ? (
            <Image source={{ uri: material.image }} style={styles.image} />
          ) : (
            <Text>이미지 없음</Text>
          )}

          <Text style={styles.title}>{material.name}</Text>
          <Text style={styles.stock}>재고: {material.stock} 개</Text>

        </View>
        <View style={styles.stockShow}>
          {material.image ? (
            <Image source={{ uri: material.image }} style={styles.image} />
          ) : (
            <Text>이미지 없음</Text>
          )}
          <Text style={styles.title}>{material.name}</Text>
          <Text style={styles.stock}>재고: {material.stock} 개</Text>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 15,
    color: '#353535',
    zIndex: 5,
    top: 15,
    right: 50
  },
  image: {
    width: 67,
    height: 48,
    //resizeMode: 'contain',
    marginBottom: 10,
    top: 20,
    marginLeft: 30,
    zIndex: 5
  },
  stock: {
    fontSize: 15,
    zIndex: 5,
    top: 15
  },
  shopInfo: {
    marginBottom: 20,
  },
   stockContainer: {
    fontSize: 15,
    zIndex: 5,
    marginLeft: 30,
    top:10,

  },
  stockShow: {
    flexDirection: 'row',
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  overlay: {
    position: 'absolute',
    top: 400,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: '0.5',
    shadowOffset: { height: 5, width: 0 },
  },
  shopAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  shopPhone: {
    fontSize: 16,
    marginBottom: 5,
  },
  shopHours: {
    fontSize: 16,
    marginBottom: 5,
  },
  materialInfo: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginBottom: 15,
    // resizeMode: 'cover',
  },
  shopName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shopAddress: {
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
  },
  shopPhone: {
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
  },
  shopHours: {
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
  },
  shopImage: {
    width: 185,
    height: 132,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //left: 170,
    //bottom: 90,
    //width: '55%'
  },
  imageWrapper: {
    //width: '47%',
    // height: 62,
    marginBottom: 5,
    marginRight: 5,

  }, header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  fontWeight: {
    fontWeight: 'bold'
  },
  infoContainer: {
    marginLeft: 20,
    marginTop: 20
  }
});

export default MaterialDetailScreen;
