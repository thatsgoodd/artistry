import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MaterialInfo = ({ shop, material }) => {
  return (
    <View style={styles.materialContainer}>
      <View style={[styles.flexDirection, { alignItems: 'center' }]}>
        <Image source={{ uri: shop.logo }} style={styles.logo} />
        <Text style={styles.shopName}>{shop.name}</Text>
      </View>
      <View style={[styles.flexDirection,{alignItems:'center',justifyContent:'space-between'}]}>
       
        {material.image && <Image source={{ uri: material.image }} style={styles.materialImage} />}
        <Text style={styles.materialName}>{material.name}</Text>
        <Text style={styles.materialStock}>재고: {material.stock} 개</Text>
      </View>
    </View>
  );
};

// 스타일 설정
const styles = StyleSheet.create({
  materialContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:15
  },
  materialName: {
    fontSize: 18,
    color: '#333',
  },
  materialStock: {
    fontSize: 16,
    color: '#888',
  },
  materialImage: {
    width: 139,
    height: 76,
    marginTop: 10,
    //resizeMode: 'contain',
  },
   logo: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginLeft:30
  },
  flexDirection: {
    flexDirection: 'row'
  }
});


export default MaterialInfo;
