// SignUpScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground 
          source={require('../assets/login-background.png')}
          style={styles.headerBackground}
      >
      <Text style={styles.title}>당신의 어시스트</Text>
      <Text style={styles.subtitle}>Artistry</Text>

      <Text style={styles.loginText}>회원가입</Text>
      </ImageBackground>

      <TextInput placeholder="아이디 입력" style={styles.input} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>중복 검사</Text>
      </TouchableOpacity>
      <TextInput placeholder="비밀번호 입력" style={styles.input} secureTextEntry />
      <TextInput placeholder="비밀번호 확인" style={styles.input} secureTextEntry />
      <TextInput placeholder="이름" style={styles.input} />
      <TextInput placeholder="이메일" style={styles.input} keyboardType="email-address" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>인증번호</Text>
      </TouchableOpacity>
      <TextInput placeholder="닉네임" style={styles.input} />
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerBackground: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});