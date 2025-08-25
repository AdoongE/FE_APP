import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterModal = ({
  visible,
  onClose,
  initialType,
  initialSort,
  onApply,
}) => {
  const [tempType, setTempType] = useState(initialType);
  const [tempSort, setTempSort] = useState(initialSort);

  const typeOptions = [
    { value: 'LINK', label: '링크' },
    { value: 'IMAGE', label: '이미지' },
    { value: 'PDF', label: 'PDF' },
  ];

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'name', label: '이름순' },
  ];

  useEffect(() => {
    if (visible) {
      setTempType(initialType);
      setTempSort(initialSort);
    }
  }, [visible, initialType, initialSort]);

  const handleApply = () => {
    onApply(tempType, tempSort);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={18} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>보기옵션</Text>
            <TouchableOpacity onPress={handleApply}>
              <Text style={styles.confirmButton}>확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.line} />

          {/* 저장형식 섹션 */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>저장형식</Text>
            <View style={styles.filterOptions}>
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    tempType === option.value && styles.filterOptionSelected,
                  ]}
                  onPress={() =>
                    setTempType(tempType === option.value ? null : option.value)
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      tempType === option.value &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 정렬 섹션 */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>정렬</Text>
            <View style={styles.filterOptions}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    tempSort === option.value && styles.filterOptionSelected,
                  ]}
                  onPress={() =>
                    setTempSort(tempSort === option.value ? null : option.value)
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      tempSort === option.value &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#4f4f4f',
    fontSize: 16,
    fontWeight: '500',
  },
  line: {
    height: 1,
    backgroundColor: '#f2f2f2',
    marginVertical: 20,
    marginHorizontal: -20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  filterOptions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  filterOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 0.75,
    borderColor: '#e0e0e0',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterOptionSelected: {
    backgroundColor: '#F8FBFB',
    borderColor: '#41C3AB',
    borderRadius: 40,
    borderWidth: 0.75,
  },
  filterOptionText: {
    fontSize: 14,
    color: '#dcdada',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#41C3AB',
  },
});

export default FilterModal;
