import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Easily inject auth tokens when JWT is enabled
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetails = error.response?.data?.Message || error.message;
    console.error(`[API Error] ${error.config?.url}:`, errorDetails);
    return Promise.reject(error);
  }
);
