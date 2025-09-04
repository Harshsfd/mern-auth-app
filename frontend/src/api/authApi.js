import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');
export const forgotPassword = (data) => API.post('/auth/forgot-password', data);
export const resetPassword = (token, id, data) => API.post(`/auth/reset-password?token=${token}&id=${id}`, data);

// user
export const getProfile = (token) => API.get('/user/profile', {
  headers: { Authorization: `Bearer ${token}` }
});
export const updateProfile = (token, data) => API.put('/user/profile', data, {
  headers: { Authorization: `Bearer ${token}` }
});
