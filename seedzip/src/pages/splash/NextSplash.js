import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import seedzip from '../../assets/icons/seedzip.png';
import newLogo from '../../assets/icons/whiteLogo.png';
import naver from '../../assets/icons/naver.png';
import google from '../../assets/icons/google.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login } from '@react-native-kakao/user';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../api/axios-instance';
import { REACT_NATIVE_APP_KEY } from '@env';

const NextSplash = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    initializeKakaoSDK(`${REACT_NATIVE_APP_KEY}`);
  }, []);

  const handleKakaoLogin = async () => {
    try {
      const token = await login();
      const kakaoAccessToken = token.accessToken;
      console.log('로그인 성공, 액세스 토큰:', kakaoAccessToken);

      const axios = await axiosInstance();
      const response = await axios.post(
        `/api/v1/auth/login/kakao/app?accessToken=${kakaoAccessToken}`
      );
      
      const { status, results } = response.data;

      if (status.code === 200) {
        console.log('로그인 성공:', status.message);
        const jwtToken = response.headers['authorization'];

        if (jwtToken) {
          await AsyncStorage.setItem('jwtToken', jwtToken);
          console.log('저장된 JWT Token:', jwtToken);

          navigation.navigate('main');
        }
      } else if (status.code === 404) {
        console.log('회원가입 필요:', status.message);

        const { result: accessToken, socialType } = results[0];
        console.log('액세스 토큰:', accessToken, '소셜 타입:', socialType);

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('socialType', socialType);

        navigation.navigate('nickname'); // 회원가입 페이지 시작
      }
    } catch (error) {
      console.error('카카오 로그인 처리 중 에러:', error);
      Alert.alert('로그인 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#41C3AB', '#82E9D6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.new}>
            <View style={styles.images}>
              <Image source={newLogo} style={styles.newLogo} />
              <Image source={seedzip} style={styles.seedzip} />
            </View>
            <View style={{ transform: [{ translateX: 20 }] }}>
              <Text style={styles.title}>한 곳에 모으는 인사이트!</Text>
            </View>
          </View>
          <View style={styles.logins}>
            <TouchableOpacity
              type="kakao"
              style={[styles.button, { backgroundColor: '#FEE500' }]}
              onPress={handleKakaoLogin}
            >
              <MaterialCommunityIcons
                name="chat"
                size={12}
                color="black"
              />
              <Text style={{ color: 'black' }}>카카오톡으로 로그인하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="naver"
              style={[styles.button, { backgroundColor: '#03C75A' }]}
              onPress={() => navigation.navigate('view')}
            >
              <Image source={naver} />
              <Text style={{ color: 'white' }}>네이버로 로그인하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="google"
              style={[styles.button, { backgroundColor: 'white' }]}
            >
              <Image source={google} />
              <Text style={{ color: '#4F4F4F' }}>구글로 로그인하기</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 9,
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  logins: {
    rowGap: 20,
    flex: 'auto',
    position: 'absolute',
    bottom: 85,
  },
  button: {
    border: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 46,
    flexDirection: 'row',
    columnGap: 4,
    fontSize: 14,
    fontWeight: 'medium',
  },
  new: {
    position: 'absolute',
    top: 262.92,
    justifyContent: 'center',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    columnGap: 6,
  },
  newLogo: {
    width: 36,
    height: 36,
  },
  seedzip: {
    width: 155,
    height: 36,
  },
});

export default NextSplash;