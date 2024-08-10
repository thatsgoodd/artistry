import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const AddRegion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Region Screen</Text>
      {/* 추가적인 내용은 여기에 추가 */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4872',
  },
});

export default AddRegion;
