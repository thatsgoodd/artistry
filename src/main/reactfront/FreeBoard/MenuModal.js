import React from 'react';
import {
  View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import FreeBoard from './FreeBoard';
import { useNavigation } from 'expo-router';

const MenuModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FreeBoard')}
                style={[styles.modalButton, styles.buttonWithBorder]}
              >
                <Text style={styles.modalButtonText}>전체글</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyCommentedPosts')}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>댓글쓴글</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 147,
    height: 108,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3dfee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:320,
    left:120
  },
  modalButton: {
    width: '80%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonWithBorder: {
    borderBottomWidth: 1,
    borderColor: '#d3dfee',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#2b4872',
  },
});

export default MenuModal;
