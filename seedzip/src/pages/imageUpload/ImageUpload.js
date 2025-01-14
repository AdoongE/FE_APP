import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리 추가

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picking failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title}>이미지를 업로드하세요</Text>
      <Text style={styles.subtext}>
        총 0MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수{'\n'}있어요
      </Text>

      {/* 이미지 업로드 영역 */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <>
            <Ionicons
              name="cloud-upload-outline" // 업로드 아이콘
              size={40}
              color="#41C3AB"
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>이미지 업로드</Text>
          </>
        )}
      </TouchableOpacity>
      {!selectedImage && (
        <Text style={styles.warningText}>이미지를 1개 이상 업로드하세요</Text>
      )}

      {/* TIP 섹션 */}
      <Image
          source={require('../../assets/icons/tip.png')} // TIP 배경 이미지
          style={styles.tipBackground}
        />
      <View style={styles.tipBox}>
        <View style={styles.tipContent}>
          <Text style={styles.tipText}>
            - 대표 이미지를 기준으로 제목, 태그, 요약을 자동 제공합니다{'\n'}
            - 첫 번째로 등록한 이미지가 대표 이미지가 돼요
          </Text>
        </View>
      </View>

      {/* 다음 버튼 */}
      <Button
        mode="contained"
        style={styles.nextButton}
        labelStyle={styles.nextButtonText}
        disabled={!selectedImage}
      >
        다음
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#FF7979', // 빨간색 테두리
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadIcon: {
    marginBottom: 5,
  },
  uploadText: {
    color: 'gray', // 빨간색 텍스트
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  warningText: {
    color: '#FF7979', // 경고 텍스트 색상
    fontSize: 12,
    marginBottom: 75,
  },
  tipBackground: {
    width: 108, // 너비 108px
    height: 108, // 높이 108px
    marginBottom: 10,
    alignSelf: 'center', // 가운데 정렬
  },
  tipBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  tipIcon: {
    marginBottom: 10,
  },
  tipContent: {
    alignItems: 'center',
  },
  tipText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute', // 절대 위치 지정
    bottom: 20, // 화면 하단에서 20px 위
    width: '100%',
    backgroundColor: '#41C3AB',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center', // 중앙 정렬
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});