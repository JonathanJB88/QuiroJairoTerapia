import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({ baseURL: API_URL });

const tokenInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['x-token'] = token;
    }
  }

  return config;
};

apiClient.interceptors.request.use(tokenInterceptor);

export default apiClient;
