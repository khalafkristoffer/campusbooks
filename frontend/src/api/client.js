import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Using environment variable instead of hardcoded URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to an expired or invalid token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('Token expired or invalid, removing credentials');
      // Remove the invalid token
      Cookies.remove('access_token');
      // Remove Authorization header from future requests
      delete apiClient.defaults.headers.common['Authorization'];
      
      // Optional: Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
