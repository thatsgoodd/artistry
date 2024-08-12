import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Home/HomeScreen";
import CollaborationScreen from "../../Collaboration/CollaborationScreen";
import CollaborationChat from "../../Collaboration/CollaborationChat";
import AddCollaborationPost from "../../Collaboration/AddCollaborationPost";
import TradeSearch from "../../Trade/TradeSearch";
import CollaborationSearch from '../../Collaboration/CollaborationSearch';
import TradeChat from "../../Trade/TradeChat";
import ChattingScreen from "../../Chatting/ChattingScreen";
import ArtRoom from "../../ArtRoom/ArtRoomMain";
import Search from "../../Search/SearchBar";
import TradeScreen from "../../Trade/TradeScreen";
import WorkSharingScreen from "../../WorkSharing/WorkSharingScreen";
import WorkSharingWritePost from "../../WorkSharing/WorkSharingWritePost";
import FreeBoard from "../../FreeBoard/FreeBoardMain";
import PostDetail from "../../WorkSharing/PostDetails";
import WritePost from "../../FreeBoard/WritePost";
import EditPost from "../../FreeBoard/EditPost";
import MyCommentedPosts from "../../Comments/MyCommentedPosts";
import { PostProvider } from "../../FreeBoard/PostContext";
import { WorkSharingProvider } from "../../WorkSharing/WorkSharingContext";
import { CommentedPostsProvider } from "../../Comments/CommentedPostsContext";
import CommentSection from "../../Comments/CommentSection";
import ChatPreview from "../../Chatting/ChatPreview";
import MenuBar from "../../Home/MenuBar";
import IconButton from "../../Home/IconButton";
import NotificationScreen from '../../Notification/NotificationScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PostProvider>
      <WorkSharingProvider>
        <CommentedPostsProvider>
          <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                  headerTitle: () => (
                    <Image
                      style={{ width: 150, height: 40 }}
                      source={require("../../assets/images/HomeHeader.png")}
                      resizeMode="contain"
                    />
                  ),
                  headerRight: () => (
                    <View style={styles.headerRightContainer}>
                      <IconButton
                        icon="chatbubble-ellipses-outline"
                        color="black"
                        onPress={() => navigation.navigate("ChatPreview")}
                      />
                      <IconButton
                        icon="notifications-outline"
                        color="black"
                        onPress={() => navigation.navigate("NotificationScreen")}
                      />
                    </View>
                  ),
                  headerShadowVisible: false,
                })}
              />
              <Stack.Screen
                name="ChatPreview"
                component={ChatPreview}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TradeChat"
                component={TradeChat}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChattingScreen"
                component={ChattingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TradeSearch"
                component={TradeSearch}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CollaborationSearch"
                component={CollaborationSearch}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddCollaborationPost"
                component={AddCollaborationPost}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CollaborationChat"
                component={CollaborationChat}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="WritePost" component={WritePost} />
              <Stack.Screen name="EditPost" component={EditPost} />
              <Stack.Screen 
              name="NotificationScreen" 
              component={NotificationScreen} 
              options={
                {title:'알림'}
              }/>
              <Stack.Screen
                name="MyCommentedPosts"
                component={MyCommentedPosts}
              />
              <Stack.Screen name="CommentSection" component={CommentSection} />
              <Stack.Screen
                name="ArtRoom"
                component={ArtRoom}
                options={{
                  title: "화방",
                  headerTintColor: "#2b4872",
                  headerShadowVisible: false,
                  elevation: 0,
                  headerStyle: {
                    borderBottomWidth: 0,
                  },
                }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  title: "",
                  headerShadowVisible: false,
                  elevation: 0,
                  headerStyle: {
                    borderBottomWidth: 0,
                  },
                }}
              />
              <Stack.Screen
                name="Notice"
                component={NotificationScreen}
                options={{
                  headerShadowVisible: false,
                  elevation: 0,
                  headerStyle: {
                    borderBottomWidth: 0,
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
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TradeScreen"
                component={TradeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CollaborationScreen"
                component={CollaborationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkSharingWritePost"
                component={WorkSharingWritePost}
              />
              <Stack.Screen
                name="PostDetail"
                component={PostDetail}
                options={({ navigation }) => ({
                  title: "",
                  headerRight: () => (
                    <View style={styles.flexDirection}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Notice")}
                      >
                        <Image
                          source={require("../../assets/images/useReactfront/notice.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.searchPadding}
                        onPress={() => navigation.navigate("Search")}
                      >
                        <Image
                          source={require("../../assets/images/useReactfront/search.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={require("../../assets/images/useReactfront/menu.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
            </Stack.Navigator>
            <MenuBar />
          </NavigationContainer>
        </CommentedPostsProvider>
      </WorkSharingProvider>
    </PostProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: "row",
  },
  searchPadding: {
    paddingHorizontal: 20,
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    paddingRight: 10,
  },
});
