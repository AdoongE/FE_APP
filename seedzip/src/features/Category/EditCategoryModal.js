import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import BaseModal from '../../components/BaseModal';

export default function EditCategoryModal({
  visible,
  initialName = '',
  onCancel,
  onEdit,
}) {
  const [name, setName] = useState(initialName);

  // 모달 열 때 초기값 설정
  useEffect(() => {
    setName(initialName);
  }, [initialName, visible]);

  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={() => onEdit(name.trim())}
      cancelText="취소하기"
      confirmText="변경하기"
      confirmDisabled={!name.trim()}
    >
      <Text style={styles.title}>카테고리 이름 변경</Text>
      <Text style={styles.subtitle}>카테고리의 이름을 변경해주세요.</Text>
      <TextInput
        style={styles.input}
        placeholder={name}
        value={name}
        onChangeText={setName}
      />
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#4f4f4f',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 17,
    marginBottom: 32,
    fontSize: 16,
  },
});
