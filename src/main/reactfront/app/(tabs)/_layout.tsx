import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Image, View, StyleSheet } from "react-native";
import IconButton from "../../components/IconButton";
import MenuBar from "../../components/MenuBar";



export default function AppLayout() {
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: route.name === "index", // 홈 화면에서만 헤더를 표시
          tabBarStyle: { display: "none" }, // 기본 탭 바 숨김
        })}
      >
        <Tabs.Screen
          name="index"
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
                  onPress={() => router.push("/ChatPreview")} // 경로 수정
                />
                <IconButton
                  icon="notifications-outline"
                  color="black"
                  onPress={() => router.push("/Notification")} // 경로 수정
                />
              </View>
            ),
            headerShadowVisible: false,
          }}
        />

        <Tabs.Screen name="ChatPreview" />
        <Tabs.Screen name="Notification" />
        <Tabs.Screen name="Collaboration" />
        <Tabs.Screen name="WorkShare" />
        <Tabs.Screen name="ArtStore" />
        <Tabs.Screen name="Freeboard" />
        <Tabs.Screen name="mypage" />
      </Tabs>

      {/* MenuBar는 항상 화면 하단에 표시됩니다 */}
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
