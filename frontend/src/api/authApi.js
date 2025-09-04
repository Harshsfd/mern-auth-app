import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');
export const forgotPassword = (data) => API.post('/auth/forgot-password', data);
// reset expects token in path or query depending on backend; here backend uses POST /auth/reset-password/:token
export const resetPassword = (token, data) => API.post(`/auth/reset-password/${token}`, data);

export const getProfile = (token) => API.get('/users/profile', {
  headers: { Authorization: `Bearer ${token}` }
});
export const updateProfile = (token, data) => API.put('/users/profile', data, {
  headers: { Authorization: `Bearer ${token}` }
});
