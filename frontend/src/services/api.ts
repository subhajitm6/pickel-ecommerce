import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://pickel-ecommerce-laravel-api.onrender.com/api', // Pointing to the Laravel backend
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach the token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // Optionally redirect to login page or reload
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
