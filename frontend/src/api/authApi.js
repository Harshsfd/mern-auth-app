import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vercel me jo env set kiya hai
});

// Register
export const registerUser = (data) => API.post("/auth/register", data);

// Login
export const loginUser = (data) => API.post("/auth/login", data);

// Forgot password
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);

// Reset password
export const resetPassword = (token, data) =>
  API.post(`/auth/reset-password/${token}`, data);

// Get user profile
export const getProfile = (token) =>
  API.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
