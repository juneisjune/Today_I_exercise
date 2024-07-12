import axiosInstance from './axiosInstance';

export const signUp = async (email, password, nickname, phoneNumber) => {
    try {
        const response = await axiosInstance.post('/accounts', {
            email,
            password,
            nickname, // 서버 문서에서 제공한 필드 이름과 일치하는지 확인
            phoneNumber
        });
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message); // 오류 메시지를 출력하여 문제 파악
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        throw error;
    }
};
