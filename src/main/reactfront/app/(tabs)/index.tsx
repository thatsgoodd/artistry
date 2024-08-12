import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Home/HomeScreen'
import ArtRoom from '../../ArtRoom/ArtRoomMain';
import Search from '../../Search/SearchBar';
import WorkSharingScreen from '../../WorkSharing/WorkSharingScreen';
import WorkSharingWritePost from '../../WorkSharing/WorkSharingWritePost';
import FreeBoard from '../../FreeBoard/FreeBoardMain';
import Notice from '../../Notification/NoticeMain';
import PostDetail from '../../WorkSharing/PostDetails';
import WritePost from '../../FreeBoard/WritePost';
import EditPost from '@/FreeBoard/EditPost';
import MyCommentedPosts from '../../Comments/MyCommentedPosts';
import { PostProvider } from '../../FreeBoard/PostContext';
import { WorkSharingProvider } from '../../WorkSharing/WorkSharingContext';
import {CommentedPostsProvider} from '../../Comments/CommentedPostsContext';
import CommentSection from '@/Comments/CommentSection';
import ChatPreview from '../../Chatting/ChatPreview';


const Stack = createNativeStackNavigator();

function App() {

  return (
    <PostProvider>
      <WorkSharingProvider>
        <CommentedPostsProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{
              headerShadowVisible: false,
            }} />
            <Stack.Screen name="ChatPreview" component={ChatPreview}/>
            <Stack.Screen name="WritePost" component={WritePost} />
            <Stack.Screen name="EditPost" component={EditPost}/>
            <Stack.Screen name="MyCommentedPosts" component={MyCommentedPosts}/>
            <Stack.Screen name="CommentSection" component={CommentSection}/>

            <Stack.Screen
              name="ArtRoom"
              component={ArtRoom}
              options={{
                title: '화방',
                headerTintColor: '#2b4872',
                headerShadowVisible: false, // Hide shadow for iOS
                elevation: 0, // Hide shadow for Android
                headerStyle: {
                  borderBottomWidth: 0, // Remove bottom border
                },
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                title:'',
                headerShadowVisible: false, // Hide shadow for iOS
                elevation: 0, // Hide shadow for Android
                headerStyle: {
                  borderBottomWidth: 0, // Remove bottom border
                },
              }}
            />
            <Stack.Screen
              name="Notice"
              component={Notice}
              options={{
                headerShadowVisible: false, // Hide shadow for iOS
                elevation: 0, // Hide shadow for Android
                headerStyle: {
                  borderBottomWidth: 0, // Remove bottom border
                },
              }}
            />
            <Stack.Screen
              name="FreeBoard"
              component={FreeBoard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WorkSharingScreen"
              component={WorkSharingScreen}
              options={({ navigation }) => ({
                title: '작업공유',
                headerTintColor: '#2b4872',
                headerShadowVisible: false, // Hide shadow for iOS
                elevation: 0, // Hide shadow for Android
                headerStyle: {
                  borderBottomWidth: 0, // Remove bottom border
                },
                headerRight: () => (
                  <View style={styles.flexDirection}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
                      <Image source={require('../../assets/images/useReactfront/notice.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchPadding} onPress={() => navigation.navigate('Search')}>
                      <Image source={require('../../assets/images/useReactfront/search.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={require('../../assets/images/useReactfront/menu.png')} />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />

            <Stack.Screen name='WorkSharingWritePost' component={WorkSharingWritePost} />
            <Stack.Screen name="PostDetail" component={PostDetail} 
        
            options={({ navigation }) => ({
              title: '',
              headerRight: () => (
              <View style={styles.flexDirection}>
                <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
                  <Image source={require('../../assets/images/useReactfront/notice.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchPadding} onPress={() => navigation.navigate('Search')}>
                  <Image source={require('../../assets/images/useReactfront/search.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/useReactfront/menu.png')} />
                </TouchableOpacity>
              </View>
            ),})}/>
          </Stack.Navigator>
        </NavigationContainer>
        </CommentedPostsProvider>
      </WorkSharingProvider>
    </PostProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
  },
  searchPadding: {
    paddingHorizontal: 20,
  },
});
