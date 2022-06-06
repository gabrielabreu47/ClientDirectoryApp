import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7251/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
