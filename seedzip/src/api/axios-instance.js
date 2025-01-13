import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_NATIVE_APP_SERVER_URL } from '@env';

const token = AsyncStorage.getItem('jwtToken');

const axiosInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  baseURL: `${REACT_NATIVE_APP_SERVER_URL}`,
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance };
