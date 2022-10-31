import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1111',
  // http://localhost:1111
  // process.env.REACT_APP_API_URL
  // adaw
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
