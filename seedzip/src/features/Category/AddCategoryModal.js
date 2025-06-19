import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useDragClose } from '../../utils/useDragClose';

export default function AddCategoryModal({ visible, onCancel, onAdd }) {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const { panHandlers, translateY } = useDragClose({ onCancel, visible });

  useEffect(() => {
    if (visible) {
      setName('');
      setIsPublic(true);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
          {...panHandlers}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>새 카테고리 만들기</Text>
          <Text style={styles.subtitle}>
            카테고리를 공개해 웹에서 다른 사용자와{'\n'}인사이트를 나눠보세요!
          </Text>

          <Text style={styles.label}>이름 입력</Text>
          <TextInput
            style={styles.input}
            placeholder="새 카테고리"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>카테고리 공개 여부</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isPublic && styles.toggleButtonActive,
              ]}
              onPress={() => setIsPublic(true)}
            >
              <Text
                style={[styles.toggleText, isPublic && styles.toggleTextActive]}
              >
                공개
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                !isPublic && styles.toggleButtonActive,
              ]}
              onPress={() => setIsPublic(false)}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isPublic && styles.toggleTextActive,
                ]}
              >
                비공개
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAdd(name.trim(), isPublic)}
          >
            <Text style={styles.addButtonText}>카테고리 생성하기</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 29,
    height: 4,
    backgroundColor: '#dcdada',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 9,
  },
  subtitle: {
    fontSize: 14,
    color: '#9f9f9f',
    textAlign: 'center',
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    color: '#4f4f4f',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleButtonActive: {
    borderColor: '#41c3ab',
    backgroundColor: '#f8fbfb',
  },
  toggleText: {
    fontSize: 14,
    color: '#dcdada',
    fontWeight: '500',
  },
  toggleTextActive: {
    fontSize: 14,
    color: '#41c3ab',
    fontWeight: '500',
  },
  addButton: {
    marginTop: 31,
    backgroundColor: '#41c3ab',
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
});
