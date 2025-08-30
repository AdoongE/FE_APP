import { axiosInstance } from './axios-instance';

const getNotice = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/notice`);
    const noticeList = response.data?.results;

    if (response.status) {
      console.log('notice 가져오기 성공');
      return noticeList;
    } else {
      console.error('notice 가져오기 실패');
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
};

const getDetailNotice = async ({ id }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/notice/${id}`);
    return response.data.results[0];
  } catch (error) {
    console.error('에러 발생:', error);
  }
};

const getFaq = async ({ page, take }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/faq`);
    const faqList = response.data?.results;

    if (response.status) {
      console.log('FAQ 가져오기 성공');
      return faqList;
    } else {
      console.error('FAQ 가져오기 실패');
    }
  } catch (error) {
    console.error('에러 발생:', error);
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
