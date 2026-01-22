import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_APP_SERVER_URL } from '@env';

export const postLogin = async (email, password) => {
  const url = `${REACT_NATIVE_APP_SERVER_URL.replace(
    /\/$/,
    '',
  )}/api/v1/auth/login/basic`;

  const res = await axios.post(
    url,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );

  console.log('[LOGIN] url:', url);
  console.log('[LOGIN] status:', res.status);
  console.log('[LOGIN] headers:', res.headers);

  const token = res.headers?.authorization || res.headers?.Authorization;

  console.log('[LOGIN] extracted token:', token);

  if (token) {
    await AsyncStorage.setItem('jwtToken', token);
    const saved = await AsyncStorage.getItem('jwtToken');
    console.log('[LOGIN] saved token:', saved);
  } else {
    console.error(
      '[LOGIN] Authorization header not found in response headers.',
    );
  }

  return res.data;
};

export const postSignup = async (payload) => {
  try {
    const res = await authClient.post('/api/v1/auth/signup/basic', payload, {
      // 전역 Authorization이 붙는 상황을 강제로 무력화
      headers: { Authorization: undefined },
    });
    return res.data;
  } catch (error) {
    console.error('[SIGNUP DEBUG] baseURL:', REACT_NATIVE_APP_SERVER_URL);
    console.error(
      '[SIGNUP DEBUG] full url:',
      `${REACT_NATIVE_APP_SERVER_URL}/api/v1/auth/signup/basic`,
    );
    console.error('[SIGNUP DEBUG] sent url:', error?.config?.url);
    console.error('[SIGNUP DEBUG] sent method:', error?.config?.method);
    console.error('[SIGNUP DEBUG] sent headers:', error?.config?.headers);
    console.error('[SIGNUP DEBUG] status:', error?.response?.status);
    console.error('[SIGNUP DEBUG] resp headers:', error?.response?.headers);
    console.error('[SIGNUP DEBUG] resp data:', error?.response?.data);
    console.error('[SIGNUP DEBUG] payload:', payload);
    throw error;
  }
};
