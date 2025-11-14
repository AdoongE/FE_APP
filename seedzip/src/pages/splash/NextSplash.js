import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import seedzip from '../../assets/icons/seedzip.png';
import newLogo from '../../assets/icons/whiteLogo.png';
import naver from '../../assets/icons/naver.png';
import google from '../../assets/icons/google.png';
import apple from '../../assets/icons/apple.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login as kakaoLogin } from '@react-native-kakao/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../api/axios-instance';
import NaverLogin from '@react-native-seoul/naver-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  REACT_NATIVE_APP_KEY,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
} from '@env';

const NextSplash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    initializeKakaoSDK(`${REACT_NATIVE_APP_KEY}`);
    GoogleSignin.configure({
      iosClientId: GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
    });
  }, []);

  const callBackend = async (provider, token) => {
    const accessToken = token.accessToken;
    const refreshToken = token.refreshToken;

    const axios = await axiosInstance();
    const url = `/api/v1/auth/login/${provider}/app?accessToken=${accessToken}`;
    const response = await axios.post(url);
    const { status, results } = response.data;

    if (status.code === 200) {
      const jwtToken = response.headers['authorization'];
      if (jwtToken) {
        await AsyncStorage.setItem('jwtToken', jwtToken);
        navigation.navigate('home');
      }
    } else if (status.code === 401) {
      const jwtToken = refreshToken;

      if (jwtToken) {
        await AsyncStorage.setItem('jwtToken', jwtToken);
        navigation.navigate('home');
      }
    } else if (status.code === 404) {
      const { result: accessTokenForSignup, socialType } =
        (results && results[0]) || {};
      if (accessTokenForSignup)
        await AsyncStorage.setItem('accessToken', accessTokenForSignup);
      if (socialType) await AsyncStorage.setItem('socialType', socialType);
      navigation.navigate('nickname');
    } else {
      Alert.alert(
        '로그인 실패',
        status.message ?? '잠시 후 다시 시도해주세요.',
      );
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const token = await kakaoLogin();
      await callBackend('kakao', token);
    } catch (e) {
      Alert.alert('카카오 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleNaverLogin = async () => {
    try {
      const iosKeys = {
        kConsumerKey: NAVER_CLIENT_ID,
        kConsumerSecret: NAVER_CLIENT_SECRET,
        kServiceAppName: 'seedzip',
        kServiceAppUrlScheme: 'naversRhckDL5ywWQI66qKXAu',
      };

      console.log('네이버 login 호출 직전', iosKeys);

      const result = await NaverLogin.login(iosKeys);

      console.log('네이버 login 결과', result);

      const accessToken =
        (result &&
          result.successResponse &&
          result.successResponse.accessToken) ||
        result.accessToken;

      if (!accessToken)
        throw new Error('네이버 액세스 토큰을 가져오지 못했습니다.');

      await callBackend('naver', accessToken);
    } catch (e) {
      console.log('네이버 로그인 오류 :', e);
      Alert.alert('네이버 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const signInResult = await GoogleSignin.signIn();

      const tokens = await GoogleSignin.getTokens();

      const { accessToken } = tokens;
      if (!accessToken) throw new Error('액세스 토큰 없음');

      await callBackend('google', accessToken);
    } catch (e) {
      console.log('❌ Google Login Error:', e);
      Alert.alert('구글 로그인 중 오류가 발생했습니다.', e?.message ?? '');
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const identityToken = appleAuthRequestResponse.identityToken;
        if (!identityToken) {
          Alert.alert('애플 로그인 실패');
          return;
        }

        await callBackend('apple', identityToken);
      } else {
        Alert.alert('애플 로그인 실패');
      }
    } catch (error) {
      console.log('애플 로그인 오류:', error);
      Alert.alert('애플 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#41c3ab', '#82E9D6']}
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
              style={[styles.button, { backgroundColor: '#FEE500' }]}
              onPress={handleKakaoLogin}
            >
              <MaterialCommunityIcons name="chat" size={14} color="black" />
              <Text style={{ color: 'black' }}>카카오톡으로 로그인하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#03C75A' }]}
              onPress={handleNaverLogin}
            >
              <Image source={naver} />
              <Text style={{ color: 'white' }}>네이버로 로그인하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'white' }]}
              onPress={handleGoogleLogin}
            >
              <Image source={google} />
              <Text style={{ color: '#4F4F4F' }}>구글로 로그인하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'black' }]}
              onPress={handleAppleLogin}
            >
              <Image source={apple} />
              <Text style={{ color: '#fff' }}>애플로 로그인하기</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { marginTop: 9, fontSize: 16, fontWeight: '600', color: 'white' },
  logins: { rowGap: 20, flex: 'auto', position: 'absolute', bottom: 85 },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 46,
    flexDirection: 'row',
    columnGap: 4,
  },
  new: { position: 'absolute', top: 262.92, justifyContent: 'center' },
  images: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    columnGap: 6,
  },
  newLogo: { width: 36, height: 36 },
  seedzip: { width: 155, height: 36 },
});

export default NextSplash;
