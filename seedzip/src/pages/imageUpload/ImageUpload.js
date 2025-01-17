import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  const handleBackToMain = () => {
    navigation.navigate('main'); // 'main' 화면으로 이동
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImages([...selectedImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Image picking failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>이미지를 업로드하세요</Text>
      <Text style={styles.subtext}>
        총 0MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수{'\n'}있어요
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 이미지 업로드 영역 */}
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.uploadBox}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}

        {/* 추가 업로드 박스 */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          <Ionicons
            name="cloud-upload-outline"
            size={40}
            color="#41C3AB"
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadText}>이미지 업로드</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* TIP 섹션 (이미지가 없을 때만 표시) */}
      {selectedImages.length === 0 && (
        <>
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
        </>
      )}

      {/* 다음 버튼 */}
      <Button
        mode="contained"
        style={styles.nextButton}
        labelStyle={styles.nextButtonText}
        disabled={selectedImages}
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
    paddingTop: 0,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
    borderColor: '#FF7979',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  uploadIcon: {
    marginBottom: 5,
  },
  uploadText: {
    color: 'gray',
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
    marginBottom: 5,
    alignSelf: 'center', // 가운데 정렬
  },
  tipBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 260,
  },
  tipContent: {
    alignItems: 'center',
  },
  tipText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    lineHeight: 17,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: '#41C3AB',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
