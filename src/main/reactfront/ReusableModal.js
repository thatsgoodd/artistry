import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const ReusableModal = ({ children, buttonText, style }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const toggleModal = () => {
    setButtonPressCount((prevCount) => {
      if (prevCount === 1) {
        setIsModalVisible(false);  // 두 번째 누름 시 모달 닫기
        return 0; // 눌림 횟수 초기화
      } else {
        setIsModalVisible(true); // 첫 번째 누름 시 모달 열기
        return prevCount + 1;
      }
    });
  };

  return (
    <>
      <TouchableOpacity style={[styles.button, style]} onPress={toggleModal}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {children}
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2b4872',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default ReusableModal;
