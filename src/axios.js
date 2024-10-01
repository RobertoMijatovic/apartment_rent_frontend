import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:1312/api',
});

instance.interceptors.request.use(config => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;