import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SeedActionModal({ visible, onClose, contentId }) {
  const navigation = useNavigation();

  const handleView = () => {
    onClose();
    navigation.navigate('view', {contentId});
  };

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

          <TouchableOpacity style={styles.modalButton} onPress={handleView}>
            <Text style={styles.modalButtoItem}>
              <Ionicons name="ellipsis-horizontal-sharp" size={20} color="black" />
            </Text>
            <Text style={styles.modalButtonText}>세부 정보 보기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.deleteButton]}
            onPress={() => {
              onClose(); // 모달 닫기
              navigation.navigate('view');
            }}
          >
            <Text style={styles.modalButtoItem}>
              <Ionicons name="trash-outline" size={20} color="black" /> {/* 아이콘 변경 */}
            </Text>
            <Text style={styles.modalButtonText}>삭제하기</Text>
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
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButton: {
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