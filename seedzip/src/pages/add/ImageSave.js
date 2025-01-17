import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

export default function ImageSave({ route }) {
  // 이전 페이지에서 전달받은 이미지 배열과 대표 이미지 인덱스
  const { selectedImages = [], thumbnailIndex = 0 } = route.params || {};

  return (
    <View style={styles.container}>
      {/* 긴 네모 박스 */}
      <View style={styles.longBox}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          {selectedImages.map((image, index) => (
            <View
              key={index}
              style={[
                styles.imageContainer,
                thumbnailIndex === index && styles.thumbnailHighlight, // 대표 이미지 강조
              ]}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginBottom: 4,
  },
  longBox: {
    width: '100%',
    height: 104,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DCDADA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginHorizontal: 8,
    width: 78, // 이미지 상자 크기
    height: 78,
    borderRadius: 5, // 모서리 둥글게
    backgroundColor: '#D9D9D9', // 배경색
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5, // 이미지도 둥글게
  },
  thumbnailHighlight: {
    borderWidth: 2,
    borderColor: '#41C3AB', // 대표 이미지 강조 테두리
  },
});