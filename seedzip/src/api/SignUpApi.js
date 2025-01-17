import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from './axios-instance';


const SignUpHandler = async (data) => {
    const AccessToken = await AsyncStorage.getItem('accessToken');
    const SocialType = await AsyncStorage.getItem('socialType');

    console.log('AccessToken 회원가입: ', AccessToken);
    console.log('SocialType 회원가입: ', SocialType);

    const requestData = {
        socialType: SocialType,
        accessToken: AccessToken,
        nickname: data.nickname,
        birthday: data.birthday,
        gender: data.gender,
        occupation: data.occupation,
        field: data.field,
        consentToTermsOfService: data.consentToTermsOfService,
        consentToPersonalInformation: data.consentToPersonalInformation,
        consentToMarketingAndAds: data.consentToMarketingAndAds,
    };

    console.log('회원가입 요청 데이터:', requestData);
    try {
        const axios = await axiosInstance();
        const response = await axios().post('/api/v1/auth/signup', requestData);

        if (response.data.status.code === 200) {
        console.log('회원가입 성공: ', response.data.status.message);

        const jwtToken = response.headers.authorization;

        await AsyncStorage.setItem('jwtToken', jwtToken);
        const savedJwtToken = AsyncStorage.getItem('jwtToken');
        console.log('회원가입 JWT Token:', savedJwtToken);

        return response;
        } else {
            throw new Error(response.data.status.message || '회원가입 실패');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { SignUpHandler };
