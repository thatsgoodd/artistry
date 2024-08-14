import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ShopInfo = ({ shop }) => {
  return (
    <View style={styles.shopInfoContainer}>
      {/* <Image source={{ uri: shop.logo }} style={styles.shopLogo} /> */}
      <Text style={styles.shopName}>{shop.name}</Text>
      <Text style={styles.shopAddress}>주소: {shop.address}</Text>
      <Text style={styles.shopHours}>영업시간: {shop.hours}</Text>
      <Text style={styles.shopPhone}>전화번호: {shop.phone}</Text>
     
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
    </View>
  );
};

const styles = StyleSheet.create({
  shopInfoContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    height: 152,
    elevation: 10,
  },
  shopName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shopAddress: {
    fontSize: 10,
    marginBottom: 5,
  },
  shopPhone: {
    fontSize: 10,
    marginBottom: 5,
  },
  shopHours: {
    fontSize: 10,
    marginBottom: 5,
  },
  shopImage: {
    width: 90,
    height: 65,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    left:170,
    bottom:90,
    width:'55%'
  },
  imageWrapper: {
    width: '47%',
    height: 62,
    marginBottom: 10,
    marginRight:5,
  
  },
});

export default ShopInfo;
