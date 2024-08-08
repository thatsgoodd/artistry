// EditPost.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';

const EditPost = ({ route, navigation }) => {
  const { post, onSave } = route.params;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({ ...post, title, content });
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in both fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Text style={styles.header}>Edit Post</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 30,
    marginBottom: 48,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    marginBottom: 12,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2b4872',
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditPost;
