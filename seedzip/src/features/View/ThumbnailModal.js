import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

const ThumbnailModal = ({ visible, onClose, files }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSnapToItem = (index) => {
    setCurrentIndex(index);
  };

  const onSaveSingle = async (fileUrl) => {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileUrl.split('/').pop()}`;
  
      const result = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadDest,
      }).promise;
  
      if (result.statusCode === 200) {
        alert('파일이 저장되었습니다: ' + downloadDest);
      } else {
        alert('파일 저장에 실패했습니다. 상태 코드: ' + result.statusCode);
      }
    } catch (error) {
      console.error('파일 저장 오류:', error);
      alert('파일 저장 중 오류가 발생했습니다.');
    }
  };
  const onSaveAll = async (fileUrls) => {
    try {
      const savePromises = fileUrls.map(async (fileUrl) => {
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileUrl.split('/').pop()}`;
        const result = await RNFS.downloadFile({
          fromUrl: fileUrl,
          toFile: downloadDest,
        }).promise;
  
        if (result.statusCode !== 200) {
          throw new Error(`파일 저장 실패: 상태 코드 ${result.statusCode}`);
        }
  
        return downloadDest;
      });
  
      const savedFiles = await Promise.all(savePromises);
      alert(`모든 파일 저장 완료:\n${savedFiles.join('\n')}`);
    } catch (error) {
      console.error('모든 파일 저장 오류:', error);
      alert('모든 파일 저장 중 오류가 발생했습니다.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.modalContent}>
      {/* 닫기 Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      {/* Image Viewer */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.imagePreview} />
      </View>

      {/* 파일 저장 Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, styles.allSaveButton]}
          onPress={() => onSaveAll(files)}
        >
          <Text style={styles.buttonTextall}>모든 파일 저장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, styles.singleSaveButton]}
          onPress={() => onSaveSingle(item)}
        >
          <Text style={styles.buttonTextsingle}>이 파일만 저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <FlatList
          data={files}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={width * 0.8 + 20}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (width * 0.8 + 20)
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
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: (width - width * 0.8) / 2 - 30,
  },
  modalContent: {
    width: width * 0.8,
    height: height * 0.48,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: 288,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 292,
  },
  saveButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 40,
    gap: 12,
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
    fontWeight: 500,
  },
  buttonTextsingle: {
    color: '#21A58C',
    fontSize: 14,
    fontWeight: 500,
  },
});

export default ThumbnailModal;