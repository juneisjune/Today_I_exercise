import axios from 'axios';

// 기본 설정
const axiosInstance = axios.create({
    baseURL: 'http://13.209.27.220:8080/', // API 기본 URL
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
