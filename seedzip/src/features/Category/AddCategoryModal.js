import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import BaseModal from '../../components/BaseModal';

export default function CreateCategoryModal({ visible, onCancel, onAdd }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (visible) {
      setName('');
    }
  }, [visible]);

  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={() => onAdd(name.trim())}
      cancelText="취소하기"
      confirmText="생성하기"
    >
      <Text style={styles.title}>새 카테고리 만들기</Text>
      <Text style={styles.subtitle}>카테고리의 이름을 입력해주세요.</Text>
      <TextInput
        style={styles.input}
        placeholder="새 카테고리"
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
