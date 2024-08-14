import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './PostList';
import PostDetail from './PostDetail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Posts">
      <Stack.Screen name="Posts" component={PostList} />
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ title: 'Post Detail' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
