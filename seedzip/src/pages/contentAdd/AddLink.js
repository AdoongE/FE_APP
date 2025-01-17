import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {axiosInstance} from '../../api/axios-instance';
import {MyContext} from '../../../App';

const AddLink = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [contentLinks, setContentLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const {setLink, setTitle, setTags, setSummary} = useContext(MyContext);

  const handleChange = text => {
    setContentLinks(text);
  };

  const handleAddLink = async () => {
    if (contentLinks === '') {
      setErrorMessage('empty');
      return;
    }
    const axios = await axiosInstance();

    const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/i;
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[^&]+/;
    const naverNewsRegex = /^https:\/\/n\.news\.naver\.com/;

    if (!regex.test(contentLinks)) {
      setErrorMessage('inValid');
      return;
    } else {
      if (youtubeRegex.test(contentLinks)) {
        console.log('유튜브 링크:', contentLinks);
        try {
          const params = {youtubeUrl: contentLinks};
          const response = await axios.post(
            '/api/v1/simplification/youtube/v2',
            null,
            {params},
          );
          const simplificationInfo =
            response.data?.results[0]?.simplificationInfo;
          if (response.data.status?.code === 200) {
            console.log('유튜브 링크 간략화 성공');
            console.log('간략화 내용 : ', simplificationInfo);
            console.log('간략화 link : ', contentLinks);
            const tagsString = simplificationInfo.tags || '';
            const tagsArray = tagsString.split(/,\s*/);
            setTags(tagsArray);
            setTitle(simplificationInfo.title || '');
            setSummary(simplificationInfo.summary || '');
            setLink(contentLinks);
            navigation.navigate('addCategory');
          }
        } catch (error) {
          console.error('유튜브 링크 간략화 실패:', error);
        }
      } else if (naverNewsRegex.test(contentLinks)) {
        console.log('네이버 뉴스 링크:', contentLinks);
        try {
          const params = {naverNewsUrl: contentLinks};
          const response = await axios.post(
            '/api/v1/simplification/naver-news/v2',
            null,
            {params},
          );
          const simplificationInfo =
            response.data?.results[0]?.simplificationInfo;
          if (response.data.status?.code === 200) {
            console.log('네이버 뉴스 링크 간략화 성공');
            console.log('간략화 내용 : ', simplificationInfo);
            console.log('간략화 link : ', contentLinks);
            const tagsString = simplificationInfo.tags || '';
            const tagsArray = tagsString.split(/,\s*/);
            setTags(tagsArray);
            setTitle(simplificationInfo.title || '');
            setSummary(simplificationInfo.summary || '');
            setLink(contentLinks);

            navigation.navigate('addCategory');
          }
        } catch (error) {
          console.error('네이버 뉴스 링크 간략화 실패:', error);
        }
      } else {
        console.log('간략화 불가 링크 생성 성공');
        setLink(contentLinks);

        navigation.navigate('addCategory');
      }
      setErrorMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>링크를 입력해주세요</Text>
      <Text style={styles.short}>
        유튜브 링크와 네이버 기사 링크 입력 시 제목과 태그, 요약을{'\n'}
        제공해드려요
      </Text>
      <TextInput
        value={contentLinks}
        onChangeText={handleChange}
        placeholder="링크 입력하기"
        style={[
          styles.input,
          {
            borderBottomColor: isFocused
              ? '#41C3AB'
              : errorMessage
              ? '#FF0000'
              : '#9F9F9F',
          },
        ]}
        onFocus={() => {
          setIsFocused(true), setTouched(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
      {errorMessage === 'empty' && (
        <Text style={styles.error}>링크를 입력하지 않았어요</Text>
      )}
      {errorMessage === 'inValid' && (
        <Text style={styles.error}>유효하지 않은 링크입니다</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        disabled={
          !touched ||
          errorMessage === 'empty' ||
          errorMessage === 'inValid' ||
          contentLinks.trim() === ''
        }
        onPress={handleAddLink}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {marginTop: 29.96, fontSize: 24, fontWeight: 600, marginBottom: 4},
  short: {
    color: '#898989',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 28,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 20,
    paddingBottom: 13,
  },
  button: {
    width: 350,
    height: 51,
    border: 0,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
  error: {
    color: '#FF0000',
    fontWeight: 400,
    fontSize: 12,
    marginTop: 8,
  },
});

export default AddLink;
