import axios from 'axios';

// Custom axios instance
export const axiosWithCSRF = axios.create({
  baseURL: process.env.REACT_APP_AXIOS, // get baseURL from .env file
  withCredentials: true,
});

// Add the CSRF token to every request using getCSRFToken
axiosWithCSRF.interceptors.request.use(
  (config) => {
    const token = getCSRFToken();
    if (token) {
      config.headers['X-CSRFToken'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get Cross-Site Request Forgery Token from the cookie
function getCSRFToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  