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

export const deleteCategory = async (categoryId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.delete(`/api/v1/category/${categoryId}`);
    console.log('카테고리 삭제 data', response.data.results);
  } catch (error) {
    console.error('카테고리 삭제 error:', error);
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

export const postBookmark = async (categoryId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.post(`/api/v1/bookmark/seed/${categoryId}`);
    console.log('북마크 추가 data', response.data);
  } catch (error) {
    console.error('북마크 추가 error:', error);
  }
};

export const deleteBookmark = async (bookmarkId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.delete(`/api/v1/bookmark/seed/${bookmarkId}`);
    console.log('북마크 삭제 data', response.data.results);
  } catch (error) {
    console.error('북마크 삭제 error:', error);
  }
};

export const getBookmark = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/bookmark/seed');
    console.log('북마크 조회 data', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('북마크 조회 error:', error);
  }
};

export const patchCategory = async (newCategoryName, categoryId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.patch(`/api/v1/category`, {
      name: newCategoryName,
      categoryId: categoryId,
    });
    console.log('카테고리 수정 data', response.data.results);
  } catch (error) {
    console.error('카테고리 수정 error:', error);
  }
};

export const getUserSeedInfo = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get(`/api/v1/member/statistics`);
    console.log('사용자 씨드 정보 data', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('카테고리 수정 error:', error);
  }
};
