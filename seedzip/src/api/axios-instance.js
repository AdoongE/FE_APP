import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_NATIVE_APP_SERVER_URL } from '@env';

const axiosInstance = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  return axios.create({
    baseURL: `${REACT_NATIVE_APP_SERVER_URL}`,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export { axiosInstance };