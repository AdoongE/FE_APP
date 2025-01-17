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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export default function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showWarning, setShowWarning] = useState(false); // 경고 메시지 표시 여부
  const navigation = useNavigation();
  const [thumbnailIndex, setThumbnailIndex] = useState(0); // 대표 이미지 인덱스

  const handleBackToMain = () => {
    navigation.navigate('main');
  };

  const handleNext = () => {
    if (selectedImages.length === 0) {
      // 이미지가 없으면 경고 표시
      setShowWarning(true);
    } else {
      navigation.navigate('add', {
        selectedImages, // 선택된 이미지 배열 전달
        thumbnailIndex, // 대표 이미지 인덱스 전달
      });
    }
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
        const imageUri = result.assets[0].uri;

        // 파일 유효성 검사
        const validation = await isValidFile(imageUri);
        if (!validation.isValid) {
          alert(validation.message);
          return; // 유효하지 않은 파일인 경우 중단
        }

        setSelectedImages([...selectedImages, imageUri]);
        setShowWarning(false); // 이미지 업로드 시 경고 제거
      }
    } catch (error) {
      console.error('Image picking failed:', error);
    }
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    // 대표 이미지가 삭제된 경우 첫 번째 이미지로 자동 설정
    if (thumbnailIndex === index) {
      setThumbnailIndex(0);
    } else if (thumbnailIndex > index) {
      setThumbnailIndex(thumbnailIndex - 1);
    }
  };

  const setThumbnailImage = (index) => {
    setThumbnailIndex(index);
  };

  const isValidFile = async (uri, maxSizeMB = 10) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'svg']; // 허용된 확장자
    const fileExtension = uri.split('.').pop().toLowerCase(); // 확장자 추출

    if (!validExtensions.includes(fileExtension)) {
      return { isValid: false, message: `허용되지 않는 확장자입니다: .${fileExtension}` };
    }

    // fetch로 파일의 크기를 가져옵니다.
    const response = await fetch(uri);
    const fileBlob = await response.blob();
    const fileSizeMB = fileBlob.size / (1024 * 1024); // MB로 변환

    if (fileSizeMB > maxSizeMB) {
      return { isValid: false, message: `파일 크기가 ${maxSizeMB}MB를 초과했습니다: ${fileSizeMB.toFixed(2)}MB` };
    }

    return { isValid: true, message: '유효한 파일입니다.' };
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>이미지를 업로드하세요</Text>
      <Text style={styles.subtext}>
        총 0MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수{'\n'}있어요
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {/* 업로드 버튼 */}
          <TouchableOpacity
            style={[
              styles.uploadBox,
              showWarning && styles.uploadBoxWarning, // 경고 상태 시 빨간색 테두리
            ]}
            onPress={pickImage}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={40}
              color='#41C3AB'
              style={styles.uploadIcon}
            />
            <Text
              style={[
                styles.uploadText,
              ]}
            >
              이미지 업로드
            </Text>
          </TouchableOpacity>

          {/* 경고 메시지 */}
          {showWarning && (
            <Text style={styles.warningText}>이미지를 1개 이상{'\n'}업로드하세요</Text>
          )}
        </View>

        {/* 업로드된 이미지 */}
        {selectedImages.map((image, index) => (
          <View
            key={index}
            style={[
              styles.imageContainer,
              thumbnailIndex === index && styles.thumbnailHighlight,
            ]}
          >
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Ionicons name="close" size={16} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setThumbnailImage(index)}>
              <Image source={{ uri: image }} style={styles.image} />
              {thumbnailIndex === index && (
                <View style={styles.thumbnailLabel}>
                  <Text style={styles.thumbnailText}>대표</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* TIP 섹션 */}
      {selectedImages.length === 0 && (
        <>
          <Image
            source={require('../../assets/icons/tip.png')}
            style={styles.tipBackground}
          />
          <View style={styles.tipBox}>
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                • 대표 이미지를 기준으로 제목, 태그, 요약을 자동 제공해요{'\n'}
                • 첫 번째로 등록한 이미지가 대표 이미지가 돼요
              </Text>
            </View>
          </View>
        </>
      )}

      <Button
        mode="contained"
        style={styles.nextButton}
        labelStyle={styles.nextButtonText}
        onPress={handleNext}
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
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 0,
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
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#41C3AB',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  uploadBoxWarning: {
    borderColor: '#FF0000', // 경고 상태 테두리 빨간색
  },
  uploadIcon: {
    marginBottom: 5,
  },
  uploadText: {
    color: '#191919',
    fontSize: 12,
  },
  warningText: {
    color: '#FF0000',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  imageContainer: {
    position: 'relative',
    margin: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
    zIndex: 10,
  },
  thumbnailHighlight: {
    borderColor: '#41C3AB',
    borderWidth: 2,
  },
  thumbnailLabel: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  thumbnailText: {
    fontSize: 10,
    color: '#41C3AB',
    fontWeight: 'bold',
  },
  tipBackground: {
    width: 108,
    height: 108,
    marginBottom: 5,
    alignSelf: 'center',
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