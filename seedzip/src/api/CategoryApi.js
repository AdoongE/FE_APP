import { axiosInstance } from './axios-instance';

export const postCategory = async (newCategoryName, isPublic) => {
  try {
    const axios = await axiosInstance();
    await axios.post('/api/v1/category', {
      name: newCategoryName,
      isPublic: isPublic ? true : false,
    });
  } catch (error) {
    console.error('카테고리 생성 error:', error);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const axios = await axiosInstance();
    await axios.delete(`/api/v1/category/${categoryId}`);
  } catch (error) {
    console.error('카테고리 삭제 error:', error);
  }
};

export const getCategory = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/category');
    return response.data.results;
  } catch (error) {
    console.error('카테고리 조회 error:', error);
  }
};

export const postBookmark = async (categoryId) => {
  try {
    const axios = await axiosInstance();
    await axios.post(`/api/v1/bookmark/category/${categoryId}`);
  } catch (error) {
    console.error('북마크 추가 error:', error);
  }
};

export const deleteBookmark = async (bookmarkId) => {
  try {
    const axios = await axiosInstance();
    await axios.delete(`/api/v1/bookmark/category/${bookmarkId}`);
  } catch (error) {
    console.error('북마크 삭제 error:', error);
  }
};

export const getBookmark = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/bookmark/category/bookmark');
    return response.data.results;
  } catch (error) {
    console.error('북마크 조회 error:', error);
  }
};

export const patchCategory = async (newCategoryName, categoryId) => {
  try {
    const axios = await axiosInstance();
    await axios.patch(`/api/v1/category`, {
      name: newCategoryName,
      categoryId: categoryId,
    });
  } catch (error) {
    console.error('카테고리 수정 error:', error);
  }
};

export const getUserSeedInfo = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get(`/api/v1/member/statistics`);
    return response.data.results;
  } catch (error) {
    console.error('카테고리 수정 error:', error);
  }
};
