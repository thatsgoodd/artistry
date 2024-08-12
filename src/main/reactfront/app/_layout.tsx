import React, { useEffect } from "react";
import { Stack, Tabs, useNavigation } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync(); // 모든 작업이 완료되면 스플래시 스크린 숨기기
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // 모든 스크린에서 헤더 숨기기
        }}
      >
        {/* 탭 내에서 스크린 설정 */}
        <Stack.Screen
          name="(tabs)"
          options={{
          }}
        />
       
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: false, // not-found 화면에서 헤더 숨기기
          }}
        />
      </Stack>

    </View>
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