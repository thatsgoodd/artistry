import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WriteFreeboardPost, { PostProvider } from './(tabs)/AddTradePost';
import AddTradePost from './(tabs)/AddTradePost';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PostProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AddTradePost">
          <Stack.Screen name="AddTradePost" component={AddTradePost} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
};

export default App;
