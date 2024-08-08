// app/layout.js
import { Tabs } from 'expo-router';
import React from 'react';
import MenuBar from '../../components/MenuBar';

export default function AppLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="explore" />
        <Tabs.Screen name="Trade" />
        <Tabs.Screen name="Collaboration" />
        <Tabs.Screen name="WorkShare" />
        <Tabs.Screen name="ArtStore" />
        <Tabs.Screen name="Freeboard" />
        <Tabs.Screen name="mypage" />
      </Tabs>
      <MenuBar />
    </>
  );
}
