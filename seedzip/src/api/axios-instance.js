import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const token = AsyncStorage.getItem('jwtToken');

const axiosInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  baseURL: 'http://210.107.205.122:20011',
  headers: {
    Authorization: `${token}`,
  },
});

export { axiosInstance };
