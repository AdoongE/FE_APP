import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {axiosInstance} from '../../api/axios-instance';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {MyContext} from '../../../App';
import ImageSave from './ImageSave';

const AddSeedPage = () => {
  const [dataType, setDataType] = useState('');
  const {tags, link, title, summary, category, selectedImages, thumbnailIndex} =
    useContext(MyContext);
  const navigation = useNavigation();

  const [contentInfo, setContentInfo] = useState({
    dataType: '',
    contentName: title || '',
    contentLink: link || '',
    contentImage: selectedImages || [],
    thumbnailImage: thumbnailIndex || 0,
    boardCategory: category || ['예시 1'],
    tags: tags || ['예시 태그 1'],
    dday: '',
    contentDetail: summary || '',
  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contentInfo.contentImage?.length > 0) {
      setDataType('IMAGE');
    } else if (contentInfo.contentDoc?.length > 0) {
      setDataType('PDF');
    } else if (contentInfo.contentLink !== '') {
      setDataType('LINK');
    }
  }, []);

  useEffect(() => {
    setContentInfo(prevState => ({
      ...prevState,
      dataType: dataType,
    }));
  }, [dataType]);

  const handleTitleChange = text => {
    setContentInfo({...contentInfo, contentName: text});
  };

  const handleMemoChange = text => {
    setContentInfo({...contentInfo, contentDetail: text});
  };

  const handleConfirm = selectedDate => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setContentInfo({...contentInfo, dday: formattedDate});
    setOpen(false);
  };

  const SaveSeed = async () => {
    try {
      const axios = await axiosInstance();

      const contentResponse = await axios.post('/api/v1/content/', contentInfo);
      console.log('콘텐츠 저장 성공:', contentResponse.data);

      if (
        contentResponse.data.status.code === 200 &&
        contentInfo.dataType === 'IMAGE' &&
        contentInfo.contentImage.length > 0
      ) {
        const formData = new FormData();

        for (const uri of contentInfo.contentImage) {
          const response = await fetch(uri);
          const blob = await response.blob();
          const fileName = uri.split('/').pop();

          formData.append('file', {
            uri: uri,
            name: fileName,
            type: blob.type,
          });
        }

        const imageUploadResponse = await axios.post(
          `/api/v1/content/upload/${contentResponse.data.results[0].contentId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('이미지 업로드 성공:', imageUploadResponse.data);
      }

      navigation.navigate('save');
    } catch (error) {
      console.error(
        '콘텐츠 저장 중 오류 발생:',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>저장할 씨드 정보를{'\n'}확인하세요</Text>
      <Text style={styles.sectionSubtitle}>
        제목, 디데이, 메모를 추가로 입력해보세요(선택)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="제목 입력하기(선택)"
        maxLength={30}
        value={contentInfo.contentName}
        onChangeText={handleTitleChange}
      />
      {dataType === 'LINK' && (
        <View style={styles.linkBox}>
          <View style={styles.circle}>
            <Ionicons name="link-outline" color="white" />
          </View>
          <Text style={styles.linkText}>{contentInfo.contentLink}</Text>
        </View>
      )}
      {dataType === 'IMAGE' && (
        <ImageSave
          route={{
            params: {
              selectedImages: contentInfo.contentImage,
              thumbnailIndex: contentInfo.thumbnailImage,
            },
          }}
        />
      )}
      <View>
        <View style={styles.contentDiv}>
          <Text style={styles.name}>카테고리</Text>
          <View style={styles.categoryContainer}>
            {contentInfo.boardCategory.map(category => (
              <View key={category} style={styles.textWrapper}>
                <Text style={styles.divText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.contentDiv, {marginTop: 20}]}>
          <Text style={styles.name}>태그*</Text>
          <View style={styles.tagsContainer}>
            {contentInfo.tags.map(tag => (
              <View key={tag} style={styles.textWrapper}>
                <Text style={styles.divText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <View style={styles.contentDiv}>
            <Text style={styles.name}>디데이</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            저장한 날에 알림을 받을 수 있어요
          </Text>
          <TouchableOpacity
            style={styles.ddayContent}
            onPress={() => setOpen(true)}>
            <Ionicons
              name="calendar-clear-outline"
              size={12}
              color="#9f9f9f"
              style={{marginRight: 4}}
            />
            <Text style={styles.divText}>
              {contentInfo.dday || 'YYYY/MM/DD'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setOpen(false)}
          />
        </View>

        <View style={styles.memo}>
          <Text style={styles.name}>메모</Text>
          <Text style={styles.sectionSubtitle}>
            요약된 내용이 자동으로 입력돼요.
          </Text>
          <View style={styles.memoDiv}>
            <TextInput
              style={styles.detail}
              placeholder="여기를 눌러 메모를 입력하세요"
              maxLength={1500}
              value={contentInfo?.contentDetail ?? ''}
              onChangeText={handleMemoChange}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={SaveSeed}>
        <Text style={styles.nextButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#9f9f9f',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    paddingBottom: 10,
  },
  linkBox: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 5,
    marginBottom: 12,
    width: 350,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 9,
    width: 'auto',
  },
  linkText: {
    fontSize: 12,
    color: '#4f4f4f',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 40,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDiv: {
    flexDirection: 'row',
    marginTop: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'semibold',
    width: 65,
    paddingTop: 4,
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#9f9f9f',
    paddingTop: 7,
  },
  ddayContent: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 5,
    width: 126,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginTop: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: 100,
    overflow: 'hidden',
    paddingBottom: 8,
    rowGap: 8,
    maxWidth: 287,
  },
  textWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    width: 'auto',
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginRight: 8,
  },
  divText: {
    fontSize: 12,
    color: '#4f4f4f',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: 100,
    maxWidth: 287,
    overflow: 'hidden',
    paddingBottom: 8,
    rowGap: 8,
  },
  memo: {
    marginTop: 20,
  },
  memoDiv: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 5,
    padding: 10,
    marginTop: 8,
    height: 174,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pencil: {
    width: 15,
  },
});

export default AddSeedPage;
