import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import BaseModal from '../../../components/BaseModal';
import deleteIcon from '../../../assets/icons/delete-alert.png';

export default function WithdrawModal({ visible, onCancel, onDelete }) {
  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={onDelete}
      cancelText="취소하기"
      confirmText="탈퇴하기"
    >
      <Image source={deleteIcon} style={styles.icon} />
      <Text style={styles.title}>정말 탈퇴하실 건가요?</Text>
      <Text style={styles.subtitle}>저장했던 모든 정보가 사라집니다.</Text>
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
