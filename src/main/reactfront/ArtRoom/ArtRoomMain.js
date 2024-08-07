import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, Platform, StyleSheet, Image, TextInput } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ArtRoomContent from './ArtRoomContent';

function ArtRoomMain() {
  const [location, setLocation] = useState({
    latitude: 37.78825, // 초기값, 실제 위치로 업데이트됨
    longitude: -122.4324, // 초기값, 실제 위치로 업데이트됨
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0922, // 디폴트 값
            longitudeDelta: 0.0421, // 디폴트 값
          });
          console.log('Current Position:', position);
        },
        (error) => {
          console.log('Geolocation Error:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/useReactfront/search.png')} style={styles.image} />
        <TextInput placeholder="검색" style={styles.textInput} />
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      </MapView>
      <ArtRoomContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    flex: 1,
  },
  map: {
    width:'100%',
    height:'25%'
  },
});

export default ArtRoomMain;
