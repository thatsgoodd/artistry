import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

// 예시 카테고리 데이터
const categories = [
  { id: '1', name: 'Sports', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Technology', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Music', image: 'https://via.placeholder.com/100' },
  { id: '4', name: 'Movies', image: 'https://via.placeholder.com/100' },
  { id: '5', name: 'Books', image: 'https://via.placeholder.com/100' },
];

// 예시 게시글 데이터
const posts = {
  '1': [
    { id: '1', title: 'Football Match Today' },
    { id: '2', title: 'Basketball Finals Recap' },
  ],
  '2': [
    { id: '3', title: 'Latest Tech Innovations' },
    { id: '4', title: 'AI in 2024' },
  ],
  '3': [
    { id: '5', title: 'Top 10 Albums of 2024' },
    { id: '6', title: 'Concert Reviews' },
  ],
  '4': [
    { id: '7', title: 'Upcoming Movie Releases' },
    { id: '8', title: 'Oscars 2024 Predictions' },
  ],
  '5': [
    { id: '9', title: 'Best Selling Novels' },
    { id: '10', title: 'Author Interviews' },
  ],
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      <FlatList
        data={posts[selectedCategory]}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        style={styles.postList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryList: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  postList: {
    padding: 10,
  },
  postItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  postText: {
    fontSize: 16,
  },
});

export default App;
