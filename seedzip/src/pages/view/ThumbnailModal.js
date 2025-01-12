import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.5;
const MODAL_MARGIN = width * 0.1;

const ThumbnailModal = ({ file, files, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSnapToItem = (index) => {
    setCurrentIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.modalContent,
        {
          marginLeft: index === 0 ? MODAL_MARGIN : 10,
          marginRight: index === files.length - 1 ? MODAL_MARGIN : 10,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.imageText}>이미지 {index + 1}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, styles.allSaveButton]}
          onPress={() => console.log('모든 파일 저장')}
        >
          <Text style={styles.buttonTextall}>모든 파일 저장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, styles.singleSaveButton]}
          onPress={() => console.log(`파일 저장: ${item}`)}
        >
          <Text style={styles.buttonTextsingle}>이 파일만 저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal visible={!!file} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <FlatList
          data={files}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={MODAL_WIDTH + 20} // 슬라이드 크기 + 여백
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: MODAL_MARGIN }}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (MODAL_WIDTH + 20)
            );
            handleSnapToItem(index);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
//   modalContent: {
//     width: '50%',
//     height: '48%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 16,
//     justifyContent: 'space-between',
//   },
  modalContent: {
    width: '80%',
    height: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 40,
  },
  singleSaveButton: {
    backgroundColor: '#def3f1',
  },
  allSaveButton: {
    backgroundColor: '#41c3ab',
  },
  buttonTextall: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextsingle: {
    color: '#21A58C',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ThumbnailModal;
