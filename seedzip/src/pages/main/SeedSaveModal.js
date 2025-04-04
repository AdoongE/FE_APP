import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // React Navigation 사용

export default function SeedSaveModal({ visible, onClose }) {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.handleBar} />
          <Text style={styles.modalTitle}>저장형식을 선택해주세요</Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              onClose(); // 모달 닫기
              navigation.navigate('addLink');
            }}>
            <Ionicons name="link-outline" size={20} color="black" />
            <Text style={styles.modalButtonText}>링크 저장하기</Text>
          </TouchableOpacity>

          {/* 이미지 저장하기 버튼 */}
          <TouchableOpacity
            style={[styles.modalButton, styles.imageButton]}
            onPress={() => {
              onClose(); // 모달 닫기
              navigation.navigate('imageupload'); // imageupload 페이지로 이동
            }}
          >
            <Ionicons name="image-outline" size={20} color="black" />
            <Text style={styles.modalButtonText}>이미지 저장하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'flex-start',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imageButton: {
    borderBottomWidth: 0, // 아래쪽 줄 제거
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  closeButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});