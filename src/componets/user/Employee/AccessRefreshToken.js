// src/api/AccessRefreshToken.js

import axios from "axios";
import { BASE_URLL } from "../../../api/AxiosBaseUrl";

const AccessRefreshToken = axios.create({
  baseURL: BASE_URLL,
});

// Request interceptor → attach access token
AccessRefreshToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token1");
    const refreshToken = localStorage.getItem("refresh_token1");
 
    // console.log(" Request → Access Token:", token);
    // console.log(" Request → Refresh Token:", refreshToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(" No access token found → redirecting to login");
      window.location.href = "/";
      return Promise.reject("No access token found");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle refresh token
AccessRefreshToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

  
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token1")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token1");

        // console.warn(" Token expired — attempting refresh...");
        // console.log("Refresh Token Used:", refreshToken);

        const res = await axios.post(`${BASE_URLL}api/api/token/refresh/`, {
          refresh: refreshToken,
        });

        

        const newAccessToken = res.data.access;
        localStorage.setItem("access_token1", newAccessToken);

        // console.log(" New Access Token Stored:", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        return AccessRefreshToken(originalRequest); // Retry request
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        
        localStorage.removeItem("access_token1");
        localStorage.removeItem("refresh_token1");
        window.location.href = "/"; 
      }
    }

    return Promise.reject(error);
  }
);

export default AccessRefreshToken;
