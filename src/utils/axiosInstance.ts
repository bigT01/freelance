// src/utils/axiosInstance.ts
import axios from 'axios';
import { useUserStore } from '../store/userStore';

const axiosInstance = axios.create({
    baseURL: 'https://freelance-backend-production-beb9.up.railway.app/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the bearer token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useUserStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
