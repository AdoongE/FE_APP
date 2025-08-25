import { useState, useEffect } from 'react';
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
            <Text style={styles.headerText}>보기옵션</Text>
            <TouchableOpacity onPress={handleApply}>
              <Text style={styles.headerText}>확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.line} />

          {/* 저장형식 섹션 */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>저장형식</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  tempType === 'LINK' && styles.filterOptionSelected,
                ]}
                onPress={() => setTempType(tempType === 'LINK' ? null : 'LINK')}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    tempType === 'LINK' && styles.filterOptionTextSelected,
                  ]}
                >
                  링크
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterOption,
                  tempType === 'IMAGE' && styles.filterOptionSelected,
                ]}
                onPress={() =>
                  setTempType(tempType === 'IMAGE' ? null : 'IMAGE')
                }
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    tempType === 'IMAGE' && styles.filterOptionTextSelected,
                  ]}
                >
                  이미지
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterOption,
                  tempType === 'PDF' && styles.filterOptionSelected,
                ]}
                onPress={() => setTempType(tempType === 'PDF' ? null : 'PDF')}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    tempType === 'PDF' && styles.filterOptionTextSelected,
                  ]}
                >
                  PDF
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 정렬 섹션 */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>정렬</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  tempSort === 'latest' && styles.filterOptionSelected,
                ]}
                onPress={() =>
                  setTempSort(tempSort === 'latest' ? null : 'latest')
                }
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    tempSort === 'latest' && styles.filterOptionTextSelected,
                  ]}
                >
                  최신순
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterOption,
                  tempSort === 'name' && styles.filterOptionSelected,
                ]}
                onPress={() => setTempSort(tempSort === 'name' ? null : 'name')}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    tempSort === 'name' && styles.filterOptionTextSelected,
                  ]}
                >
                  이름순
                </Text>
              </TouchableOpacity>
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
