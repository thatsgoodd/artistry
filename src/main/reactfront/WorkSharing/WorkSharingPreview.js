import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WorkSharingPreview = ({ title, sections =[] }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {sections.map(({ subtitle, data }) => (
        <View key={subtitle}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.itemsContainer}>
            {data.map((item) => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.creatorName} onPress={() => router.push(item.creatorPage)}>{item.creatorName}</Text>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                  onClick={() => router.push(item.itemPage)}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default WorkSharingPreview;

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  title: {
    fontSize: 18,
    color: "#2B4872",
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    left:4,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    width: '31%',
    alignItems: 'center',
    marginVertical: 3,
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 4,
    borderRadius: 10,
    marginBottom: 10,
    
  },
  creatorName: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    zIndex: 1,
    color: '#fff',
    padding: 3,
}

});