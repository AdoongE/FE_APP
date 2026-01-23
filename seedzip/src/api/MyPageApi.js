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
    console.log('[FAQ] start', { page, take });
    const api = await axiosInstance();
    console.log('[FAQ] got api:', !!api, 'get:', typeof api?.get);

    const res = await api.get('/api/v1/faq', { params: { page, take } });
    console.log('[FAQ] status:', res?.status);

    return res.data?.results ?? [];
  } catch (error) {
    console.log(
      '[FAQ] error:',
      error?.response?.status,
      error?.response?.data || error?.message || String(error),
    );
    throw error;
  }
};

const postWithdraw = async () => {
  try {
    console.log('[WITHDRAW] start');
    const api = await axiosInstance();
    console.log('[WITHDRAW] got api:', !!api, 'delete:', typeof api?.delete);

    const res = await api.delete('/api/v1/member');
    console.log('[WITHDRAW] status:', res?.status);

    return res.data;
  } catch (error) {
    console.log(
      '[WITHDRAW] error:',
      error?.response?.status,
      error?.response?.data || error?.message || String(error),
    );
    throw error;
  }
};

export { getNotice, getDetailNotice, getFaq, postWithdraw };
