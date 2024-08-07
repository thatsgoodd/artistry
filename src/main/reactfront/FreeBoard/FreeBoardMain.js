import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, Alert, TextInput, Modal
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostProvider, usePosts } from './PostContext';
import FreeBoard from './FreeBoard';
import WritePost from './WritePost';
import ViewPost from './ViewPost';

// 예시 데이터
const Stack = createNativeStackNavigator();

const App = () => (

  <NavigationContainer independent={true}>
    <PostProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="FreeBoard"
          component={FreeBoard}
          options={({ navigation }) => ({
            title: '자유게시판',
            headerTintColor: '#2b4872',
            headerShadowVisible: false, // Hide shadow for iOS
            elevation: 0, // Hide shadow for Android
            headerStyle: {
              borderBottomWidth: 0, // Remove bottom border
            },
            headerRight: () => (
              <View style={styles.flexDirection}>
                <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
                  <Image source={require('../assets/images/useReactfront/notice.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchPadding} onPress={() => navigation.navigate('Search')}>
                  <Image source={require('../assets/images/useReactfront/search.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../assets/images/useReactfront/menu.png')} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="WritePost"
          component={WritePost}
          options={{ title: '작성하기' }}
        />
        <Stack.Screen name="ViewPost" component={ViewPost} />
      </Stack.Navigator>
    </PostProvider>
  </NavigationContainer>

);

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
  },
  searchPadding: {
    paddingHorizontal: 15,
  },
});

export default App;