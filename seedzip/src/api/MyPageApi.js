import { axiosInstance } from './axios-instance';

const getNotice = async () => {
  try {
    const api = await axiosInstance();
    const res = await api.get('/api/v1/notice');

    return res.data?.results ?? [];
  } catch (error) {
    throw error;
  }
};

const getDetailNotice = async (id) => {
  const api = await axiosInstance();
  const res = await api.get(`/api/v1/notice/${id}`);
  return res.data?.results?.[0] ?? null;
};

const getFaq = async ({ page, take } = {}) => {
  try {
    const api = await axiosInstance();
    const res = await api.get('/api/v1/faq', {
      params: { page, take },
    });

    const faqList = res.data?.results ?? [];
    console.log('[FAQ] results:', faqList);
    return faqList;
  } catch (error) {
    throw error;
  }
};

const postWithdraw = async () => {
  try {
    await axiosInstance.delete(`/api/v1/member`);
  } catch (error) {
    console.error('사용자 개인 정보 삭제 error:', error);
  }
};

export { getNotice, getDetailNotice, getFaq, postWithdraw };
