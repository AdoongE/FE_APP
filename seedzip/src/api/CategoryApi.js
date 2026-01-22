import { axiosInstance } from './axios-instance';

export const postCategory = async (newCategoryName, isPublic) => {
  try {
    const api = await axiosInstance();
    await api.post('/api/v1/category', {
      name: String(newCategoryName ?? '').trim(),
      isPublic: !!isPublic,
    });
    return true;
  } catch (error) {
    console.log(
      '[CATEGORY][POST]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return false;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const api = await axiosInstance();
    await api.delete(`/api/v1/category/${categoryId}`);
    return true;
  } catch (error) {
    console.log(
      '[CATEGORY][DELETE]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return false;
  }
};

export const getCategory = async () => {
  try {
    const api = await axiosInstance();
    const res = await api.get('/api/v1/category');
    const results = res.data?.results;
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.log(
      '[CATEGORY][GET]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return [];
  }
};

export const postBookmark = async (categoryId) => {
  try {
    const api = await axiosInstance();
    await api.post(`/api/v1/bookmark/category/${categoryId}`);
    return true;
  } catch (error) {
    console.log(
      '[BOOKMARK][POST]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return false;
  }
};

export const deleteBookmark = async (bookmarkId) => {
  try {
    const api = await axiosInstance();
    await api.delete(`/api/v1/bookmark/category/${bookmarkId}`);
    return true;
  } catch (error) {
    console.log(
      '[BOOKMARK][DELETE]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return false;
  }
};

export const getBookmark = async () => {
  try {
    const api = await axiosInstance();
    const res = await api.get('/api/v1/bookmark/category/bookmark');
    const results = res.data?.results;
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.log(
      '[BOOKMARK][GET]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return [];
  }
};

export const patchCategory = async (newCategoryName, categoryId) => {
  try {
    const api = await axiosInstance();
    await api.patch('/api/v1/category', {
      name: String(newCategoryName ?? '').trim(),
      categoryId,
    });
    return true;
  } catch (error) {
    console.log(
      '[CATEGORY][PATCH]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return false;
  }
};

export const getUserSeedInfo = async () => {
  try {
    const api = await axiosInstance();
    const res = await api.get('/api/v1/member/statistics');
    const results = res.data?.results;
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.log(
      '[STATISTICS][GET]',
      error?.response?.status,
      error?.response?.data || error?.message || '',
    );
    return [];
  }
};
