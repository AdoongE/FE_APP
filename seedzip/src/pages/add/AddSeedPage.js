import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { axiosInstance } from '../../api/axios-instance';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const AddSeedPage = ({ route }) => {
  const navigation = useNavigation();
  // const {
  //   dataType,
  //   contentName,
  //   contentLink,
  //   contentImage,
  //   contentDoc,
  //   thumbnailImage,
  //   boardCategory,
  //   tags,
  //   dday,
  //   contentDetail,
  // } = route.params;

  const [contentInfo, setContentInfo] = useState({
    dataType: 'LINK',
    contentName: '',
    contentLink: 'http://naver.com',
    contentImage: [],
    contentDoc: [],
    thumbnailImage: 0,
    boardCategory: ['ㅎㅇ'],
    // boardCategory: ['카테고리1', '카테고리2', '카테고리3'],
    tags: ['태그1', '태그2'],
    dday: '' || 'YYYY/MM/DD',
    contentDetail: '안녕하세요안녕ㅎ아세욯 ㅎㅎ',
  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleTitleChange = (text) => {
    setContentInfo({ ...contentInfo, contentName: text });
  };

  const handleMemoChange = (text) => {
    setContentInfo({ ...contentInfo, contentDetail: text });
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setContentInfo({ ...contentInfo, dday: formattedDate });
    setOpen(false);
  };

  const SaveSeed = async () => {
    try {
      const axios = await axiosInstance();
      const response = await axios.post(
        '/api/v1/content/', contentInfo
      );
      console.log('출력물', response.data);
      if (response.data.status.code == 200) {
        navigation.navigate('save');
      }
      // const results = response.data.results[0];
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>저장할 씨드 정보를{'\n'}확인하세요</Text>
      <TextInput
        style={styles.input}
        placeholder="제목 입력하기(공백 포함 30자 이내)"
        maxLength={30}
        value={contentInfo.contentName}
        onChangeText={handleTitleChange}
      />
      {contentInfo.dataType === 'LINK' && (
        <View style={styles.linkBox}>
          <View style={styles.circle}>
            <Ionicons name="link-outline" color="white"></Ionicons>
          </View>
          <Text style={styles.linkText}>{contentInfo.contentLink}</Text>
        </View>
      )}
      {contentInfo.dataType === 'IMAGE' && (
        <View></View>
        //////////////////////////////
        // 영주님 이미지 추가해주세요!!!!!!!
        // 영주님 이미지 추가해주세요!!!!!!!
        // 영주님 이미지 추가해주세요!!!!!!!
        //////////////////////////////
      )}
      <View>
        <View style={styles.contentDiv}>
            <Text style={styles.name}>카테고리</Text>
            <View style={styles.categoryContainer}>
                {contentInfo.boardCategory.map((category) => (
                <View key={category} style={styles.textWrapper}>
                    <Text style={styles.divText}>{category}</Text>
                </View>
                ))}
            </View>
        </View>


        <View style={styles.contentDiv}>
            <Text style={styles.name}>태그</Text>
            <View style={styles.tagsContainer}>
                {contentInfo.tags.map((tag) => (
                <View key={tag} style={styles.textWrapper}>
                    <Text style={styles.divText}>{tag}</Text>
                </View>
                ))}
            </View>
        </View>
        {contentInfo.dday && (
          <View>
            <View style={styles.contentDiv}>
              <Text style={styles.name}>디데이(선택)</Text>
              <Text style={styles.sectionSubtitle}>저장한 날에 알림을 받을 수 있어요</Text>
            </View>
            <TouchableOpacity style={styles.ddayContent} onPress={() => setOpen(true)}>
              <Ionicons name="calendar-clear-outline" size={12} color="#9f9f9f" style={{ marginRight: 4 }} />
              <Text style={styles.divText}>{contentInfo.dday}</Text>
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
        )}
        <View style={styles.memo}>
          <Text style={styles.name}>메모(선택)</Text>
          <View style={styles.memoDiv}>
            <TextInput
                style={styles.detail}
                placeholder="여기를 눌러 메모를 입력하세요"
                maxLength={1500}
                value={contentInfo.contentDetail}
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
    marginBottom: 18,
    lineHeight: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#9f9f9f',
    marginBottom: 20,
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
    // alignItems: 'center',
    marginTop: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'semibold',
    width: 75,
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
});

export default AddSeedPage;
