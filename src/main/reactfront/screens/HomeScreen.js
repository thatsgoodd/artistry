import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Image } from 'react-native';

const mockData = {
  vertical: [
    { id: '1', title: 'Vertical Item 1', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Vertical Item 2', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Vertical Item 3', image: 'https://via.placeholder.com/150' },
  ],
  horizontal: [
    { id: '1', title: 'Horizontal Item 1', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Horizontal Item 2', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Horizontal Item 3', image: 'https://via.placeholder.com/150' },
  ]
};

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Vertical Scroll Items */}
      {mockData.vertical.map(item => (
        <View key={item.id} style={styles.verticalItem}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}

      {/* Horizontal Scroll Items */}
      <View style={styles.horizontalContainer}>
        <Text style={styles.sectionTitle}>Horizontal Section</Text>
        <FlatList
          horizontal
          data={mockData.horizontal}
          renderItem={({ item }) => (
            <View style={styles.horizontalItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* More Vertical Scroll Items */}
      {mockData.vertical.map(item => (
        <View key={item.id} style={styles.verticalItem}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  verticalItem: {
    marginVertical: 10,
    alignItems: 'center',
  },
  horizontalContainer: {
    marginVertical: 20,
  },
  horizontalItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default HomeScreen;
