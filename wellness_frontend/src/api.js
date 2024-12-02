import axios from 'axios';
import {ACCESS_TOKEN} from './token';

const apiUrl = 'https://wellness-backend-fetu.onrender.com';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }

    const googleAccessToken = localStorage.getItem ('GOOGLE_ACCESS_TOKEN');
    if (googleAccessToken) {
      config.headers["X-Google-Access-Token"] = googleAccessToken
    }

    return config;
  },

  (error) => {
    return Promise.reject(error)
  }
);

export default api;