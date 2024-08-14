import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import MapScreen from './MapScreen';



const ArtRoomMain = () => {

  return (
    <View style={styles.container}>
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