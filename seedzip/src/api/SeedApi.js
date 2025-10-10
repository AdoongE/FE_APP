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

export const getPopularSeeds = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get(`/api/v1/seed/popular`);
    return response.data.results;
  } catch (error) {
    console.error('많이 찾는 씨드 조회 error:', error);
  }
};

export const getUnreadSeeds = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get(`/api/v1/seed/unread`);
    return response.data.results;
  } catch (error) {
    console.error('읽지 않은 씨드 조회 error:', error);
  }
};

export const getCategorySeeds = async (categoryId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get(`/api/v1/seed/category/${categoryId}`);
    return response.data.results;
  } catch (error) {
    console.error('카테고리 내 씨드 모아보기 error:', error);
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

export const deleteSeeds = async (seedIdList) => {
  try {
    const idsParam = seedIdList.join(',');
    const axios = await axiosInstance();
    const response = await axios.delete(`/api/v1/seed/list?ids=${idsParam}`);
    return response.data.results;
  } catch (error) {
    console.error('씨드 목록 선택 삭제 error:', error);
  }
};

export const deleteSeed = async (seedId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.delete(`/api/v1/seed/${seedId}`);
    return response.data.results;
  } catch (error) {
    console.error('씨드 삭제 error:', error);
  }
};

export const searchSeeds = async (tags, keyword, seedType, sortBy) => {
  let isAsc = false;
  if (sortBy === 'name') {
    isAsc = true;
  } else {
    isAsc = false;
  }

  try {
    const axios = await axiosInstance();
    const response = await axios.post(
      `/api/v1/seed/filtering?sortBy=${sortBy}&seedType=${seedType}&isAsc=${isAsc}`,
      {
        tags,
        keyword,
      },
    );
    return response.data.results || response.data.status.message;
  } catch (error) {
    console.error('전체 씨드 필터링 및 검색 error:', error);
  }
};

export const searchCategorySeeds = async (
  categoryId,
  tags,
  keyword,
  seedType,
  sortBy,
) => {
  let isAsc = false;
  if (sortBy === 'name') {
    isAsc = true;
  } else {
    isAsc = false;
  }

  try {
    const axios = await axiosInstance();
    const response = await axios.post(
      `/api/v1/seed/filtering/${categoryId}?sortBy=${sortBy}&seedType=${seedType}&isAsc=${isAsc}`,
      {
        tags,
        keyword,
      },
    );
    return response.data.results || response.data.status.message;
  } catch (error) {
    console.error('카테고리 내 필터링 및 검색 error:', error);
  }
};

export const searchFavoriteSeeds = async (keyword) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.post(
      `/api/v1/seed/filtering/bookmark?keyword=${keyword}`,
    );
    return response.data.results;
  } catch (error) {
    console.error('즐겨찾기 내 필터링 및 검색 error:', error);
  }
};

export const postFavoriteSeed = async (seedId) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.post(`/api/v1/bookmark/seed/${seedId}`);
    return response.data.results;
  } catch (error) {
    console.error('씨드 즐겨찾기 추가 error:', error);
  }
};

export const getFavoriteSeeds = async () => {
  try {
    const axios = await axiosInstance();
    const response = await axios.get('/api/v1/bookmark/seed');
    return response.data.results;
  } catch (error) {
    console.error('즐겨찾기 한 씨드 조회 error:', error);
  }
};

export const patchSeed = async (seedId, patchData) => {
  try {
    const axios = await axiosInstance();
    const response = await axios.patch(`/api/v1/seed/${seedId}`, patchData);
    return response.data.results;
  } catch (error) {
    console.error('씨드 수정 error:', error);
  }
};
