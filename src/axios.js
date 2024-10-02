import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:1312/api', // Adjust the base URL as needed
});

// Add a request interceptor
instance.interceptors.request.use(config => {
  // Try getting the token from Vuex first
  let token = store.state.token;
  
  // If the token isn't in Vuex (e.g., on page refresh), check localStorage
  if (!token) {
    token = localStorage.getItem('token');
  }

  // If a token is found, set the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  // Handle request errors
  return Promise.reject(error);
});

export default instance;
