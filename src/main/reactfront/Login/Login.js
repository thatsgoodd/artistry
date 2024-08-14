// LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground 
          source={require('../assets/login-background.png')}
          style={styles.headerBackground}
      >
      <Text style={styles.title}>당신의 어시스트</Text>
      <Text style={styles.subtitle}>Artistry</Text>

      <Text style={styles.loginText}>로그인</Text>
      </ImageBackground>

      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        placeholderTextColor="#999"
        secureTextEntry={true}
      />

      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.link}>아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.snsLoginText}>SNS 계정으로 로그인</Text>

      <View style={styles.snsContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/kakao.png')} style={styles.snsIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/naver.png')} style={styles.snsIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/google.png')} style={styles.snsIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/facebook.png')} style={styles.snsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerBackground: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  link: {
    color: '#1e90ff',
  },
  snsLoginText: {
    color: '#666',
    marginBottom: 10,
  },
  snsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  snsIcon: {
    width: 50,
    height: 50,
  },
});