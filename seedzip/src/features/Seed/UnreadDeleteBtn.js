import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useSeedActions from '../../hooks/useSeedActions';

const UnreadDeleteBtn = ({ selectedSeeds, onSelectAll, onDeleteSuccess }) => {
  const selectedCnt = selectedSeeds.length > 0;
  const { openMultipleDeleteModal, SeedActionModals } = useSeedActions({
    onDeleteSuccess: (deletedIds) => {
      onDeleteSuccess(deletedIds);
    },
  });

  const handleDeletePress = () => {
    if (selectedSeeds.length > 0) {
      openMultipleDeleteModal(selectedSeeds);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectAllButton} onPress={onSelectAll}>
          <Text style={styles.selectAllText}>전체선택</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deleteButton,
            selectedCnt ? styles.activeButton : styles.inactiveButton,
          ]}
          disabled={selectedSeeds.length === 0}
          onPress={handleDeletePress}
        >
          <Text
            style={[
              styles.deleteText,
              selectedCnt ? styles.activeText : styles.inactiveText,
            ]}
          >
            삭제하기
          </Text>
        </TouchableOpacity>
      </View>

      <SeedActionModals />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    zIndex: 10,
  },
  selectAllButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#41C3AB',
  },
  inactiveButton: {
    backgroundColor: '#f2f2f2',
  },
  selectAllText: {
    color: '#4f4f4f',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: '#9f9f9f',
  },
});

export default UnreadDeleteBtn;
