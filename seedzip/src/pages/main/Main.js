import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import SeedBox from './SeedBox';
import BottomNav from './BottomNav';
import SeedBlank from './SeedBlank';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../api/axios-instance';

export default function MainPage() {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        console.log('Authorization Header:', token);

        const instance = await axiosInstance();
        const response = await instance.get('/api/v1/content/');

        console.log('API Response:', response.data);

        // API 응답에서 콘텐츠 목록 추출
        const contents = response?.data?.results?.[0]?.contentsInfoList || [];
        setSeeds(contents);  // 콘텐츠 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching data: ', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeeds();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#41C3AB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>seedzip</Text>
      <Text style={styles.title}>나의 씨드</Text>

      {seeds.length === 0 ? (  // 데이터가 없을 경우 SeedBlank 컴포넌트 렌더링
        <SeedBlank />
      ) : (
        <FlatList
          data={seeds}  // 응답에서 가져온 콘텐츠 목록
          renderItem={({ item }) => (
            <SeedBox name={item.contentName || '콘텐츠명'} />
          )}
          keyExtractor={(item) => item.contentId.toString()}  // contentId를 keyExtractor로 사용
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',  // 상단과 하단바를 그대로 두기 위한 설정
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#41C3AB',
    marginBottom: 18.2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 80, // BottomNav 공간 확보
  },
});