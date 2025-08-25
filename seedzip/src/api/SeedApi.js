import { axiosInstance } from './axios-instance';

export const getAllSeeds = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/seed');
    return response.data.results;
  } catch (error) {
    console.error('전체 씨드 모아보기 error:', error);
  }
};

export const getSeed = async (seedId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get(`/api/v1/seed/${seedId}`);
    return response.data.results;
  } catch (error) {
    console.error('씨드 상세 보기 error:', error);
  }
};
