// src/api/axiosInstance.js

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("admin_access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired and we have a refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("admin_refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("admin_refresh");

        const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = response.data.access;
        localStorage.setItem("admin_access", newAccess);

        // Update the original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest); // retry
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("admin_access");
        localStorage.removeItem("admin_refresh");

        // Optionally: redirect to login
        window.location.href = "/AdminLogin"; // or your login route
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
