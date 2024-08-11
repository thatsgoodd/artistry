// SearchBar.js
import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';

const SearchBar = ({ searchText, onChangeText, onSubmitEditing }) => {
  return (
    <View style={styles.searchBar}>
      <Image source={require('../assets/images/useReactfront/search.png')} />
      <TextInput
        style={styles.searchInput}
        placeholder="검색 내용"
        value={searchText}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    height: 35,
    paddingLeft: 20,
    marginLeft: 10,
    borderColor: '#d3dfee',
  },
  searchBar: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

export default SearchBar;
