import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FreeBoard from './FreeBoard';
import WritePost from './WritePost';
import ViewPost from './ViewPost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import MenuModal from './MenuModal'; // MenuModal 컴포넌트 임포트
import Search from '../Search/SearchMain';
import SearchScreen from './SearchScreen';
import MyCommentedPosts from '../Comments/MyCommentedPosts';
import NotificationScreen from '../Notification/NotificationScreen';
import { PostProvider } from './PostContext';
import CommentSection from '../Comments/CommentSection';

const Stack = createNativeStackNavigator();

const App = () => {
  const [menuModalVisible, setMenuModalVisible] = useState(false); // MenuModal 가시성 상태 추가

  // 헤더 옵션을 반환하는 함수
  const headerOptions = (navigation) => ({
    title: '자유게시판',
    headerTintColor: '#2b4872',
    headerShadowVisible: false, // Hide shadow for iOS
    elevation: 0, // Hide shadow for Android
    headerStyle: {
      borderBottomWidth: 0, // Remove bottom border
    },
    headerRight: () => (
      <View style={styles.flexDirection}>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={require('../assets/images/useReactfront/notice.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchPadding} onPress={() => navigation.navigate('SearchScreen')}>
          <Image source={require('../assets/images/useReactfront/search.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuModalVisible(true)}>
          <Image source={require('../assets/images/useReactfront/menu.png')} />
        </TouchableOpacity>
      </View>
    ),
  });

  return (
    <PostProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="FreeBoard"
            component={FreeBoard}
            options={({ navigation }) => ({
              ...headerOptions(navigation),
              title: '자유게시판',
            })}
          />
          <Stack.Screen
            name="WritePost"
            component={WritePost}
            options={({ navigation }) => ({
              ...headerOptions(navigation),
              title: '작성하기',
            })}
          />
          <Stack.Screen
            name="ViewPost"
            component={ViewPost}
            options={({ navigation }) => ({
              title: '게시물 보기',
              headerRight: () => (
                <TouchableOpacity onPress={() => setMenuModalVisible(true)}>
                  <Image source={require('../assets/images/useReactfront/menu.png')} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="CommentSection" component={CommentSection} />

          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="DeletePost" component={DeletePost} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="MyCommentedPosts" component={MyCommentedPosts} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={({ navigation }) => ({
              ...headerOptions(navigation),
              title: '자유게시판',
            })} />


        </Stack.Navigator>


        <MenuModal
          modalVisible={menuModalVisible}
          setModalVisible={() => setMenuModalVisible(false)}
        />
      </NavigationContainer>
    </PostProvider>
  );
};

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
  },
  searchPadding: {
    paddingHorizontal: 15,
  },
});

export default App;
