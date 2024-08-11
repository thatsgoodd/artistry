import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Picker } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import Dropdowns from './Dropdowns';
import MapScreen from './MapScreen';



const ArtRoomMain = () => {
  return (
    <View style={styles.container}>
      {/* <Dropdowns /> */}
      <MapScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default ArtRoomMain;