import { axiosInstance } from './axios-instance';

export const postCategory = async (newCategoryName, isPublic) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.post('/api/v1/category', {
      name: newCategoryName,
      isPublic: isPublic ? true : false,
    });
    console.log('카테고리 생성 data', response.data.results);
  } catch (error) {
    console.error('카테고리 생성 error:', error);
  }
};

export const getCategory = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/category');
    console.log('카테고리 조회 data', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('카테고리 조회 error:', error);
  }
};

export const getBookmark = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/bookmark');
    console.log('북마크 조회 data', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('북마크 조회 error:', error);
  }
};
