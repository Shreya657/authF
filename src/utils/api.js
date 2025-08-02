// src/utils/api.js
import axios from 'axios';

const api = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // Important for sending cookies (like refresh tokens)
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
