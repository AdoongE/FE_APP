import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import BaseModal from '../../components/BaseModal';
import deleteIcon from '../../assets/icons/delete-alert.png';

export default function DeleteSeedModal({ visible, onCancel, onDelete }) {
  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={onDelete}
      cancelText="취소하기"
      confirmText="삭제하기"
    >
      <Image source={deleteIcon} style={styles.icon} />
      <Text style={styles.title}>씨드를 삭제할까요?</Text>
      <Text style={styles.subtitle}>삭제된 씨드는 복구할 수 없습니다.</Text>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 56,
    height: 56,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#4f4f4f',
    marginBottom: 22,
    textAlign: 'center',
  },
});
