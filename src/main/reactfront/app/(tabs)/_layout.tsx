import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, StyleSheet } from "react-native";
import IconButton from "../../Home/IconButton";
import MenuBar from "../../Home/MenuBar";
import HomeScreen from "../../Home/HomeScreen";
import ChatPreview from "../../Chatting/ChatPreview";
import Notification from "../../Notification/NoticeMain";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === "Home", // 홈 화면에서만 헤더를 표시
        tabBarStyle: { display: "none" }, // 기본 탭 바 숨김
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
                onPress={() => navigation.navigate("Notification")}
              />
            </View>
          ),
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen name="ChatPreview" component={ChatPreview} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
}

export default function AppLayout() {
  return (
    <>
      <App />
      <MenuBar />
    </>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    paddingRight: 10,
  },
});
