import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_APP_SERVER_URL } from '@env';

const BASE_URL = (REACT_NATIVE_APP_SERVER_URL || '').replace(/\/+$/, '');

const authClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

export const postLogin = async (email, password) => {
  const res = await authClient.post('/api/v1/auth/login/basic', {
    email,
    password,
  });

  const token = res.headers?.authorization || res.headers?.Authorization;
  if (token) {
    await AsyncStorage.setItem('jwtToken', token);
  }

  return res.data;
};

export const postSignup = async (payload) => {
  try {
    const res = await authClient.post('/api/v1/auth/signup/basic', payload, {
      headers: { Authorization: undefined },
    });
    return res.data;
  } catch (error) {
    console.error('[SIGNUP DEBUG] baseURL:', BASE_URL);
    console.error('[SIGNUP DEBUG] sent url:', error?.config?.url);
    console.error('[SIGNUP DEBUG] sent method:', error?.config?.method);
    console.error('[SIGNUP DEBUG] sent headers:', error?.config?.headers);
    console.error('[SIGNUP DEBUG] status:', error?.response?.status);
    console.error('[SIGNUP DEBUG] resp data:', error?.response?.data);
    console.error('[SIGNUP DEBUG] message:', error?.message);
    throw error;
  }
};
