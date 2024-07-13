import axiosInstance from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error getting token:', error.message);
        throw error;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
    } catch (error) {
        console.error('Error logging out:', error.message);
        throw error;
    }
};