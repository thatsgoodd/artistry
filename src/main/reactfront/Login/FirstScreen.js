import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainLoginScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/login-background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>당신의 어시스트</Text>
        <Text style={styles.subtitle}>Artistry</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>기존 계정으로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#ffffff',
    marginVertical: 10,
  },
});