// app/_layout.js
import React, { useEffect } from "react";
import { Stack, useNavigation } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import IconButton from "../components/IconButton";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        // 필요한 초기 작업을 수행
        // 예: 데이터 로드, 폰트 로드 등

        // 모든 작업이 완료되면 스플래시 스크린 숨기기
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: (props) => (
            <Image
              style={{ width: 150, height: 40 }}
              source={require("../assets/images/HomeHeader.png")}
              resizeMode="contain"
            />
          ),
          headerRight: () => {
            return (
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
            );
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ChatPreview"
        options={{
          headerTitle: "", // 변경할 헤더 제목
          headerStyle: { backgroundColor: "#f5f5f5" }, // 변경할 헤더 스타일
          headerTintColor: "#333", // 헤더의 텍스트 색상
          headerBackTitleVisible: "false",
        }}
      />
      <Stack.Screen
        name="Notification"
        options={{
          headerTitle: "", // 변경할 헤더 제목
          headerStyle: { backgroundColor: "#f5f5f5" }, // 변경할 헤더 스타일
          headerTintColor: "#333", // 헤더의 텍스트 색상
          headerBackTitleVisible: "false",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 50,
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    paddingRight: 10,
  },
  headerBottomBorder: {
    borderBottomWidth: 5,
    borderBottomColor: "#47315a",
  },
});
