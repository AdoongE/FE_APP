import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { axiosInstance } from '../../api/axios-instance';
import { MyContext } from '../../../App';

export default function App() {
  const {
    selectedImages,
    setSelectedImages,
    thumbnailIndex,
    setThumbnailIndex,
    setTitle,
    setTags,
    setSummary,
  } = useContext(MyContext);

  const [showWarning, setShowWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  const handleNext = async () => {
    if (submitting) return;

    if (selectedImages.length === 0) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    setSubmitting(true);

    try {
      const api = await axiosInstance();
      const finalRepresentativeIndex =
        thumbnailIndex !== null ? thumbnailIndex : 0;
      const imageUri = selectedImages[finalRepresentativeIndex];

      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileName = imageUri.split('/').pop() || `image_${Date.now()}`;

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: fileName,
        type: blob.type || 'image/jpeg',
      });

      const apiResponse = await api.post(
        '/api/v1/simplification/image',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      const simplifiedData = apiResponse?.data?.results?.[0] || {};
      const tagsString = simplifiedData.tags || '';
      const tagsArray = tagsString ? tagsString.split(/,\s*/) : [];

      setTitle(simplifiedData.title || '');
      setSummary(simplifiedData.summary || '');
      setTags(tagsArray);

      navigation.navigate('addCategory');
    } catch (error) {
      console.error('API 요청 오류:', error?.response?.data || error?.message);
      alert('이미지 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToMain = () => {
    navigation.navigate('home');
  };

  const isValidFile = async (uri, maxSizeMB = 10) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'svg'];
    const fileExtension = uri.split('.').pop()?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        message: `허용되지 않는 확장자입니다: .${fileExtension || ''}`,
      };
    }

    const response = await fetch(uri);
    const fileBlob = await response.blob();
    const fileSizeMB = fileBlob.size / (1024 * 1024);

    if (fileSizeMB > maxSizeMB) {
      return {
        isValid: false,
        message: `파일 크기가 ${maxSizeMB}MB를 초과했습니다: ${fileSizeMB.toFixed(
          2,
        )}MB`,
      };
    }

    return { isValid: true, message: '유효한 파일입니다.' };
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
        const validation = await isValidFile(imageUri);

        if (!validation.isValid) {
          alert(validation.message);
          return;
        }

        setSelectedImages([...selectedImages, imageUri]);
        setShowWarning(false);
      }
    } catch (error) {
      console.error('Image picking failed:', error);
    }
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    if (thumbnailIndex === index) {
      setThumbnailIndex(0);
    } else if (thumbnailIndex > index) {
      setThumbnailIndex(thumbnailIndex - 1);
    }
  };

  const setThumbnailImage = (index) => {
    setThumbnailIndex(index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToMain}
        disabled={submitting}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>이미지를 업로드하세요</Text>
      <Text style={styles.subtext}>
        총 0MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수{'\n'}있어요
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <TouchableOpacity
            style={[styles.uploadBox, showWarning && styles.uploadBoxWarning]}
            onPress={pickImage}
            disabled={submitting}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={40}
              color="#41C3AB"
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>이미지 업로드</Text>
          </TouchableOpacity>

          {showWarning && (
            <Text style={styles.warningText}>
              이미지를 1개 이상{'\n'}업로드하세요
            </Text>
          )}
        </View>

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
              disabled={submitting}
            >
              <Ionicons name="close" size={16} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setThumbnailImage(index)}
              disabled={submitting}
            >
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

      {selectedImages.length === 0 && (
        <>
          <Image
            source={require('../../assets/icons/tip.png')}
            style={styles.tipBackground}
          />
          <View style={styles.tipBox}>
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                • 대표 이미지를 기준으로 제목, 태그, 요약을 자동 제공해요{'\n'}•
                첫 번째로 등록한 이미지가 대표 이미지가 돼요
              </Text>
            </View>
          </View>
        </>
      )}

      <Button
        mode="contained"
        style={[styles.nextButton, submitting && { opacity: 0.8 }]}
        contentStyle={{ height: 48 }}
        onPress={handleNext}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.nextButtonText}>다음</Text>
        )}
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
    borderColor: '#FF0000',
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
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
