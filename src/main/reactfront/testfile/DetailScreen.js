import {Button, View, Text } from 'react-native';

function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
}

export default DetailScreen;